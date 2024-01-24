import { createSelector } from "reselect";
import { AppRootState } from "../../types/screen";

const selectServicePage = (state: AppRootState) => state.servicePage;
export const retrieveAllProducts = createSelector(
  selectServicePage,
  (ServicePage) => ServicePage.allServices
);

export const retrieveRelatedProducts = createSelector(
  selectServicePage,
  (ServicePage) => ServicePage.relatedServices
);

export const retrieveProductReviews = createSelector(
  selectServicePage,
  (ServicePage) => ServicePage.serviceReviews
);

export const retrieveChosenProduct = createSelector(
  selectServicePage,
  (ServicePage) => ServicePage.chosenService
);
