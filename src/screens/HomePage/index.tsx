import React from "react";
import "../../scss/home.scss";
import Header from "./header";
import Categories from "./categories";
import Trends from "./trends";
import Video from "./video";
import BigSales from "./bigSales";
import Services from "./services";
const HomePage: any = () => {
  return (
    <div>
      <Header />
      <Categories />
      <Trends />
      <Video />
      <BigSales />
      <Services />
    </div>
  );
};

export default HomePage;
