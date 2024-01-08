import { Box, Container, Stack } from "@mui/material";
import React, { useState } from "react";
import EastIcon from "@mui/icons-material/East";

const Events = () => {
  //* INITIALIZATIONS*/
  const [cartChange, setCartChange] = useState<number>(-1);
  const cart_data = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
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
        <Box className="carts_wrap">
          {cart_data.map(({ id }) => {
            return (
              <Stack
                key={id}
                onMouseEnter={() => setCartChange(id)}
                onMouseLeave={() => setCartChange(-1)}
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
            );
          })}
        </Box>
      </Container>
    </div>
  );
};

export default Events;
