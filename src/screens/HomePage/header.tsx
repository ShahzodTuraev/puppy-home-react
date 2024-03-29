import { Box, Button } from "@mui/material";
import React from "react";
import EastIcon from "@mui/icons-material/East";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useNavigate } from "react-router-dom";
const Header = () => {
  /*INITIALIZATIONS*/
  const navigate = useNavigate();
  return (
    <div id="homeHeader" className="home_header">
      <Swiper
        spaceBetween={0}
        loop={true}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide className="swiper_slide">
          <Box className="text_box">
            <Box className="text_wrap">
              <h3 className="sup_title">Your Dogs Deserve The Best</h3>
              <h2 className="head_title">Shop All Dog Collections</h2>
              <h4 className="head_text">
                We are fully prepared to cater to your puppies. Understanding
                that each puppy has distinct needs, we continually curate new
                collections and services tailored to their preferences, ensuring
                their joy and satisfaction.
              </h4>
              <Button onClick={() => navigate("/shop")} className="start_btn">
                start your journey <EastIcon className="right_dir" />
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              backgroundImage: "url(/images/header_img/glass-dog.png)",
              backgroundSize: "63%",
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
                We are fully prepared to cater to your puppies. Understanding
                that each puppy has distinct needs, we continually curate new
                collections and services tailored to their preferences, ensuring
                their joy and satisfaction.
              </h4>
              <Button onClick={() => navigate("/shop")} className="start_btn">
                start your journey <EastIcon className="right_dir" />
              </Button>
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
                We are fully prepared to cater to your puppies. Understanding
                that each puppy has distinct needs, we continually curate new
                collections and services tailored to their preferences, ensuring
                their joy and satisfaction.
              </h4>
              <Button onClick={() => navigate("/shop")} className="start_btn">
                start your journey <EastIcon className="right_dir" />
              </Button>
            </Box>
          </Box>
          <Box
            sx={{ backgroundImage: "url(/images/header_img/ord-dog.png)" }}
            className="image_box"
          />
        </SwiperSlide>
        <SwiperSlide className="swiper_slide">
          <Box className="text_box">
            <Box className="text_wrap">
              <h3 className="sup_title">Your Dog Deserve The Best</h3>
              <h2 className="head_title">Shop All Dog Collections</h2>
              <h4 className="head_text">
                We are fully prepared to cater to your puppies. Understanding
                that each puppy has distinct needs, we continually curate new
                collections and services tailored to their preferences, ensuring
                their joy and satisfaction.
              </h4>
              <Button onClick={() => navigate("/shop")} className="start_btn">
                start your journey <EastIcon className="right_dir" />
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              backgroundImage: "url(/images/header_img/parfume.png)",
              backgroundSize: "83%",
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
                We are fully prepared to cater to your puppies. Understanding
                that each puppy has distinct needs, we continually curate new
                collections and services tailored to their preferences, ensuring
                their joy and satisfaction.
              </h4>
              <Button onClick={() => navigate("/shop")} className="start_btn">
                start your journey <EastIcon className="right_dir" />
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              backgroundImage: "url(/images/header_img/guitar-dog.png)",
              backgroundSize: "89%",
            }}
            className="image_box"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Header;
