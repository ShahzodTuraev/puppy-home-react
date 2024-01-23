import { Event } from "./event";
import { Product } from "./product";
import { Review } from "./reivew";

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
  relatedProducts: Product[];
  chosenProduct: Product | null;
  productReviews: Review[];
}

export interface CartItem {
  _id: string;
  quantity: number;
  name: string;
  price: number;
  discount: number;
  delivery_fee: number;
  image: string;
}
