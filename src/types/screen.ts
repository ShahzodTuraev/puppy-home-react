import { Event } from "./event";
import { Account, Like, Order } from "./order";
import { Product } from "./product";
import { Review } from "./reivew";

export interface AppRootState {
  homePage: HomePageState;
  shopPage: ShopPageState;
  ordersPage: OrdersPageState;
  servicePage: ServicePageState;
}

/*HOMEPAGE*/
export interface HomePageState {
  trendingProducts: Product[];
  bigSales: Product[];
  news: Event[];
}
/*SHOPPAGE*/
export interface ShopPageState {
  allProducts: Product[];
  relatedProducts: Product[];
  chosenProduct: Product | null;
  productReviews: Review[];
}

/*SERVICEPAGE*/
export interface ServicePageState {
  allServices: Product[];
  relatedServices: Product[];
  chosenService: Product | null;
  serviceReviews: Review[];
}

/*ORDERS PAGE*/

export interface OrdersPageState {
  pendingOrders: Order[];
  processOrders: Order[];
  finishedOrders: Order[];
  cancelledOrders: Order[];
  allOrders: Order[];
  wishList: Like[];
  bankAccounts: Account[];
}
