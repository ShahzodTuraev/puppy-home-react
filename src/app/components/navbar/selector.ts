import { AppRootState } from "../../../types/screen";
import { createSelector } from "reselect";

const selectNotificationSection = (state: AppRootState) =>
  state.notificationSection;
export const retrieveNotifications = createSelector(
  selectNotificationSection,
  (NotificationSection) => NotificationSection.notifications
);
