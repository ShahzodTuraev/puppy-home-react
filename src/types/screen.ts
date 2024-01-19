import { Event } from "./event";
import { Product } from "./product";

export interface AppRootState {
  homePage: HomePageState;
  shopPage: ShopPageState;
}

/*HOMEPAGE*/
export interface HomePageState {
  trendingProducts: Product[];
  bigSales: Product[];
  news: Event[];
}

export interface ShopPageState {
  allProducts: Product[];
}
