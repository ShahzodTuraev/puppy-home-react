import {
  ArrowBack,
  ArrowForward,
  Close,
  Email,
  Favorite,
  FavoriteBorder,
  Home,
  Phone,
  Room,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Container,
  Pagination,
  PaginationItem,
  Rating,
  Stack,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import "../../scss/shop.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { service_list } from "../../mock/cart_data";
import ServiceCard from "./serciveCard";

const ChosenService = () => {
  /*INITIALIATIONS*/
  const navigate = useNavigate();

  return (
    <div className="chosen_product">
      <Container className="chosen_container">
        <Box className="dir_box">
          <Box onClick={() => navigate("/")} className="dir_link">
            <Home />
            <p>Home</p>
          </Box>
          <p className="link_div">/</p>
          <Box className="dir_link">
            <p className="before_icon">Service</p>
          </Box>
          <p className="link_div">/</p>
          <Box className="dir_link">
            <p className="before_icon">One Service</p>
            <Close onClick={() => navigate("/service")} className="close" />
          </Box>
        </Box>
        <Stack className="pro_main_box">
          <Box className="pro_img_box">
            <Swiper
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Navigation]}
              className="img_swiper"
            >
              <SwiperSlide>
                <img
                  className="service_img"
                  src="/images/categories/bag.jpg"
                  alt="content"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  className="service_img"
                  src="/images/categories/dish.jpg"
                  alt="content"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  className="service_img"
                  src="/images/categories/dish.jpg"
                  alt="content"
                />
              </SwiperSlide>
            </Swiper>
          </Box>
          <Box className="info_box">
            <Box className="name_wrap">
              <h4 className="product_name">Service full name</h4>
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
            <p className="content">
              <Room className="content_icon" />
              South Korea
            </p>
            <a href="tel:01057885120" className="content">
              <Phone className="content_icon" />+ 82 10 5788 5120
            </a>
            <a href="mailto:turayevshahzodbek@gmail.com" className="content">
              <Email className="content_icon" />
              turayevshahzodbek@gmail.com
            </a>
            <p className="product_desc">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque
              quibusdam tempore consectetur voluptatum suscipit, sed blanditiis
              molestias, itaque, repellendus quae numquam cupiditate aliquam
              distinctio. Sit placeat repudiandae commodi facilis voluptates.
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde
              saepe eius cumque, omnis voluptatem tempore.
            </p>
          </Box>
        </Stack>
        <Stack className="map_frame">
          <iframe
            title="service_map"
            className="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26107.742892427817!2d128.95518719999998!3d35.1199964!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3568c2ffb8e84cd9%3A0x1fed96ccb595772d!2sEulsukdo%20Park!5e0!3m2!1sen!2skr!4v1705193595401!5m2!1sen!2skr"
          ></iframe>
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
          <Pagination
            sx={{ mt: "20px" }}
            count={3}
            page={1}
            renderItem={(item) => (
              <PaginationItem
                components={{
                  previous: ArrowBack,
                  next: ArrowForward,
                }}
                {...item}
              />
            )}
          />
        </Stack>
        <Stack sx={{ pt: 5, pb: 10 }} className="related_box">
          <h3 className="related_head">Related Services</h3>
          <Swiper
            className="rec_swiper"
            spaceBetween={50}
            style={{ width: "85%" }}
            slidesPerView={3}
            navigation={true}
            modules={[Navigation]}
          >
            {service_list.map((ele) => {
              return (
                <SwiperSlide key={ele.product_id}>
                  <ServiceCard cartData={ele} key={ele.product_id} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Stack>
      </Container>
    </div>
  );
};

export default ChosenService;
