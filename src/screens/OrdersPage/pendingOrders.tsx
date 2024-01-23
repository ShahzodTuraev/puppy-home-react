import { Box, Button, Stack } from "@mui/material";
import React from "react";
import { createSelector } from "reselect";
import { useSelector } from "react-redux";
import { retrievePendingOrders } from "./selector";
import Moment from "react-moment";
import { Order } from "../../types/order";
import { serverApi } from "../../app/lib/config";
import { Product } from "../../types/product";
import { verifyMemberData } from "../../app/apiServices/verify";
import {
  sweetErrorHandling,
  sweetFailureProvider,
  sweetTopSmallSuccessAlert,
} from "../../app/lib/sweetAlert";
import OrderApiService from "../../app/apiServices/orderApiService";
import { MakeOrderCont } from "../../app/context/MakeOrder";
// REDUX SELECTOR
const pendingOrdersRetriever = createSelector(
  retrievePendingOrders,
  (pendingOrders) => ({
    pendingOrders,
  })
);
const PendingOrders = () => {
  /*INITIALIZATION*/
  const setOrders = MakeOrderCont();
  const { pendingOrders } = useSelector(pendingOrdersRetriever);
  /*HANDLERS*/
  const payHandler = async (e: any) => {
    try {
      const order_id = e.target.value;
      const data = { order_id: order_id, order_status: "PROCESS" };
      if (!verifyMemberData) {
        sweetFailureProvider("Please login first", true);
      }
      const orderService = new OrderApiService();
      await orderService.updateOrderStatus(data);
      await sweetTopSmallSuccessAlert("Payment successful!", 700, false);
      setOrders[1](2);
    } catch (err) {
      console.log("payHandler, ERROR:", err);
      sweetErrorHandling(err).then();
    }
  };
  return (
    <Stack className="orders_wrap">
      {pendingOrders?.map((order: Order) => {
        return (
          <Box key={order._id} className="order_box">
            <Box className="order_header">
              <Box className="header_left_box">
                <Box className="title_wrap">
                  <h3 className="bold_head">
                    Order ID: #{order._id.slice(-8).toUpperCase()}{" "}
                  </h3>
                  <p className="status status_pending">
                    {order.order_status.toLowerCase()}
                  </p>
                </Box>

                <p>
                  Proceed on{" "}
                  <span>
                    <Moment format="D MMM YYYY">{order.createdAt}</Moment>
                  </span>
                </p>
              </Box>
              <Box className="header_right_box">
                <h3 className="bold_head">
                  &#8361; {order.order_total_amount + order.order_delivery_cost}{" "}
                </h3>
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
              {order.order_items.map((item, id) => {
                const product: Product = order.product_data.filter(
                  (ele) => ele._id === item.product_id
                )[0];
                const image_path = `${serverApi}/${product.product_images[0]}`;
                return (
                  <Box
                    key={item._id}
                    className={
                      id % 2 === 0
                        ? "table_body"
                        : "table_body table_body_active"
                    }
                  >
                    <Box className="product_wrap">
                      <img src={image_path} alt="product" />
                      <p>{product.product_name}</p>
                    </Box>
                    <Box className="product_price">
                      &#8361;{" "}
                      {Math.round(
                        (product.product_price *
                          (100 - product.product_discount)) /
                          1000
                      ) * 10}
                    </Box>
                    <Box className="product_delivery">
                      &#8361; {item.item_delivery_cost}
                    </Box>
                    <Box className="product_quantity">
                      {item.item_quantity} item
                    </Box>
                  </Box>
                );
              })}
            </Box>
            <Button value={order._id} onClick={payHandler} className="pay_btn">
              Pay
            </Button>
          </Box>
        );
      })}
    </Stack>
  );
};

export default PendingOrders;
