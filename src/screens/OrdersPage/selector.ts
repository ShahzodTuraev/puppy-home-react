import { createSelector } from "reselect";
import { AppRootState } from "../../types/screen";

const selectOrdersPage = (state: AppRootState) => state.ordersPage;

export const retrievependingOrders = createSelector(
  selectOrdersPage,
  (OrdersPage) => OrdersPage.pendingOrders
);

export const retrieveProcessOrders = createSelector(
  selectOrdersPage,
  (OrdersPage) => OrdersPage.processOrders
);
export const retrieveFinishedOrders = createSelector(
  selectOrdersPage,
  (OrdersPage) => OrdersPage.finishedOrders
);

export const retrieveWishlist = createSelector(
  selectOrdersPage,
  (OrdersPage) => OrdersPage.wishList
);
export const retrieveBankAccounts = createSelector(
  selectOrdersPage,
  (OrdersPage) => OrdersPage.bankAccounts
);
