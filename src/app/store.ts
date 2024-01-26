import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import homePageReducer from "../screens/HomePage/slice";
import reduxLogger from "redux-logger";
import shopPageReducer from "../screens/ShopPage/slice";
import OrdersPageReducer from "../screens/OrdersPage/slice";
import servicePageReducer from "../screens/ServicePage/slice";
import notificationSectionReducer from "./components/navbar/slice";
import CommunityPageReducer from "../screens/BlogsPage/slice";
export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(reduxLogger),
  reducer: {
    homePage: homePageReducer,
    shopPage: shopPageReducer,
    ordersPage: OrdersPageReducer,
    servicePage: servicePageReducer,
    notificationSection: notificationSectionReducer,
    communityPage: CommunityPageReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
