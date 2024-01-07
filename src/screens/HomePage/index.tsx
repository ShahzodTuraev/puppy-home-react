import React from "react";
import "../../scss/home.scss";
import Header from "./header";
import Categories from "./categories";
import Trends from "./trends";
import Video from "./video";
import BigSales from "./bigSales";
const HomePage: any = () => {
  return (
    <div>
      <Header />
      <Categories />
      <Trends />
      <Video />
      <BigSales />
    </div>
  );
};

export default HomePage;
