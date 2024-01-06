import React from "react";
import "../../scss/home.scss";
import Header from "./header";
import Categories from "./categories";
import Trends from "./trends";
const HomePage: any = () => {
  return (
    <div>
      <Header />
      <Categories />
      <Trends />
    </div>
  );
};

export default HomePage;
