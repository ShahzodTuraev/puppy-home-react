import React, { useEffect } from "react";
import Header from "./header";
import "../../scss/shop.scss";
import Products from "./services";
import { useLocation } from "react-router-dom";
const ServicePage = () => {
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
      <Products />
    </div>
  );
};

export default ServicePage;
