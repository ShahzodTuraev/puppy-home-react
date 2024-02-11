import { Box, Container, Stack } from "@mui/material";
import React from "react";
import ShoppingCart from "../../app/components/shoppingCart";
import EastIcon from "@mui/icons-material/East";
// REDUX
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveBigSales } from "./selector";
import { useTimer } from "react-timer-hook";
// REDUX SELECTOR
const bigSalesRetriever = createSelector(retrieveBigSales, (bigSales) => ({
  bigSales,
}));
const BigSales = () => {
  /*INITIALIZATION*/
  const { bigSales } = useSelector(bigSalesRetriever);
  const expiryTimestamp = new Date("2024-01-29T15:25");

  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 86400 * 30);
  const { seconds, minutes, hours, days } = useTimer({
    expiryTimestamp,
  });
  return (
    <Container className="trending_container sale_container">
      <Box className="title_wrap">
        <h2 className="component_title">Big Sales</h2>
        <Box
          sx={{ backgroundImage: "url(/icons/pw-mcafee.gif)" }}
          className="gif_box"
        />
        <Box className="sale_period">
          <Box className="digit_box">{days < 10 ? `0${days}` : days}</Box>:
          <Box className="digit_box">{hours < 10 ? `0${hours}` : hours}</Box>:
          <Box className="digit_box">
            {minutes < 10 ? `0${minutes}` : minutes}
          </Box>
          :
          <Box className="digit_box">
            {seconds < 10 ? `0${seconds}` : seconds}
          </Box>
        </Box>
      </Box>
      <Stack className="cart_wrap">
        {bigSales.map((ele: any) => {
          return <ShoppingCart key={ele._id} cartData={ele} />;
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

export default BigSales;
