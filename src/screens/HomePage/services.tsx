import { Box, Container, Stack } from "@mui/material";
import React, { useState } from "react";

import EastIcon from "@mui/icons-material/East";
const Services = () => {
  //* INITIALIZATIONS*/
  const [cartChange, setCartChange] = useState<number>(-1);
  const cart_data = [
    {
      id: 1,
      img_src: [
        "/images/services/service1.png",
        "/images/services/alt-service1.png",
      ],
      title: "Grooming",
      text: "Modernize the way you manage your brick-and-mortar or mobile dog grooming activity.",
    },
    {
      id: 2,
      img_src: [
        "/images/services/service2.png",
        "/images/services/alt-service2.png",
      ],
      title: "Daycare",
      text: "Spend less time managing backend tasks and more time with the pets in your care.",
    },
    {
      id: 3,
      img_src: [
        "/images/services/service3.png",
        "/images/services/alt-service3.png",
      ],
      title: "Boarding",
      text: "Streamline operations to provide a seamless boarding experience for your clients and their pets.",
    },
  ];

  return (
    <div className="service_section">
      <Container className="service_container">
        <h2 className="component_title service_title">
          Care Your Puppy with Us
        </h2>
        <Stack className="service_wrap">
          {cart_data.map(({ id, img_src, title, text }) => {
            return (
              <Box
                onMouseEnter={() => setCartChange(id)}
                onMouseLeave={() => setCartChange(-1)}
                className="service_box"
                key={id}
              >
                <Box className="image_box">
                  <img
                    className="service_img"
                    src={img_src[0]}
                    alt="service icons"
                  />
                  <img
                    src={img_src[1]}
                    alt="service 1"
                    className={
                      cartChange === id
                        ? "alt_service_img alt_service_img_change"
                        : "alt_service_img"
                    }
                  />
                </Box>
                <Box
                  className={
                    cartChange === id
                      ? "bottom_box bottom_box_down"
                      : "bottom_box"
                  }
                >
                  <p className="service_title">{title}</p>
                  <p className="service_text">{text}</p>
                  <Box
                    className={
                      cartChange === id
                        ? "service_link  service_link_active "
                        : "service_link"
                    }
                  >
                    <p className="link_name">Learn More</p>
                    <EastIcon className="link_icon" />
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Stack>
      </Container>
    </div>
  );
};

export default Services;
