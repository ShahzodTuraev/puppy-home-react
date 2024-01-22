import { Box } from "@mui/material";
import React, { useState } from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Rating from "@mui/material/Rating";
import "../../scss/shoppingCart.scss";
import { useNavigate } from "react-router-dom";
import { serverApi } from "../lib/config";
import { ShoppingCartCont } from "../context/ShoppingCart";

const ShoppingCart = ({ cartData }: any) => {
  /*INITIALIZATIONS*/
  const {
    _id,
    product_images,
    product_name,
    product_price,
    product_discount,
    product_likes,
    product_views,
    product_review,
    product_review_cnt,
    product_left_cnt,
    product_liken,
    me_liked,
  } = cartData;
  const [cartChange, setCartChange] = useState<number>(-1);
  const navigate = useNavigate();
  const [addToCart, setAddToCart] = ShoppingCartCont();
  /*HANDLERS*/
  const addToCartHandler = () => {
    product_left_cnt !== 0 && setAddToCart([cartData, new Date()]);
  };
  return (
    <Box
      className="shop_cart"
      onMouseEnter={() => setCartChange(_id)}
      onMouseLeave={() => setCartChange(-1)}
      onClick={() => navigate(`/shop/${_id}`)}
    >
      <Box
        className="cart_img"
        sx={{
          backgroundImage: `url(${
            cartChange === _id && product_images.length > 1
              ? `${serverApi}/${product_images[1]}`
              : `${serverApi}/${product_images[0]}`
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
          onClick={(e) => {
            e.stopPropagation();
          }}
          className={
            cartChange === _id
              ? "like_btn_wrap like_btn_wrap_active"
              : "like_btn_wrap"
          }
        >
          <FavoriteIcon
            className="like_btn"
            sx={me_liked?.my_favorite ? { fill: "red" } : { fill: "white" }}
          />
        </Box>
      </Box>
      <Box className="cart_desc">
        <h4 className="cart_name">{product_name || "product name"}</h4>
        <Box className="price_box">
          <Box
            className={
              product_left_cnt === 0
                ? "price_wrap price_wrap_passive"
                : "price_wrap "
            }
          >
            <p className="cart_sale_price">
              &#8361;{" "}
              {product_discount > 0
                ? Math.round(
                    (product_price - (product_price * product_discount) / 100) /
                      10
                  ) * 10
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
            className="add_icon_wrap"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Box
              onClick={addToCartHandler}
              className={
                cartChange === _id && product_left_cnt !== 0
                  ? "add_cart_wrap add_cart_wrap_active"
                  : "add_cart_wrap"
              }
            >
              <AddShoppingCartIcon
                className={
                  cartChange === _id && product_left_cnt !== 0
                    ? "add_cart_icon add_cart_icon_active"
                    : "add_cart_icon"
                }
              />
            </Box>
          </Box>
        </Box>
        <p
          className={
            product_left_cnt === 0 ? "sold_text " : "sold_text sold_text_none"
          }
        >
          Sold Out
        </p>
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
