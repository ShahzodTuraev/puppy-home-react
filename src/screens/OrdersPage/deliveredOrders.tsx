import { Stack } from "@mui/material";
import React from "react";
import { createSelector } from "reselect";
import { useSelector } from "react-redux";
import { retrieveFinishedOrders } from "./selector";
import { Order } from "../../types/order";
import OrderCart from "./orderCart";
// REDUX SELECTOR
const finishedOrdersRetriever = createSelector(
  retrieveFinishedOrders,
  (finishedOrders) => ({
    finishedOrders,
  })
);
const DeliveredOrders = () => {
  const { finishedOrders } = useSelector(finishedOrdersRetriever);
  return (
    <Stack className="orders_wrap">
      {finishedOrders?.map((order: Order) => {
        return <OrderCart order={order} />;
      })}
    </Stack>
  );
};

export default DeliveredOrders;
