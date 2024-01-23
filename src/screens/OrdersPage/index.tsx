import {
  Box,
  Button,
  Container,
  FormControlLabel,
  Radio,
  Stack,
} from "@mui/material";
import React, { useEffect } from "react";
import "../../scss/orders.scss";
import {
  CreditCard,
  FavoriteBorder,
  ListAltOutlined,
  PinDropOutlined,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { WishCont } from "../../app/context/Wishlist";
import { MakeOrderCont } from "../../app/context/MakeOrder";
import WishList from "./wishList";
import MyAccount from "./myAccount";

// REDUX
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setFinishedOrders, setpendingOrders, setProcessOrders } from "./slice";
import { Order } from "../../types/order";
import { verifyMemberData } from "../../app/apiServices/verify";
import { Member } from "../../types/user";

// REDUX SLICE
const actionDispatch = (dispatch: Dispatch) => ({
  setpendingOrders: (data: Order[]) => dispatch(setpendingOrders(data)),
  setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
  setFinishedOrders: (data: Order[]) => dispatch(setFinishedOrders(data)),
});

const OrdersPage = () => {
  /*INSTALIZATIONS*/
  const verifiedMemberData: Member | null = verifyMemberData;
  const { setpendingOrders, setProcessOrders, setFinishedOrders } =
    actionDispatch(useDispatch());
  const pathname = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);
  const [side, setSide] = WishCont();
  const [orderBtn, setOrderBtn] = MakeOrderCont();
  const sideList = [
    { id: 0, icon: <ListAltOutlined />, title: "My Orders" },
    { id: 1, icon: <PinDropOutlined />, title: "My Address" },
    { id: 2, icon: <CreditCard />, title: "My Account" },
    { id: 3, icon: <FavoriteBorder />, title: "Wishlist" },
  ];
  const topBtn = [
    { id: 0, title: "All Orders" },
    { id: 1, title: "Pending" },
    { id: 2, title: "Process" },
    { id: 3, title: "Delivered" },
    { id: 4, title: "Cancelled" },
  ];
  const navigate = useNavigate();
  return (
    <Container className="orders_container">
      <Stack className="main_wrap">
        <Box className="sidebar">
          <h4 className="side_head">Quick Access</h4>
          {sideList.map(({ id, icon, title }) => {
            return (
              <Box
                key={id}
                className={
                  id === side ? "side_btn side_btn_active" : "side_btn"
                }
                onClick={() => setSide(id)}
              >
                {icon}
                <p>{title}</p>
              </Box>
            );
          })}
        </Box>
        <Box className="mainbar">
          <Box className="top_btn_wrap">
            {topBtn.map(({ id, title }) => {
              return (
                <Button
                  key={id}
                  className={
                    orderBtn === id ? "top_btn top_btn_active" : "top_btn"
                  }
                  onClick={() => setOrderBtn(id)}
                >
                  {title}
                </Button>
              );
            })}
          </Box>
          {side === 0 && (
            <Stack className="orders_wrap">
              <Box className="order_box">
                <Box className="order_header">
                  <Box className="header_left_box">
                    <Box className="title_wrap">
                      <h3 className="bold_head">Order ID: #23534561 </h3>
                      <p className="status">Processing</p>
                    </Box>

                    <p>
                      Proceed on <span>9 Jan 2022</span>
                    </p>
                  </Box>
                  <Box className="header_right_box">
                    <h3 className="bold_head">&#8361; 76000 </h3>
                    <p>Total amount</p>
                  </Box>
                </Box>
                <Box className="margin">
                  <Box className="marginer" />
                </Box>
                <Box className="table_head">
                  <Box className="head_product">Product</Box>
                  <Box className="head_item">Price</Box>
                  <Box className="head_item">Delivery Cost</Box>
                  <Box className="head_item">Quantity</Box>
                </Box>
                <Box className="tbody_wrap">
                  {[1, 2, 3, 4].map((ele, id) => {
                    return (
                      <Box
                        key={id}
                        className={
                          id % 2 === 0
                            ? "table_body"
                            : "table_body table_body_active"
                        }
                      >
                        <Box className="product_wrap">
                          <img
                            src="/images/mock-img/mock-2.jpg"
                            alt="product"
                          />
                          <p>New Collection Dog Wear</p>
                        </Box>
                        <Box className="product_price">&#8361;12000</Box>
                        <Box className="product_delivery">&#8361;1000</Box>
                        <Box className="product_quantity">1 item</Box>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
              <Box className="order_box">
                <Box className="order_header">
                  <Box className="header_left_box">
                    <Box className="title_wrap">
                      <h3 className="bold_head">Order ID: #23534561 </h3>
                      <p className="status status_pending">Pending</p>
                    </Box>

                    <p>
                      Proceed on <span>9 Jan 2022</span>
                    </p>
                  </Box>
                  <Box className="header_right_box">
                    <h3 className="bold_head">&#8361; 76000 </h3>
                    <p>Total amount</p>
                  </Box>
                </Box>
                <Box className="margin">
                  <Box className="marginer" />
                </Box>
                <Box className="table_head">
                  <Box className="head_product">Product</Box>
                  <Box className="head_item">Price</Box>
                  <Box className="head_item">Delivery Cost</Box>
                  <Box className="head_item">Quantity</Box>
                </Box>
                <Box className="tbody_wrap">
                  {[1, 2, 3].map((ele, id) => {
                    return (
                      <Box
                        key={id}
                        className={
                          id % 2 === 0
                            ? "table_body"
                            : "table_body table_body_active"
                        }
                      >
                        <Box className="product_wrap">
                          <img
                            src="/images/mock-img/mock-2.jpg"
                            alt="product"
                          />
                          <p>New Collection Dog Wear</p>
                        </Box>
                        <Box className="product_price">&#8361;12000</Box>
                        <Box className="product_delivery">&#8361;1000</Box>
                        <Box className="product_quantity">1 item</Box>
                      </Box>
                    );
                  })}
                </Box>
                <Button className="pay_btn">Pay</Button>
              </Box>
              <Box className="order_box">
                <Box className="order_header">
                  <Box className="header_left_box">
                    <Box className="title_wrap">
                      <h3 className="bold_head">Order ID: #23534561 </h3>
                      <p className="status status_delivered">Delivered</p>
                    </Box>

                    <p>
                      Proceed on <span>9 Jan 2022</span>
                    </p>
                  </Box>
                  <Box className="header_right_box">
                    <h3 className="bold_head">&#8361; 76000 </h3>
                    <p>Total amount</p>
                  </Box>
                </Box>
                <Box className="margin">
                  <Box className="marginer" />
                </Box>
                <Box className="table_head">
                  <Box className="head_product">Product</Box>
                  <Box className="head_item">Price</Box>
                  <Box className="head_item">Delivery Cost</Box>
                  <Box className="head_item">Quantity</Box>
                </Box>
                <Box className="tbody_wrap">
                  {[1, 2, 3].map((ele, id) => {
                    return (
                      <Box
                        key={id}
                        className={
                          id % 2 === 0
                            ? "table_body"
                            : "table_body table_body_active"
                        }
                      >
                        <Box className="product_wrap">
                          <img
                            src="/images/mock-img/mock-2.jpg"
                            alt="product"
                          />
                          <p>New Collection Dog Wear</p>
                        </Box>
                        <Box className="product_price">&#8361;12000</Box>
                        <Box className="product_delivery">&#8361;1000</Box>
                        <Box className="product_quantity">1 item</Box>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
              <Box className="order_box">
                <Box className="order_header">
                  <Box className="header_left_box">
                    <Box className="title_wrap">
                      <h3 className="bold_head">Order ID: #23534561 </h3>
                      <p className="status status_cancelled">Cancelled</p>
                    </Box>

                    <p>
                      Proceed on <span>9 Jan 2022</span>
                    </p>
                  </Box>
                  <Box className="header_right_box">
                    <h3 className="bold_head">&#8361; 76000 </h3>
                    <p>Total amount</p>
                  </Box>
                </Box>
                <Box className="margin">
                  <Box className="marginer" />
                </Box>
                <Box className="table_head">
                  <Box className="head_product">Product</Box>
                  <Box className="head_item">Price</Box>
                  <Box className="head_item">Delivery Cost</Box>
                  <Box className="head_item">Quantity</Box>
                </Box>
                <Box className="tbody_wrap">
                  {[1, 2, 3].map((ele, id) => {
                    return (
                      <Box
                        key={id}
                        className={
                          id % 2 === 0
                            ? "table_body"
                            : "table_body table_body_active"
                        }
                      >
                        <Box className="product_wrap">
                          <img
                            src="/images/mock-img/mock-2.jpg"
                            alt="product"
                          />
                          <p>New Collection Dog Wear</p>
                        </Box>
                        <Box className="product_price">&#8361;12000</Box>
                        <Box className="product_delivery">&#8361;1000</Box>
                        <Box className="product_quantity">1 item</Box>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            </Stack>
          )}
          {side === 1 && (
            <Stack className="address_wrap">
              <Box className="address_box">
                <h3>Address</h3>
                <FormControlLabel
                  value="address"
                  control={<Radio checked />}
                  label="South Korea Busan Saha-gu Nakdong-daero 1357, 45"
                />
                <Button
                  onClick={() => navigate("/settings")}
                  className="address_btn"
                >
                  Change address
                </Button>
              </Box>
            </Stack>
          )}
          {side === 2 && <MyAccount />}
          {side === 3 && <WishList />}
        </Box>
      </Stack>
    </Container>
  );
};

export default OrdersPage;
