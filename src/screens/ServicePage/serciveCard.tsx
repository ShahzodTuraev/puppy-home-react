import { Favorite, LocationOn, Phone, RemoveRedEye } from "@mui/icons-material";
import { Box, Rating, Stack } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ServiceCard = ({ cartData }: any) => {
  /*INITIALIZATIONS*/
  /*INITIALIZATIONS*/
  const {
    product_id,
    product_images,
    product_name,
    product_address,
    product_phone,
    product_likes,
    product_views,
    product_review,
    product_review_cnt,
    product_liken,
  } = cartData;
  const [cartChange, setCartChange] = useState<number>(-1);
  const navigate = useNavigate();
  const product_img = product_images[0];
  return (
    <Stack
      className={
        cartChange === product_id
          ? "service_cart service_cart_active"
          : "service_cart"
      }
      onMouseEnter={() => setCartChange(product_id)}
      onMouseLeave={() => setCartChange(-1)}
      onClick={() => navigate(`/service/${product_id}`)}
    >
      <Box
        sx={{
          backgroundImage: `url(${product_img})`,
        }}
        className="image_box"
      >
        <Box
          className={
            cartChange === product_id
              ? "like_btn_wrap like_btn_wrap_active"
              : "like_btn_wrap"
          }
        >
          <Favorite
            className="like_btn"
            sx={product_liken ? { fill: "red" } : { fill: "white" }}
          />
        </Box>
      </Box>
      <Box className="desc_box">
        <h4 className="cart_name">{product_name}</h4>
        <Box className="service_location">
          <LocationOn />
          <p className="location_text">{product_address}</p>
        </Box>
        <Box className="service_location">
          <Phone />
          <p className="location_text">{product_phone}</p>
        </Box>
      </Box>
      <Box className="bottom_box">
        <Box className="review_box">
          <Rating
            className="review_icon"
            name="half-rating"
            defaultValue={product_review}
            precision={0.5}
            size="small"
            readOnly
          />
          <p className="review_text">({product_review_cnt})</p>
        </Box>
        <Box className="like_view_box">
          <Favorite className="like_view_btn" />
          <p className="like_view_cnt">{product_likes}</p>
          <RemoveRedEye className="like_view_btn" />
          <p className="like_view_cnt">{product_views}</p>
        </Box>
      </Box>
    </Stack>
  );
};

export default ServiceCard;
