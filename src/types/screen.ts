import { Event } from "./event";
import { Product } from "./product";

export interface AppRootState {
  homePage: HomePageState;
}

/*HOMEPAGE*/
export interface HomePageState {
  trendingProducts: Product[];
  bigSales: Product[];
  news: Event[];
}
