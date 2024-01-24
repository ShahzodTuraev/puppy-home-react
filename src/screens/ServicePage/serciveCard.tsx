import { Favorite, LocationOn, Phone, RemoveRedEye } from "@mui/icons-material";
import { Box, Rating, Stack } from "@mui/material";
import assert from "assert";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyMemberData } from "../../app/apiServices/verify";
import { Definer } from "../../app/lib/Definer";
import MemberApiService from "../../app/apiServices/memberApiService";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../app/lib/sweetAlert";
import { serverApi } from "../../app/lib/config";

const ServiceCard = ({ cartData }: any) => {
  /*INITIALIZATIONS*/
  const {
    _id,
    product_id,
    product_images,
    product_description,
    product_likes,
    product_views,
    product_reviews,
    product_rating,
    me_liked,
    member_data,
  } = cartData;
  const [cartChange, setCartChange] = useState<number>(-1);
  const navigate = useNavigate();
  const refs: any = useRef([]);
  const product_img = product_images[0];
  const ratingValue =
    (product_rating ? product_rating : 0) /
    (product_reviews > 0 ? product_reviews : 1);

  /*HANDLERS*/

  const targetLikeHandler = async (e: any, id: string) => {
    try {
      assert.ok(verifyMemberData, Definer.auth_err1);
      const memberService = new MemberApiService();
      const data = { like_ref_id: id, group_type: "service" };
      const like_result: any = await memberService.memberLikeTarget(data);
      assert.ok(like_result, Definer.general_err1);

      if (like_result.like_status > 0) {
        e.target.style.fill = "#FF3040";
        refs.current[like_result.like_ref_id].innerHTML++;
      } else {
        e.target.style.fill = "white";
        refs.current[like_result.like_ref_id].innerHTML--;
      }
      await sweetTopSmallSuccessAlert("success", 700, false);
    } catch (err: any) {
      console.log("targetLikeBest, ERROR:::", err);
      sweetErrorHandling(err).then();
    }
  };
  return (
    <Stack
      className={
        cartChange === product_id
          ? "service_cart service_cart_active"
          : "service_cart"
      }
      onMouseEnter={() => setCartChange(product_id)}
      onMouseLeave={() => setCartChange(-1)}
      onClick={() => navigate(`/service/${_id}`)}
    >
      <Box
        sx={{
          backgroundImage: `url(${serverApi}/${product_img})`,
        }}
        className="image_box"
      >
        <Box
          className={
            cartChange === product_id
              ? "like_btn_wrap like_btn_wrap_active"
              : "like_btn_wrap"
          }
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Favorite
            onClick={(e) => targetLikeHandler(e, _id)}
            className="like_btn"
            sx={{
              fill: me_liked && me_liked[0]?.my_favorite ? "#FF3040" : "white",
            }}
          />
        </Box>
      </Box>
      <Box className="desc_box">
        <h4 className="cart_name">{member_data.mb_nick}</h4>
        <Box className="service_location">
          <LocationOn />
          <p className="location_text">{product_description}</p>
        </Box>
        <Box className="service_location">
          <Phone />
          <p className="location_text">{member_data.mb_phone}</p>
        </Box>
      </Box>
      <Box className="bottom_box">
        <Box className="review_box">
          <Rating
            className="review_icon"
            name="half-rating"
            value={ratingValue}
            precision={0.5}
            size="small"
            readOnly
          />
          <p className="review_text">({product_reviews || "0"})</p>
        </Box>
        <Box className="like_view_box">
          <Favorite className="like_view_btn" />
          <p
            ref={(element) => (refs.current[_id] = element)}
            className="like_view_cnt"
          >
            {product_likes}
          </p>
          <RemoveRedEye className="like_view_btn" />
          <p className="like_view_cnt">{product_views}</p>
        </Box>
      </Box>
    </Stack>
  );
};

export default ServiceCard;
