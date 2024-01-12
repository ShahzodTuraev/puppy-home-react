import { Box, Button, Container, Stack } from "@mui/material";
import React, { useState } from "react";
import EastIcon from "@mui/icons-material/East";
import { cart_list } from "../../mock/cart_data";
import ShoppingCart from "../../app/components/shoppingCart";
const Trends = () => {
  /*INITIALIZATIONS*/
  const [activeBtn, setActiveBtn] = useState<any>({
    btn1: true,
    btn2: false,
    btn3: false,
  });
  /*HANDLERS*/
  const handleSort = (e: any) => {
    const id = e.target.id;
    switch (id) {
      case "bestseller":
        setActiveBtn({
          btn1: false,
          btn2: true,
          btn3: false,
        });
        break;
      case "latest":
        setActiveBtn({
          btn1: false,
          btn2: false,
          btn3: true,
        });
        break;
      default:
        setActiveBtn({
          btn1: true,
          btn2: false,
          btn3: false,
        });
        break;
    }
  };
  return (
    <Container className="trending_container">
      <h2 className="component_title">Trending Products</h2>
      <Box className="sort_btn_wrap">
        <Button
          id="featured"
          onClick={(e) => handleSort(e)}
          className={activeBtn.btn1 ? "sort_btn sort_btn_active" : "sort_btn"}
        >
          Featured
        </Button>
        <Button
          id="bestseller"
          onClick={(e) => handleSort(e)}
          className={activeBtn.btn2 ? "sort_btn sort_btn_active" : "sort_btn"}
        >
          Bestseller
        </Button>
        <Button
          id="latest"
          onClick={(e) => handleSort(e)}
          className={activeBtn.btn3 ? "sort_btn sort_btn_active" : "sort_btn"}
        >
          Latest
        </Button>
      </Box>
      <Stack sx={{ gap: "20px" }} className="cart_wrap">
        {cart_list.map((ele) => {
          return <ShoppingCart cartData={ele} key={ele.product_id} />;
        })}
      </Stack>
      <Box className="bottom_box">
        <Box className="link_wrap">
          <h4 className="link_all">See all products</h4>
          <EastIcon />
        </Box>
      </Box>
    </Container>
  );
};

export default Trends;
