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
import { useDispatch } from "react-redux"; // useSelector orqali o'qiladi
import { Dispatch } from "@reduxjs/toolkit";
import { setTrendingProducts, setBigSales, setNews } from "./slice";
import { Product } from "../../types/product";
import ProductApiService from "../../app/apiServices/productApiService";
import EventApiService from "../../app/apiServices/eventApiService";
import { Event } from "../../types/event";

// REDUX SLICE
const actionDispatch = (dispatch: Dispatch) => ({
  setTrendingProducts: (data: Product[]) => dispatch(setTrendingProducts(data)),
  setBigSales: (data: Product[]) => dispatch(setBigSales(data)),
  setNews: (data: Event[]) => dispatch(setNews(data)),
});

const HomePage: any = () => {
  /*INITIALIZATIONS*/
  const { setTrendingProducts, setBigSales, setNews } = actionDispatch(
    useDispatch()
  );
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
        order: "createdAt",
        page: 1,
        limit: 8,
        product_collection: ["food", "beauty", "clothes", "toy", "etc"],
        min_price: 0,
        max_price: 2000000,
      })
      .then((data) => setTrendingProducts(data))
      .catch((err) => console.log(err));
    productService
      .getTargetProducts({
        order: "product_discount",
        page: 1,
        limit: 4,
        product_collection: ["food", "beauty", "clothes", "toy", "etc"],
        min_price: 0,
        max_price: 2000000,
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
