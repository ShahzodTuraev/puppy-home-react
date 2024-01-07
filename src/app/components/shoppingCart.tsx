import { Box } from "@mui/material";
import React, { useState } from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Rating from "@mui/material/Rating";
import "../../scss/shoppingCart.scss";
const ShoppingCart = ({ cartData }: any) => {
  /*INITIALIZATIONS*/
  const {
    product_id,
    product_images,
    product_name,
    product_price,
    product_discount,
    product_discount_period,
    product_likes,
    product_views,
    product_review,
    product_review_cnt,
    product_liken,
  } = cartData;
  const image_list = [
    "/images/categories/test1.jpg",
    "/images/categories/test2.jpg",
  ];
  const cart_list = [
    { id: 0, price: 5700, percent: 50 },
    { id: 1, price: 10000, percent: 50 },
    { id: 2, price: 6800, percent: 50 },
    { id: 3, price: 9300, percent: 50 },
    { id: 4, price: 5400, percent: 50 },
    { id: 5, price: 12000, percent: 50 },
    { id: 6, price: 7200, percent: 50 },
    { id: 7, price: 5800, percent: 50 },
  ];
  const [cartChange, setCartChange] = useState<number>(-1);

  /*HANDLERS*/
  return (
    <Box
      className="shop_cart"
      onMouseEnter={() => setCartChange(product_id)}
      onMouseLeave={() => setCartChange(-1)}
    >
      <Box
        className="cart_img"
        sx={{
          backgroundImage: `url(${
            cartChange === product_id && product_images.length > 1
              ? product_images[1]
              : product_images[0]
          })`,
        }}
      >
        <Box
          className={
            product_discount > 0 ? "discount_percent" : "discount_zero"
          }
        >
          <p className="percent_text">{product_discount}%</p>
        </Box>
        <Box
          className={
            cartChange === product_id
              ? "like_btn_wrap like_btn_wrap_active"
              : "like_btn_wrap"
          }
        >
          <FavoriteIcon
            className="like_btn"
            sx={product_liken ? { fill: "red" } : { fill: "white" }}
          />
        </Box>
        <Box className={product_discount_period ? "sale_box" : "discount_zero"}>
          Sale
        </Box>
      </Box>
      <Box className="cart_desc">
        <h4 className="cart_name">{product_name || "product name"}</h4>
        <Box className="price_box">
          <Box className="price_wrap">
            <p className="cart_sale_price">
              &#8361;{" "}
              {product_discount > 0
                ? (product_price * product_discount) / 100
                : product_price}
            </p>
            <p
              className={product_discount > 0 ? "cart_price" : "discount_zero"}
            >
              {" "}
              &#8361;{product_price}
            </p>
          </Box>
          <Box
            className={
              cartChange === product_id
                ? "add_cart_wrap add_cart_wrap_active"
                : "add_cart_wrap"
            }
          >
            <AddShoppingCartIcon
              className={
                cartChange === product_id
                  ? "add_cart_icon add_cart_icon_active"
                  : "add_cart_icon"
              }
            />
          </Box>
        </Box>
        <Box className="cart_bottom">
          <Box className="review_box">
            <Rating
              className="review_icon"
              name="half-rating"
              defaultValue={product_review}
              precision={0.5}
              size="small"
              readOnly
            />
            <p className="review_text">({product_review_cnt || 0})</p>
          </Box>
          <Box className="like_view_box">
            <FavoriteIcon className="like_view_btn" />
            <p className="like_view_cnt">{product_likes || 0}</p>
            <RemoveRedEyeIcon className="like_view_btn" />
            <p className="like_view_cnt">{product_views || 0}</p>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ShoppingCart;
