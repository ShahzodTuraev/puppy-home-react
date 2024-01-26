import React, { useEffect, useRef, useState } from "react";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Pagination,
  PaginationItem,
  Rating,
  Stack,
} from "@mui/material";
// REDUX
import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setProductReviews } from "./slice";
import { retrieveProductReviews } from "./selector";

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
import Moment from "react-moment";
// REDUX SLICE
const actionDispatch = (dispatch: Dispatch) => ({
  setProductReviews: (data: Review[]) => dispatch(setProductReviews(data)),
});
// REDUX SELECTOR
const productReviewsRetriever = createSelector(
  retrieveProductReviews,
  (productReviews) => ({
    productReviews,
  })
);
const ProductReview = ({ chosenProduct }: any) => {
  /*INITIALIZATIONS*/
  const { setProductReviews } = actionDispatch(useDispatch());
  const { productReviews } = useSelector(productReviewsRetriever);
  const product_id = chosenProduct?._id;
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
        review_ref_id: product_id,
      })
      .then((data) => setProductReviews(data))
      .catch((err) => console.log(err));
  }, [product_id, productRebuild]);
  /*HANDLERS*/
  const submitHandler = async () => {
    try {
      assert.ok(verifyMemberData, Definer.auth_err1);
      const reviewService = new ReviewApiService();
      await reviewService.createReview({
        review_ref_id: chosenProduct?._id,
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
      <h3 className="box_title">Product Reviews</h3>
      <Box className="reviews_panel">
        {productReviews.map((review) => {
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
                <p className="review_time">
                  <Moment fromNow>{review.createdAt}</Moment>
                </p>
              </Box>
              <Box className="main_review">
                <p>{review.content}</p>
              </Box>
            </Box>
          );
        })}
      </Box>
      {productReviews.length === 0 && (
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
      <Box className="title_line">
        <p>Seller </p>
      </Box>
      <Box className="seller_info_wrap">
        <p className="thead">Shop name</p>
        <p className="tbody">{chosenProduct?.shop_data?.mb_nick}</p>
        <p className="thead">Email</p>
        <p className="tbody">{chosenProduct?.shop_data?.mb_email}</p>
        <p className="thead">Address</p>
        <p className="tbody">{chosenProduct?.shop_data?.mb_address}</p>
        <p className="thead">Phone Number</p>
        <p className="tbody">{chosenProduct?.shop_data?.mb_phone}</p>
      </Box>
    </Stack>
  );
};

export default ProductReview;
