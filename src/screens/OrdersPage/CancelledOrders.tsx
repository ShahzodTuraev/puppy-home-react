import { Stack } from "@mui/material";
import React from "react";
import { createSelector } from "reselect";
import { useSelector } from "react-redux";
import { retrieveCancelledOrders } from "./selector";
import { Order } from "../../types/order";
import OrderCart from "./orderCart";
// REDUX SELECTOR
const cancelledOrdersRetriever = createSelector(
  retrieveCancelledOrders,
  (cancelledOrders) => ({
    cancelledOrders,
  })
);
const CancelledOrders = () => {
  /*INITIALIZATION*/
  const { cancelledOrders } = useSelector(cancelledOrdersRetriever);
  return (
    <Stack className="orders_wrap">
      {cancelledOrders?.map((order: Order) => {
        return <OrderCart order={order} />;
      })}
    </Stack>
  );
};

export default CancelledOrders;
