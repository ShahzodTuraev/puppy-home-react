import HomePage from "../../screens/HomePage";
import ShopPage from "../../screens/ShopPage";
import ServicePage from "../../screens/ServicePage";
import HelpPage from "../../screens/HelpPage";
import BlogsPage from "../../screens/BlogsPage";
import { NavbarObj } from "../../types/others";
import ChosenProduct from "../../screens/ShopPage/chosenProduct";
import ChosenService from "../../screens/ServicePage/chosenService";
import OrdersPage from "../../screens/OrdersPage";
import SignUp from "../../screens/SigninPage";
import LogIn from "../../screens/LoginPage";
import AccountPage from "../../screens/AccountPage";

export const navbar: NavbarObj[] = [
  {
    element: <HomePage />,
    title: "Home",
    path: "/",
    private: false,
    hidden: false,
  },
  {
    element: <ShopPage />,
    title: "Shop",
    path: "/shop",
    private: false,
    hidden: false,
  },
  {
    element: <ChosenProduct />,
    title: "Single Product",
    path: "/shop/:id",
    private: false,
    hidden: true,
  },
  {
    element: <ServicePage />,
    title: "Service",
    path: "/service",
    private: false,
    hidden: false,
  },
  {
    element: <ChosenService />,
    title: "Single Service",
    path: "/service/:id",
    private: false,
    hidden: true,
  },
  {
    element: <BlogsPage />,
    title: "DaengGram",
    path: "/daeng-gram",
    private: false,
    hidden: false,
  },
  {
    element: <HelpPage />,
    title: "Help",
    path: "/help",
    private: false,
    hidden: false,
  },
  {
    element: <OrdersPage />,
    title: "Orders",
    path: "/orders",
    private: true,
    hidden: true,
  },
  {
    element: <SignUp />,
    title: "sign-up",
    path: "/sign-up",
    private: false,
    hidden: true,
  },
  {
    element: <LogIn />,
    title: "log-in",
    path: "/log-in",
    private: false,
    hidden: true,
  },
  {
    element: <AccountPage />,
    title: "my-account",
    path: "/my-account",
    private: false,
    hidden: true,
  },
];
