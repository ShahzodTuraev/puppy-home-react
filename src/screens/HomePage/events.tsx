import { Box, Container, Stack } from "@mui/material";
import React, { useState } from "react";
import EastIcon from "@mui/icons-material/East";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Events = () => {
  //* INITIALIZATIONS*/
  const [cartChange, setCartChange] = useState<number>(-1);
  const cart_data = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
  ];
  return (
    <div className="events_section">
      <Container className="events_container">
        <Box className="title_wrap">
          <h2 className="events_title">Latest News and Insights</h2>
          <Box className="events_link">
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
          {cart_data.map(({ id }) => {
            return (
              <SwiperSlide
                key={id}
                onMouseEnter={() => setCartChange(id)}
                onMouseLeave={() => setCartChange(-1)}
                className="event_slide"
              >
                <Stack
                  className={
                    cartChange === id
                      ? "event_cart event_cart_active"
                      : "event_cart"
                  }
                >
                  <Box
                    className="event_img"
                    sx={{
                      backgroundImage: "url(/images/header_img/parfume.png)",
                    }}
                  />
                  <Box className="date_wrap">
                    <p className="event_date">20 Dec 2023</p>
                    <p className="event_type">blogs</p>
                  </Box>
                  <p className="event_topic">
                    Best Dog Grooming Software for 2024
                  </p>
                  <Box
                    className={
                      cartChange === id
                        ? "event_link event_link_active"
                        : "event_link"
                    }
                  >
                    <p className="link_info">read more</p>
                    <EastIcon />
                  </Box>
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
