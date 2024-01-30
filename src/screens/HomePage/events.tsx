import { Box, Container, Stack } from "@mui/material";
import React, { useState } from "react";
import EastIcon from "@mui/icons-material/East";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// REDUX
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveNews } from "./selector";
import Moment from "react-moment";
import { useNavigate } from "react-router-dom";
// REDUX SELECTOR
const newsRetriever = createSelector(retrieveNews, (news) => ({
  news,
}));
const Events = () => {
  //* INITIALIZATIONS*/
  const { news } = useSelector(newsRetriever);
  const [cartChange, setCartChange] = useState<number>(-1);
  const cart_images = [
    "/images/events/one.jpg",
    "/images/events/two.jpg",
    "/images/events/three.jpg",
    "/images/events/four.jpg",
    "/images/events/five.jpg",
    "/images/events/six.jpg",
    "/images/events/seven.jpg",
    "/images/events/eight.jpg",
    "/images/events/nine.jpg",
    "/images/events/ten.jpg",
    "/images/events/other-1.jpg",
    "/images/events/other-2.jpg",
    "/images/events/other-3.jpg",
    "/images/events/other-4.jpg",
    "/images/events/other-5.jpg",
  ];
  const navigate = useNavigate();
  return (
    <div className="events_section">
      <Container className="events_container">
        <Box className="title_wrap">
          <h2 className="events_title">Latest News and Insights</h2>
          <Box onClick={() => navigate("/daeng-gram")} className="events_link">
            <p className="link_text">View all posts</p>
            <EastIcon />
          </Box>
        </Box>

        <Swiper
          spaceBetween={40}
          slidesPerView={3}
          loop={true}
          centeredSlides={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          className="carts_wrap"
        >
          {news.map((event, index) => {
            return (
              <SwiperSlide
                key={event._id}
                onMouseEnter={() => setCartChange(index)}
                onMouseLeave={() => setCartChange(-1)}
                className="event_slide"
              >
                <Stack
                  className={
                    cartChange === index
                      ? "event_cart event_cart_active"
                      : "event_cart"
                  }
                >
                  <img
                    src={
                      index > 14
                        ? "/images/events/defoult.png"
                        : cart_images[index]
                    }
                    className="event_img"
                    alt="event"
                  />

                  <Box className="date_wrap">
                    <p className="event_date">
                      <Moment format="YYYY.MM.DD">{event.event_time}</Moment>
                    </p>
                    <p className="event_type">events</p>
                  </Box>
                  <p className="event_topic">{event.event_subject}</p>
                  <p className="event_content">{event.event_content}</p>
                </Stack>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          centeredSlides={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          className="carts_wrap_mobile"
        >
          {news.map((event, index) => {
            return (
              <SwiperSlide
                key={event._id}
                onMouseEnter={() => setCartChange(index)}
                onMouseLeave={() => setCartChange(-1)}
                className="event_slide"
              >
                <Stack
                  className={
                    cartChange === index
                      ? "event_cart event_cart_active"
                      : "event_cart"
                  }
                >
                  <img
                    src={
                      index > 14
                        ? "/images/events/defoult.png"
                        : cart_images[index]
                    }
                    className="event_img"
                    alt="event"
                  />

                  <Box className="date_wrap">
                    <p className="event_date">
                      <Moment format="YYYY.MM.DD">{event.event_time}</Moment>
                    </p>
                    <p className="event_type">events</p>
                  </Box>
                  <p className="event_topic">{event.event_subject}</p>
                  <p className="event_content">{event.event_content}</p>
                </Stack>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Container>
    </div>
  );
};

export default Events;
