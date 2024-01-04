import { Box } from "@mui/material";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay, Pagination } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
const Header = () => {
  return (
    <div className="home_header">
      <Swiper
        spaceBetween={0}
        loop={true}
        centeredSlides={true}
        // autoplay={{
        //   delay: 2500,
        //   disableOnInteraction: false,
        // }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide className="swiper_slide">
          <Box className="text_box">
            <Box className="text_wrap">
              <h3 className="sup_title">Your Dog Deserve The Best</h3>
              <h2 className="head_title">Shop All Dog Collections</h2>
              <h4 className="head_text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Necessitatibus hic provident accusantium magnam veritatis
                voluptate! Nam delectus voluptatum aliquam omnis ipsum, aliquid
                labore obcaecati eum!
              </h4>
            </Box>
          </Box>
          <Box
            sx={{
              backgroundImage: "url(/images/header_img/glass-dog.png)",
              backgroundSize: "55%",
            }}
            className="image_box"
          />
        </SwiperSlide>
        <SwiperSlide className="swiper_slide">
          <Box className="text_box">
            <Box className="text_wrap">
              <h3 className="sup_title">Your Dog Deserve The Best</h3>
              <h2 className="head_title">Shop All Dog Collections</h2>
              <h4 className="head_text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Necessitatibus hic provident accusantium magnam veritatis
                voluptate! Nam delectus voluptatum aliquam omnis ipsum, aliquid
                labore obcaecati eum!
              </h4>
            </Box>
          </Box>
          <Box
            sx={{ backgroundImage: "url(/images/header_img/travel-dog.png)" }}
            className="image_box"
          ></Box>
        </SwiperSlide>
        <SwiperSlide className="swiper_slide">
          <Box className="text_box">
            <Box className="text_wrap">
              <h3 className="sup_title">Your Dog Deserve The Best</h3>
              <h2 className="head_title">Shop All Dog Collections</h2>
              <h4 className="head_text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Necessitatibus hic provident accusantium magnam veritatis
                voluptate! Nam delectus voluptatum aliquam omnis ipsum, aliquid
                labore obcaecati eum!
              </h4>
            </Box>
          </Box>
          <Box
            sx={{
              backgroundImage: "url(/images/header_img/parfume.png)",
              backgroundSize: "75%",
            }}
            className="image_box"
          />
        </SwiperSlide>
        <SwiperSlide className="swiper_slide">
          <Box className="text_box">
            <Box className="text_wrap">
              <h3 className="sup_title">Your Dog Deserve The Best</h3>
              <h2 className="head_title">Shop All Dog Collections</h2>
              <h4 className="head_text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Necessitatibus hic provident accusantium magnam veritatis
                voluptate! Nam delectus voluptatum aliquam omnis ipsum, aliquid
                labore obcaecati eum!
              </h4>
            </Box>
          </Box>
          <Box
            sx={{
              backgroundImage: "url(/images/header_img/guitar-dog.png)",
              backgroundSize: "75%",
            }}
            className="image_box"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Header;