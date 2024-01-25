import { createSlice } from "@reduxjs/toolkit";
import { NotificationSectionState } from "../../../types/screen";

const initialState: NotificationSectionState = {
  notifications: [],
};

const NotificationSectionSlice = createSlice({
  name: "notificationSection",
  initialState,
  reducers: {
    setNotifications: (state, action) => {
      state.notifications = action.payload;
    },
  },
});

export const { setNotifications } = NotificationSectionSlice.actions;

const notificationSectionReducer = NotificationSectionSlice.reducer;
export default notificationSectionReducer;
