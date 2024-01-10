import React from "react";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { Box, Container, Stack } from "@mui/material";
const Features = () => {
  return (
    <Container className="features_container">
      <Stack className="boxes_wrap">
        <Box className="feature_box">
          <Box className="feature_icon">
            <PhoneInTalkIcon className="phone_icon" />
          </Box>
          <p className="feature_head">24 x 7 Free Support</p>
          <p className="feature_info">
            International call center for clients and business owners
          </p>
        </Box>
        <Box className="divider" />
        <Box className="feature_box">
          <Box className="feature_icon">
            <LocalShippingIcon className="phone_icon" />
          </Box>
          <p className="feature_head">Free Worldwide Shipping</p>
          <p className="feature_info">
            In the case of total order amount over <br /> &#8361; 100,000
          </p>
        </Box>
        <Box className="divider" />
        <Box className="feature_box">
          <Box className="feature_icon">
            <AttachMoneyIcon className="phone_icon" />
          </Box>
          <p className="feature_head">Money Back Gurantee</p>
          <p className="feature_info">
            Money back after order cancellation according to product features
          </p>
        </Box>
      </Stack>
    </Container>
  );
};

export default Features;
