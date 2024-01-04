import HomePage from "../../screens/HomePage";
import ShopPage from "../../screens/ShopPage";
import ServicePage from "../../screens/ServicePage";
import HelpPage from "../../screens/HelpPage";
import BlogsPage from "../../screens/BlogsPage";

export const navbar: any[] = [
  {
    element: <HomePage />,
    title: "Home",
    path: "/",
    private: false,
  },
  {
    element: <ShopPage />,
    title: "Shop",
    path: "/shop",
    private: false,
  },
  {
    element: <ServicePage />,
    title: "Service",
    path: "/service",
    private: false,
  },
  {
    element: <BlogsPage />,
    title: "Blogs",
    path: "/blogs",
    private: false,
  },
  {
    element: <HelpPage />,
    title: "Help",
    path: "/help",
    private: false,
  },
];
