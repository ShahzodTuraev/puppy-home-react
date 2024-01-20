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
// REDUX
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setBigSales, setNews } from "./slice";
import { Product } from "../../types/product";
import ProductApiService from "../../app/apiServices/productApiService";
import EventApiService from "../../app/apiServices/eventApiService";
import { Event } from "../../types/event";

// REDUX SLICE
const actionDispatch = (dispatch: Dispatch) => ({
  setBigSales: (data: Product[]) => dispatch(setBigSales(data)),
  setNews: (data: Event[]) => dispatch(setNews(data)),
});

const HomePage: any = () => {
  /*INITIALIZATIONS*/
  const { setBigSales, setNews } = actionDispatch(useDispatch());
  const pathname = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);
  useEffect(() => {
    const productService = new ProductApiService();
    const eventService = new EventApiService();

    productService
      .getTargetProducts({
        order: "product_discount",
        page: 1,
        limit: 4,
        product_collection: ["food", "beauty", "clothes", "toy", "etc"],
        price: [0, 1000],
      })
      .then((data) => setBigSales(data))
      .catch((err) => console.log(err));
    eventService
      .getEvents("1", "10")
      .then((data) => setNews(data))
      .catch((err) => console.log(err));
  }, []);
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
