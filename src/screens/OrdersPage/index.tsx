import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Pagination,
  PaginationItem,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import "../../scss/orders.scss";
import {
  ArrowBack,
  ArrowForward,
  CreditCard,
  FavoriteBorder,
  ListAltOutlined,
  PinDropOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { product_list, service_list } from "../../mock/cart_data";
import ShoppingCart from "../../app/components/shoppingCart";
import ServiceCard from "../ServicePage/serciveCard";
const OrdersPage = () => {
  /*INSTALIZATIONS*/
  const [side, setSide] = useState<number>(0);
  const [orderBtn, setOrderBtn] = useState<number>(0);
  const [wishType, setWishType] = useState<string>("product");
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
                  control={<Radio checked color="secondary" />}
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
          {side === 2 && (
            <Stack className="account_wrap">
              <h3>Account</h3>
              <Box className="account_box">
                <Box className="card_box">
                  <FormControlLabel
                    value="address"
                    control={<Radio checked color="secondary" />}
                    label="Account"
                  />
                  <Box className="line_box">
                    <h4>Cardholder:</h4>
                    <p>John Dellogy</p>
                  </Box>
                  <Box className="line_box">
                    <h4>Account:</h4>
                    <p>...5498</p>
                  </Box>
                  <Box className="line_box">
                    <h4>Expire Date:</h4>
                    <p>07/26</p>
                  </Box>
                </Box>
                <Box className="add_box">
                  <p className="add_title">Add Account</p>

                  <Box className="input_cart">
                    <TextField
                      className="input"
                      id="outlined-basic"
                      label="Cardholder Name"
                      variant="outlined"
                      color="secondary"
                    />
                    <TextField
                      type="number"
                      className="input"
                      id="outlined-basic"
                      color="secondary"
                      label="Account Number"
                      variant="outlined"
                    />
                    <Box className="hor_input">
                      <TextField
                        className="input"
                        id="outlined-basic"
                        color="secondary"
                        label="Expire Date"
                        variant="outlined"
                      />
                      <TextField
                        type="number"
                        className="input"
                        id="outlined-basic"
                        color="secondary"
                        label="CVV"
                        variant="outlined"
                      />
                    </Box>
                    <Button className="add_account_btn">Add New Account</Button>
                  </Box>
                </Box>
              </Box>
            </Stack>
          )}
          {side === 3 && (
            <Stack className="wish_wrap">
              <Box className="head_wrap">
                <h3>Wishlist</h3>
                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      value="product"
                      control={
                        <Radio
                          onChange={(e) => {
                            setWishType(e.target.value);
                          }}
                          color="secondary"
                        />
                      }
                      label="Product"
                    />
                    <FormControlLabel
                      value="service"
                      control={
                        <Radio
                          onChange={(e) => {
                            setWishType(e.target.value);
                          }}
                          color="secondary"
                        />
                      }
                      label="Service"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
              <Box
                className={
                  wishType === "product"
                    ? "wish_box_wrap wish_box_active"
                    : "wish_box_wrap"
                }
              >
                {product_list.map((ele) => {
                  return (
                    <ShoppingCart
                      className="shopping_cart"
                      key={ele.product_id}
                      cartData={ele}
                    />
                  );
                })}
                {/*  */}
                <Pagination
                  count={3}
                  page={1}
                  renderItem={(item) => (
                    <PaginationItem
                      components={{
                        previous: ArrowBack,
                        next: ArrowForward,
                      }}
                      {...item}
                    />
                  )}
                />
              </Box>
              <Box
                className={
                  wishType === "service"
                    ? "wish_box_wrap wish_box_active"
                    : "wish_box_wrap"
                }
              >
                {service_list?.map((service) => {
                  return <ServiceCard key={service} cartData={service} />;
                })}

                <Pagination
                  count={3}
                  page={1}
                  renderItem={(item) => (
                    <PaginationItem
                      components={{
                        previous: ArrowBack,
                        next: ArrowForward,
                      }}
                      {...item}
                    />
                  )}
                />
              </Box>
            </Stack>
          )}
        </Box>
      </Stack>
    </Container>
  );
};

export default OrdersPage;
