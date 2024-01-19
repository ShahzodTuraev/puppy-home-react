import { createSelector } from "reselect";
import { AppRootState } from "../../types/screen";

const selectHomePage = (state: AppRootState) => state.homePage;
export const retrieveTrendingProducts = createSelector(
  selectHomePage,
  (HomePage) => HomePage.trendingProducts
);
export const retrieveBigSales = createSelector(
  selectHomePage,
  (HomePage) => HomePage.bigSales
);
export const retrieveNews = createSelector(
  selectHomePage,
  (HomePage) => HomePage.news
);
