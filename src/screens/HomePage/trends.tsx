import { Box, Container, Stack } from "@mui/material";
import React, { useState } from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Rating from "@mui/material/Rating";
import { cart_list } from "../../mock/cart_data";
import ShoppingCart from "../../app/components/shoppingCart";
const Trends = () => {
  /*INITIALIZATIONS*/
  const image_list = [
    "/images/categories/test1.jpg",
    "/images/categories/test2.jpg",
  ];

  const [cartChange, setCartChange] = useState<number>(-1);

  /*HANDLERS*/
  return (
    <Container className="trending_container">
      <h2 className="component_title">Trending Products</h2>
      <Stack className="cart_wrap">
        {cart_list.map((ele) => {
          return <ShoppingCart cartData={ele} key={ele.product_id} />;
        })}

        {/* {cart_list.map(({ id, price, percent }) => {
          return (
          
            <Box
              key={id}
              className="shop_cart"
              onMouseEnter={() => setCartChange(id)}
              onMouseLeave={() => setCartChange(-1)}
            >
              <Box
                className="cart_img"
                sx={{
                  backgroundImage: `url(${
                    cartChange === id ? image_list[1] : image_list[0]
                  })`,
                }}
              >
                <Box className="discount_percent">
                  <p className="percent_text">{percent}%</p>
                </Box>
                <Box
                  className={
                    cartChange === id
                      ? "like_btn_wrap like_btn_wrap_active"
                      : "like_btn_wrap"
                  }
                >
                  <FavoriteIcon className="like_btn" sx={{ fill: "white" }} />
                </Box>
                <Box className="sale_box">Sale</Box>
              </Box>
              <Box className="cart_desc">
                <h4 className="cart_name">Puppy Toys new collection </h4>
                <Box className="price_box">
                  <Box className="price_wrap">
                    <p className="cart_sale_price">
                      &#8361; {(price * percent) / 100}{" "}
                    </p>
                    <p className="cart_price"> &#8361;{price}</p>
                  </Box>
                  <Box
                    className={
                      cartChange === id
                        ? "add_cart_wrap add_cart_wrap_active"
                        : "add_cart_wrap"
                    }
                  >
                    <AddShoppingCartIcon
                      className={
                        cartChange === id
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
                      defaultValue={4.5}
                      precision={0.5}
                      size="small"
                      readOnly
                    />
                    <p className="review_text">(24)</p>
                  </Box>
                  <Box className="like_view_box">
                    <FavoriteIcon className="like_view_btn" />
                    <p className="like_view_cnt">20</p>
                    <RemoveRedEyeIcon className="like_view_btn" />
                    <p className="like_view_cnt">30</p>
                  </Box>
                </Box>
              </Box>
            </Box>
          );
        })}
         */}
      </Stack>
    </Container>
  );
};

export default Trends;
