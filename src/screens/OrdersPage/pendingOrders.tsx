import { Stack } from "@mui/material";
import React from "react";
import { createSelector } from "reselect";
import { useSelector } from "react-redux";
import { retrievePendingOrders } from "./selector";
import { Order } from "../../types/order";
import OrderCart from "./orderCart";
// REDUX SELECTOR
const pendingOrdersRetriever = createSelector(
  retrievePendingOrders,
  (pendingOrders) => ({
    pendingOrders,
  })
);
const PendingOrders = ({ setOrderRebuild }: any) => {
  /*INITIALIZATION*/
  const { pendingOrders } = useSelector(pendingOrdersRetriever);

  return (
    <Stack className="orders_wrap">
      {pendingOrders?.map((order: Order) => {
        return <OrderCart order={order} setOrderRebuild={setOrderRebuild} />;
      })}
    </Stack>
  );
};

export default PendingOrders;
