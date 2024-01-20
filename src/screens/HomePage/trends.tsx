import { Box, Button, Container, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import EastIcon from "@mui/icons-material/East";
import ShoppingCart from "../../app/components/shoppingCart";
// REDUX
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveTrendingProducts } from "./selector";
import { Product } from "../../types/product";
import { Dispatch } from "@reduxjs/toolkit";
import { setTrendingProducts } from "./slice";
import ProductApiService from "../../app/apiServices/productApiService";
// REDUX SLICE
const actionDispatch = (dispatch: Dispatch) => ({
  setTrendingProducts: (data: Product[]) => dispatch(setTrendingProducts(data)),
});
// REDUX SELECTOR
const trendingProductsRetriever = createSelector(
  retrieveTrendingProducts,
  (trendingProducts) => ({
    trendingProducts,
  })
);
const Trends = () => {
  /*INITIALIZATIONS*/
  const [sorting, setSorting] = useState("product_views");
  const { setTrendingProducts } = actionDispatch(useDispatch());
  useEffect(() => {
    const productService = new ProductApiService();
    productService
      .getTargetProducts({
        order: sorting,
        page: 1,
        limit: 8,
        product_collection: ["food", "beauty", "clothes", "toy", "etc"],
        price: [0, 1000],
      })
      .then((data) => setTrendingProducts(data))
      .catch((err) => console.log(err));
  }, [sorting]);
  const { trendingProducts } = useSelector(trendingProductsRetriever);
  const [activeBtn, setActiveBtn] = useState<any>({
    btn1: true,
    btn2: false,
    btn3: false,
  });

  /*HANDLERS*/
  const handleSort = (e: any) => {
    const id = e.target.id;
    switch (id) {
      case "bestseller":
        setActiveBtn({
          btn1: false,
          btn2: true,
          btn3: false,
        });
        setSorting("product_sold_cnt");
        break;
      case "latest":
        setActiveBtn({
          btn1: false,
          btn2: false,
          btn3: true,
        });
        setSorting("createdAt");
        break;
      default:
        setActiveBtn({
          btn1: true,
          btn2: false,
          btn3: false,
        });
        setSorting("product_views");
        break;
    }
  };
  return (
    <Container className="trending_container">
      <h2 className="component_title">Trending Products</h2>
      <Box className="sort_btn_wrap">
        <Button
          id="featured"
          onClick={(e) => handleSort(e)}
          className={activeBtn.btn1 ? "sort_btn sort_btn_active" : "sort_btn"}
        >
          Featured
        </Button>
        <Button
          id="bestseller"
          onClick={(e) => handleSort(e)}
          className={activeBtn.btn2 ? "sort_btn sort_btn_active" : "sort_btn"}
        >
          Bestseller
        </Button>
        <Button
          id="latest"
          onClick={(e) => handleSort(e)}
          className={activeBtn.btn3 ? "sort_btn sort_btn_active" : "sort_btn"}
        >
          Latest
        </Button>
      </Box>
      <Stack sx={{ gap: "20px" }} className="cart_wrap">
        {trendingProducts.map((ele) => {
          return <ShoppingCart cartData={ele} key={ele._id} />;
        })}
      </Stack>
      <Box className="bottom_box">
        <Box className="link_wrap">
          <h4 className="link_all">See all products</h4>
          <EastIcon />
        </Box>
      </Box>
    </Container>
  );
};

export default Trends;
