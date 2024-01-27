import { BoArticle } from "./boArticle";
import { Event } from "./event";
import { Follower, Following } from "./follow";
import { Notification } from "./notification";
import { Account, Like, Order } from "./order";
import { Product } from "./product";
import { Review } from "./reivew";
import { Member } from "./user";

export interface AppRootState {
  homePage: HomePageState;
  shopPage: ShopPageState;
  ordersPage: OrdersPageState;
  servicePage: ServicePageState;
  notificationSection: NotificationSectionState;
  communityPage: CommunityPageState;
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

/*NOKTIFICATION*/

export interface NotificationSectionState {
  notifications: Notification[];
}

/*COMMUNITY PAGE*/
export interface CommunityPageState {
  targetBoArticles: BoArticle[];
  chosenMember: Member | null;
  chosenMemberBoArticles: BoArticle[];
  chosenSingleBoArticle: BoArticle | null;
  memberFollowers: Follower[];
  memberFollowings: Following[];
  boArticleReviews: Review[];
}
