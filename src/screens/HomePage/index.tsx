import React, { useEffect } from "react";
import "../../scss/home.scss";
import Header from "./header";
import Categories from "./categories";
import Trends from "./trends";
import Video from "./video";
import BigSales from "./bigSales";
import Services from "./services";
import Events from "./events";
import Features from "./features";
import { useLocation } from "react-router-dom";
const HomePage: any = () => {
  /*INITIALIZATIONS*/
  const pathname = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);
  return (
    <div>
      <Header />
      <Categories />
      <Trends />
      <Video />
      <BigSales />
      <Services />
      <Events />
      <Features />
    </div>
  );
};

export default HomePage;
