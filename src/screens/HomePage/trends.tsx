import { Container, Stack } from "@mui/material";
import React from "react";
import { cart_list } from "../../mock/cart_data";
import ShoppingCart from "../../app/components/shoppingCart";
const Trends = () => {
  /*INITIALIZATIONS*/

  /*HANDLERS*/
  return (
    <Container className="trending_container">
      <h2 className="component_title">Trending Products</h2>
      <Stack className="cart_wrap">
        {cart_list.map((ele) => {
          return <ShoppingCart cartData={ele} key={ele.product_id} />;
        })}
      </Stack>
    </Container>
  );
};

export default Trends;
