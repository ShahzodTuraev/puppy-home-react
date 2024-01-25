import React, { useEffect, useRef, useState } from "react";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Avatar, Box, Button, Rating, Stack } from "@mui/material";
// REDUX
import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setServiceReviews } from "./slice";
import { retrieveServiceReviews } from "./selector";

import ReviewApiService from "../../app/apiServices/reviewApiService";
import { Review } from "../../types/reivew";
import { serverApi } from "../../app/lib/config";
import {
  sweetFailureProvider,
  sweetTopSmallSuccessAlert,
} from "../../app/lib/sweetAlert";
import { Definer } from "../../app/lib/Definer";
import { verifyMemberData } from "../../app/apiServices/verify";
import assert from "assert";
// REDUX SLICE
const actionDispatch = (dispatch: Dispatch) => ({
  setServiceReviews: (data: Review[]) => dispatch(setServiceReviews(data)),
});
// REDUX SELECTOR
const serviceReviewsRetriever = createSelector(
  retrieveServiceReviews,
  (serviceReviews) => ({
    serviceReviews,
  })
);
const ServiceReview = ({ chosenService }: any) => {
  /*INITIALIZATIONS*/
  const { setServiceReviews } = actionDispatch(useDispatch());
  const { serviceReviews } = useSelector(serviceReviewsRetriever);
  const service_id = chosenService?._id;
  const [value, setValue] = useState<any>(0.5);
  const [textValue, setTextValue] = useState("");
  const [productRebuild, setProductRebuild] = useState<Date>(new Date());
  const review_text = useRef<any>();
  useEffect(() => {
    const reviewService = new ReviewApiService();
    reviewService
      .getTargetReviews({
        page: 1,
        limit: 20,
        review_ref_id: service_id,
      })
      .then((data) => setServiceReviews(data))
      .catch((err) => console.log(err));
  }, [service_id, productRebuild]);
  /*HANDLERS*/
  const submitHandler = async () => {
    try {
      assert.ok(verifyMemberData, Definer.auth_err1);
      const reviewService = new ReviewApiService();
      await reviewService.createReview({
        review_ref_id: chosenService?._id,
        group_type: "product",
        content: review_text.current.value,
        product_rating: value,
      });
      await sweetTopSmallSuccessAlert("success", 700, false);
      setProductRebuild(new Date());
      setTextValue("");
    } catch (err) {
      console.log(err);
      textValue === ""
        ? sweetFailureProvider(Definer.input_err1)
        : sweetFailureProvider(Definer.auth_err1);
    }
  };

  return (
    <Stack className="review_wrap">
      <h3 className="box_title">Service Reviews</h3>
      <Box className="reviews_panel">
        {serviceReviews.map((review) => {
          const auth = review?.member_data;
          const image_path = auth?.mb_image
            ? `${serverApi}/${auth?.mb_image}`
            : "/icons/user_avatar.jpg";
          return (
            <Box key={review._id} className="one_review">
              <Box className="head_wrap">
                <Avatar src={image_path} alt="reviewer" />
                <p className="reviewer_name">{auth?.mb_nick}</p>
                <Rating
                  className="review_icon"
                  name="half-rating"
                  defaultValue={review.product_rating}
                  precision={0.5}
                  size="small"
                  readOnly
                />
              </Box>
              <Box className="main_review">
                <p>{review.content}</p>
              </Box>
            </Box>
          );
        })}
      </Box>
      {serviceReviews.length === 0 && (
        <p>There aren't any reviews for this product yet</p>
      )}
      <Box className="review_input_box">
        <Box className="rating_wrap">
          <p className="review_title">Leave a review</p>
          <Rating
            className="rating_input"
            name="half-rating"
            precision={0.5}
            size="large"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
        </Box>
        <textarea
          required
          className="review_textarea"
          cols={10}
          rows={6}
          placeholder="write review"
          ref={review_text}
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
        ></textarea>
        <Box className="sub_btn_wrap">
          <Button onClick={submitHandler} className="submit_btn">
            Submit
          </Button>
        </Box>
      </Box>
    </Stack>
  );
};

export default ServiceReview;
