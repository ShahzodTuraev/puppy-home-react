import React from "react";
import "../../scss/home.scss";
import Header from "./header";
import Categories from "./categories";
import Trends from "./trends";
import Video from "./video";
import BigSales from "./bigSales";
import Services from "./services";
import Events from "./events";
import Features from "./features";
import Footer from "./footer";
const HomePage: any = () => {
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
      <Footer />
    </div>
  );
};

export default HomePage;
