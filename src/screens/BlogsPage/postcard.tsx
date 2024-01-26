import { Avatar, Box } from "@mui/material";
import React, { useRef, useState } from "react";
import Moment from "react-moment";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import {
  Favorite,
  FavoriteBorder,
  MapsUgcOutlined,
  RemoveRedEye,
} from "@mui/icons-material";
import assert from "assert";
import { verifyMemberData } from "../../app/apiServices/verify";
import { Definer } from "../../app/lib/Definer";
import MemberApiService from "../../app/apiServices/memberApiService";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../app/lib/sweetAlert";
import CommunityApiService from "../../app/apiServices/communityApiService";
import { serverApi } from "../../app/lib/config";
import Reviews from "./reviews";
const Postcard = ({ cartData, setArtRebuild }: any) => {
  /*INITIALIZATIONS*/
  const refs: any = useRef([]);
  const {
    _id,
    art_subject,
    art_content,
    art_images,
    art_likes,
    art_views,
    art_reviews,
    createdAt,
    member_data,
    me_liked,
  } = cartData;
  const [open, setOpen] = useState<boolean>(false);
  const user_image = member_data?.mb_image
    ? `${serverApi}/${member_data.mb_image}`
    : "/icons/user_avatar.jpg";
  /*HANDLERS*/
  const targetLikeHandler = async (e: any, id: string) => {
    try {
      assert.ok(verifyMemberData, Definer.auth_err1);
      const memberService = new MemberApiService();
      const data = { like_ref_id: id, group_type: "community" };
      const like_result: any = await memberService.memberLikeTarget(data);
      assert.ok(like_result, Definer.general_err1);
      if (like_result.like_status > 0) {
        e.target.style.fill = "#FF3040";
        refs.current[like_result.like_ref_id].innerHTML++;
      } else {
        e.target.style.fill = "white";
        refs.current[like_result.like_ref_id].innerHTML--;
      }
      setArtRebuild(new Date());
      await sweetTopSmallSuccessAlert("success", 700, false);
    } catch (err: any) {
      console.log("targetLikeArticle, ERROR:::", err);
      sweetErrorHandling(err).then();
    }
  };

  const seenHandler = async (e: any) => {
    try {
      const communityService = new CommunityApiService();
      await communityService.getChosenArticles(e.target.id);
      setOpen(true);
    } catch (err: any) {
      console.log("getChosenArticle, ERROR:::", err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <Box key={_id} className="post_card">
      <Box className="auth_box">
        <Box className="user_info">
          <Avatar className="post_avatar" alt="user" src={user_image} />
          <h4 className="user_name">{member_data.mb_nick}</h4>
        </Box>
        <p className="post_time">
          • <Moment fromNow>{createdAt}</Moment> •
        </p>
        <p className="follow_link">Follow</p>
      </Box>
      <Swiper
        centeredSlides={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Navigation, Pagination]}
        className="img_swiper"
      >
        <SwiperSlide>
          <img
            className="post_img"
            src="/images/categories/bag.jpg"
            alt="content"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="post_img"
            src="/images/categories/dish.jpg"
            alt="content"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="post_img"
            src="/images/categories/dish.jpg"
            alt="content"
          />
        </SwiperSlide>
      </Swiper>
      <Box className="main_bottom_wrap">
        <Box className="like_box">
          <Box className="left_icons">
            <Box className="num_col">
              {me_liked && me_liked[0]?.my_favorite ? (
                <Favorite
                  onClick={(e) => targetLikeHandler(e, _id)}
                  sx={{
                    fill: "#FF3040",
                  }}
                  className="post_icon"
                />
              ) : (
                <FavoriteBorder
                  onClick={(e) => targetLikeHandler(e, _id)}
                  className="post_icon"
                />
              )}
              <p ref={(element) => (refs.current[_id] = element)}>
                {art_likes}
              </p>
            </Box>
            <Box className="num_col">
              <Reviews />
              <p>{art_reviews}</p>
            </Box>
          </Box>
          <Box className="num_col col_left ">
            <RemoveRedEye className="post_icon" />
            <p>{art_views}</p>
          </Box>
        </Box>
        <Box className="article_box">
          <h4 className="article_title">{art_subject}</h4>

          <p
            style={open ? { height: "auto" } : { height: "20px" }}
            className="article_content"
          >
            {art_content}
          </p>
          <p
            style={open ? { display: "none" } : { display: "block" }}
            className="sign_more"
          >
            ...
          </p>

          <p
            id={_id}
            style={open ? { display: "none" } : { display: "block" }}
            onClick={seenHandler}
            className="see_all"
          >
            Read more
          </p>
        </Box>
      </Box>
    </Box>
  );
};

export default Postcard;
