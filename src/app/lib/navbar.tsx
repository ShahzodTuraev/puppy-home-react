import HomePage from "../../screens/HomePage";
import ShopPage from "../../screens/ShopPage";
import ServicePage from "../../screens/ServicePage";
import HelpPage from "../../screens/HelpPage";
import BlogsPage from "../../screens/BlogsPage";
import { NavbarObj } from "../../types/others";
import ChosenProduct from "../../screens/ShopPage/chosenProduct";

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
];
