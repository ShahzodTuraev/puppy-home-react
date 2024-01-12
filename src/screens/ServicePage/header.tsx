import { Box, Stack } from "@mui/material";
import React from "react";

const Header = () => {
  return (
    <Stack
      className="shop_header"
      sx={{ backgroundImage: "url(/images/header_img/service.jpg)" }}
    >
      <Box className="header_filter" />
    </Stack>
  );
};

export default Header;
