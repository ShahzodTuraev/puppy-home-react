import { createSlice } from "@reduxjs/toolkit";
import { OrdersPageState } from "../../types/screen";
const initialState: OrdersPageState = {
  pendingOrders: [],
  processOrders: [],
  finishedOrders: [],
  wishList: [],
  bankAccounts: [],
};

const ordersPageSlice = createSlice({
  name: "ordersPage",
  initialState,
  reducers: {
    setpendingOrders: (state, action) => {
      state.pendingOrders = action.payload;
    },
    setProcessOrders: (state, action) => {
      state.processOrders = action.payload;
    },
    setFinishedOrders: (state, action) => {
      state.finishedOrders = action.payload;
    },
    setWishList: (state, action) => {
      state.wishList = action.payload;
    },
    setBankAccounts: (state, action) => {
      state.bankAccounts = action.payload;
    },
  },
});

export const {
  setpendingOrders,
  setProcessOrders,
  setFinishedOrders,
  setWishList,
  setBankAccounts,
} = ordersPageSlice.actions;

const OrdersPageReducer = ordersPageSlice.reducer;
export default OrdersPageReducer;
