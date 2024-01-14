import {
  Add,
  Close,
  Favorite,
  FavoriteBorder,
  Home,
  Remove,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Rating,
  Stack,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactImageMagnify from "react-image-magnify";
import "../../scss/shop.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { cart_list } from "../../mock/cart_data";
import ShoppingCart from "../../app/components/shoppingCart";

const ChosenProduct = () => {
  /*INITIALIATIONS*/
  const [count, setCount] = useState<number>(1);
  const navigate = useNavigate();

  return (
    <div className="chosen_product">
      {/* <Header /> */}
      <Container className="chosen_container">
        <Box className="dir_box">
          <Box onClick={() => navigate("/")} className="dir_link">
            <Home />
            <p>Home</p>
          </Box>
          <p className="link_div">/</p>
          <Box className="dir_link">
            <p className="before_icon">Shop</p>
          </Box>
          <p className="link_div">/</p>
          <Box className="dir_link">
            <p className="before_icon">Product</p>
            <Close onClick={() => navigate("/shop")} className="close" />
          </Box>
        </Box>
        <Stack className="pro_main_box">
          <Box className="pro_img_box">
            <Box className="select_box">
              <img
                src="/images/categories/bed.jpg"
                className="select_item"
                alt="product"
              />

              <img
                src="/images/categories/bed.jpg"
                className="select_item"
                alt="product"
              />
              <img
                src="/images/categories/bed.jpg"
                className="select_item"
                alt="product"
              />
              <img
                src="/images/categories/bed.jpg"
                className="select_item"
                alt="product"
              />
              <img
                src="/images/categories/bed.jpg"
                className="select_item"
                alt="product"
              />
            </Box>
            <Box className="main_img_box">
              <ReactImageMagnify
                className="selected_item"
                {...{
                  smallImage: {
                    alt: "Wristwatch by Ted Baker London",
                    isFluidWidth: true,
                    src: "/images/mock-img/full.jpg",
                  },
                  largeImage: {
                    width: 700,
                    height: 700,
                    src: "/images/mock-img/full.jpg",
                  },
                }}
              />
            </Box>
          </Box>
          <Box className="info_box">
            <Box className="name_wrap">
              <h4 className="product_name">Product full name</h4>
              {false ? (
                <Favorite sx={{ fill: "red" }} className="favorite_icon" />
              ) : (
                <FavoriteBorder
                  sx={{ fill: "#6e6e6e" }}
                  className="favorite_icon"
                />
              )}
            </Box>
            <Box className="review_box">
              <Rating
                className="review_icon"
                name="half-rating"
                defaultValue={4}
                precision={0.5}
                size="small"
                readOnly
              />
              <p className="review_text">({23})</p>
            </Box>
            <Box className="vertical_line" />
            <Box className="price_box">
              <Box className="discount_percent">
                <p>50%</p>
              </Box>
              <p className="real_price"> &#8361; 25000</p>
            </Box>
            <Box className="feat_box">
              <p className="sale_price">&#8361; 12500</p>
              <Box className="point_box">
                <img
                  src="/icons/point.png"
                  alt="point"
                  className="point_icon"
                />
                <p>120 points</p>
              </Box>
            </Box>
            <p className="product_desc">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque
              quibusdam tempore consectetur voluptatum suscipit, sed blanditiis
              molestias, itaque, repellendus quae numquam cupiditate aliquam
              distinctio. Sit placeat repudiandae commodi facilis voluptates.
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde
              saepe eius cumque, omnis voluptatem tempore.
            </p>
            <p className="size_box">Size:</p>
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="s"
                  control={<Radio color="secondary" />}
                  label="S"
                />
                <FormControlLabel
                  value="m"
                  control={<Radio color="secondary" />}
                  label="M"
                />
                <FormControlLabel
                  value="l"
                  control={<Radio color="secondary" />}
                  label="L"
                />
                <FormControlLabel
                  value="xl"
                  control={<Radio color="secondary" />}
                  label="XL"
                />
                <FormControlLabel
                  value="xxl"
                  control={<Radio color="secondary" />}
                  label="XXL"
                />
              </RadioGroup>
            </FormControl>
            <Box className="add_box">
              <Box className="add_number">
                <Remove
                  onClick={() => {
                    count > 1 ? setCount(count - 1) : setCount(1);
                  }}
                  className="add_rem_icon"
                />
                <p className="show_num">{count}</p>
                <Add
                  onClick={() => setCount(count + 1)}
                  className="add_rem_icon"
                />
              </Box>
              <Button className="add_btn">add to cart</Button>
            </Box>
          </Box>
        </Stack>
        <Stack className="related_box">
          <h3>Related Products</h3>
          <Swiper
            className="rec_swiper"
            spaceBetween={20}
            slidesPerView={4}
            navigation={true}
            modules={[Navigation]}
          >
            {cart_list.map((ele) => {
              return (
                <SwiperSlide key={ele.product_id}>
                  <ShoppingCart cartData={ele} key={ele.product_id} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Stack>
        <Stack className="review_wrap">
          <h3 className="box_title">Product Reviews</h3>
          <Box className="reviews_panel">
            <Box className="one_review">
              <Box className="head_wrap">
                <Avatar src="/images/mock-img/images.jpeg" alt="reviewer" />
                <p className="reviewer_name">John Den</p>
                <Rating
                  className="review_icon"
                  name="half-rating"
                  defaultValue={4}
                  precision={0.5}
                  size="small"
                  readOnly
                />
              </Box>
              <Box className="main_review">
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Placeat non vero labore expedita? Fugiat aperiam quos ratione
                  consectetur officiis, temporibus, animi non assumenda
                  voluptatum placeat, est dolorum error aut eos facilis. Numquam
                  ipsum tenetur culpa laboriosam vitae soluta ipsa, libero, rem
                  mollitia sequi ducimus doloribus quaerat in laborum. Rem,
                  magni iure culpa vel similique alias vitae. Similique cum
                  doloribus dignissimos.
                </p>
              </Box>
            </Box>
            <Box className="one_review">
              <Box className="head_wrap">
                <Avatar src="/images/mock-img/images.jpeg" alt="reviewer" />
                <p className="reviewer_name">John Den</p>
                <Rating
                  className="review_icon"
                  name="half-rating"
                  defaultValue={4}
                  precision={0.5}
                  size="small"
                  readOnly
                />
              </Box>
              <p className="main_review">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Placeat non vero labore expedita? Fugiat aperiam quos ratione
                consectetur officiis, temporibus, animi non assumenda voluptatum
                placeat, est dolorum error aut eos facilis. Numquam ipsum
                tenetur culpa laboriosam vitae soluta ipsa, libero, rem mollitia
                sequi ducimus doloribus quaerat in laborum. Rem, magni iure
                culpa vel similique alias vitae. Similique cum doloribus
                dignissimos.
              </p>
            </Box>
          </Box>
          <Box className="title_line">
            <p>Seller info</p>
          </Box>
          <Box className="seller_info_wrap">
            <p className="thead">Shop name</p>
            <p className="tbody">Shon Shop</p>
            <p className="thead">Email</p>
            <p className="tbody">shonShop@gmail.com</p>
            <p className="thead">Address</p>
            <p className="tbody">South Korea Busan Saha-gu Hadan-dong 45, 12</p>
            <p className="thead">Phone Number</p>
            <p className="tbody">01043567888</p>
          </Box>
        </Stack>
      </Container>
    </div>
  );
};

export default ChosenProduct;
