import { Box, Container, Stack } from "@mui/material";
import React from "react";
import { cart_trend } from "../../mock/cart_data";
import ShoppingCart from "../../app/components/shoppingCart";

const BigSales = () => {
  return (
    <Container className="trending_container sale_container">
      <Box className="title_wrap">
        <h2 className="component_title">Big Sales</h2>
        <Box
          sx={{ backgroundImage: "url(/icons/pw-mcafee.gif)" }}
          className="gif_box"
        />
      </Box>
      <Stack className="cart_wrap">
        {cart_trend.map((ele: any) => {
          return <ShoppingCart key={ele.product_id} cartData={ele} />;
        })}
      </Stack>
    </Container>
  );
};

export default BigSales;
