import { createSelector } from "reselect";
import { AppRootState } from "../../types/screen";

const selectServicePage = (state: AppRootState) => state.servicePage;
export const retrieveAllServices = createSelector(
  selectServicePage,
  (ServicePage) => ServicePage.allServices
);

export const retrieveRelatedServices = createSelector(
  selectServicePage,
  (ServicePage) => ServicePage.relatedServices
);

export const retrieveServiceReviews = createSelector(
  selectServicePage,
  (ServicePage) => ServicePage.serviceReviews
);

export const retrieveChosenService = createSelector(
  selectServicePage,
  (ServicePage) => ServicePage.chosenService
);
