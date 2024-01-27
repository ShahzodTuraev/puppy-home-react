import { MapsUgcOutlined } from "@mui/icons-material";
import { Avatar, Box, Button, TextField } from "@mui/material";
import { Dropdown } from "antd";
import React, { useEffect, useState } from "react";

// REDUX
import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setBoArticleReviews } from "./slice";
import { retrieveBoArticleReviews } from "./selector";

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
  setBoArticleReviews: (data: Review[]) => dispatch(setBoArticleReviews(data)),
});
// REDUX SELECTOR
const boArticleReviewsRetriever = createSelector(
  retrieveBoArticleReviews,
  (boArticleReviews) => ({
    boArticleReviews,
  })
);

const Reviews = ({ postId, setArtRebuild, artRebuild }: any) => {
  /*INITIALIZATIONS*/
  const { setBoArticleReviews } = actionDispatch(useDispatch());
  const { boArticleReviews } = useSelector(boArticleReviewsRetriever);
  const [textValue, setTextValue] = useState<string>("");

  /*HANDLERS*/
  const commentHandler = async () => {
    try {
      const reviewService = new ReviewApiService();
      const result = await reviewService.getTargetReviews({
        page: 1,
        limit: 20,
        review_ref_id: postId,
      });
      setBoArticleReviews(result);
      setArtRebuild(new Date());
    } catch (err) {
      console.log(err);
    }
  };

  const submitHandler = async () => {
    try {
      assert.ok(verifyMemberData, Definer.auth_err1);
      const reviewService = new ReviewApiService();
      await reviewService.createReview({
        review_ref_id: postId,
        group_type: "community",
        content: textValue,
      });
      await sweetTopSmallSuccessAlert("success", 700, false);
      setTextValue("");
      setArtRebuild(new Date());
      commentHandler();
    } catch (err) {
      console.log(err);
      textValue === ""
        ? sweetFailureProvider(Definer.input_err1)
        : sweetFailureProvider(Definer.general_err1);
    }
  };

  return (
    <Dropdown
      trigger={["click"]}
      className="account_dropdown"
      placement="bottomLeft"
      overlayClassName="shopcart_root"
      dropdownRender={(menu) => (
        <Box className="comment_container">
          <Box className="comment_wrap">
            {boArticleReviews.map((review) => {
              return (
                <Box key={review._id} className="comment_item">
                  <Box className="commentor_wrap">
                    <Avatar src="/images/categories/dish.jpg" alt="comment" />
                    <Box className="text_wrap">
                      <Box className="user_name_wrap">
                        <p className="commentor_name">
                          {review.member_data?.mb_nick}
                        </p>
                        <p className="comment_time">
                          • <Moment fromNow>{review.createdAt}</Moment>
                        </p>
                      </Box>
                      <p className="comment_content">{review.content}</p>
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Box>
          <Box className="comment_input">
            <TextField
              className="comment_textfield"
              id="standard-basic"
              label="Add a comment"
              variant="standard"
              value={textValue}
              onChange={(e) => setTextValue(e.target.value)}
            />
            <Button onClick={submitHandler} className="post_btn">
              post
            </Button>
          </Box>
        </Box>
      )}
    >
      <MapsUgcOutlined onClick={commentHandler} className="post_icon" />
    </Dropdown>
  );
};

export default Reviews;
