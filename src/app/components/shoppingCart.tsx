import { Box } from "@mui/material";
import React, { useRef, useState } from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Rating from "@mui/material/Rating";
import "../../scss/shoppingCart.scss";
import { useNavigate } from "react-router-dom";
import { serverApi } from "../lib/config";
import { ShoppingCartCont } from "../context/ShoppingCart";
import assert from "assert";
import { verifyMemberData } from "../apiServices/verify";
import { Definer } from "../lib/Definer";
import MemberApiService from "../apiServices/memberApiService";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../lib/sweetAlert";

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
    product_reviews,
    product_rating,
    product_left_cnt,
    me_liked,
  } = cartData;
  const [cartChange, setCartChange] = useState<number>(-1);
  const navigate = useNavigate();
  const refs: any = useRef([]);
  const setAddToCart = ShoppingCartCont();
  const ratingValue =
    (product_rating ? product_rating : 0) /
    (product_reviews > 0 ? product_reviews : 1);
  /*HANDLERS*/
  const addToCartHandler = () => {
    product_left_cnt !== 0 && setAddToCart[1]([cartData, 1, new Date()]);
  };
  const targetLikeHandler = async (e: any, id: string) => {
    try {
      assert.ok(verifyMemberData, Definer.auth_err1);
      const memberService = new MemberApiService();
      const data = { like_ref_id: id, group_type: "product" };
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
            onClick={(e) => targetLikeHandler(e, _id)}
            sx={{
              fill: me_liked && me_liked[0]?.my_favorite ? "#FF3040" : "white",
            }}
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
              value={ratingValue}
              precision={0.5}
              size="small"
              readOnly
            />
            <p className="review_text">({product_reviews || "0"})</p>
          </Box>
          <Box className="like_view_box">
            <FavoriteIcon className="like_view_btn" />
            <p
              ref={(element) => (refs.current[_id] = element)}
              className="like_view_cnt"
            >
              {product_likes}
            </p>
            <RemoveRedEyeIcon className="like_view_btn" />
            <p className="like_view_cnt">{product_views}</p>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ShoppingCart;
