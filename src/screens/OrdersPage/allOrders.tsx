import { Box, Button, Stack } from "@mui/material";
import React from "react";

const AllOrders = () => {
  return (
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
                  id % 2 === 0 ? "table_body" : "table_body table_body_active"
                }
              >
                <Box className="product_wrap">
                  <img src="/images/mock-img/mock-2.jpg" alt="product" />
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
                  id % 2 === 0 ? "table_body" : "table_body table_body_active"
                }
              >
                <Box className="product_wrap">
                  <img src="/images/mock-img/mock-2.jpg" alt="product" />
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
                  id % 2 === 0 ? "table_body" : "table_body table_body_active"
                }
              >
                <Box className="product_wrap">
                  <img src="/images/mock-img/mock-2.jpg" alt="product" />
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
                  id % 2 === 0 ? "table_body" : "table_body table_body_active"
                }
              >
                <Box className="product_wrap">
                  <img src="/images/mock-img/mock-2.jpg" alt="product" />
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
  );
};

export default AllOrders;
