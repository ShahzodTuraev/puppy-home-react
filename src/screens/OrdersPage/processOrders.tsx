import { Stack } from "@mui/material";
import React from "react";
import { createSelector } from "reselect";
import { useSelector } from "react-redux";
import { retrieveProcessOrders } from "./selector";
import OrderCart from "./orderCart";
import { Order } from "../../types/order";
// REDUX SELECTOR
const processOrdersRetriever = createSelector(
  retrieveProcessOrders,
  (processOrders) => ({
    processOrders,
  })
);

const ProcessOrders = ({ setOrderRebuild }: any) => {
  /*INITIALIZATION*/
  const { processOrders } = useSelector(processOrdersRetriever);
  return (
    <Stack className="orders_wrap">
      {processOrders?.map((order: Order) => {
        return <OrderCart order={order} setOrderRebuild={setOrderRebuild} />;
      })}
    </Stack>
  );
};

export default ProcessOrders;
