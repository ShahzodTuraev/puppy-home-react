import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import PetsIcon from "@mui/icons-material/Pets";
import {
  Box,
  Container,
  Stack,
  FormControlLabel,
  Pagination,
  PaginationItem,
  FormControl,
  RadioGroup,
  Radio,
} from "@mui/material";
import Slider, { SliderThumb } from "@mui/material/Slider";
import ShoppingCart from "../../app/components/shoppingCart";
import { ArrowBack, ArrowForward, Home, Close } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
// REDUX
import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setAllProducts } from "./slice";
import { Product } from "../../types/product";
import { retrieveAllProducts } from "./selector";
import ProductApiService from "../../app/apiServices/productApiService";
import { ProductSearchObj } from "../../types/others";
import { CategoryCont } from "../../app/context/Category";
// REDUX SLICE
const actionDispatch = (dispatch: Dispatch) => ({
  setAllProducts: (data: Product[]) => dispatch(setAllProducts(data)),
});
// REDUX SELECTOR
const allProductsRetriever = createSelector(
  retrieveAllProducts,
  (allProducts) => ({
    allProducts,
  })
);

const AirbnbSlider = styled(Slider)(({ theme }) => ({
  color: "#fc9823",
  height: 3,
  padding: "13px 0",
  "& .MuiSlider-thumb": {
    height: 27,
    width: 27,
    backgroundColor: "#fff",
    border: "1px solid currentColor",
    "&:hover": {
      boxShadow: "0 0 0 8px rgba(58, 133, 137, 0.16)",
    },
    "& .airbnb-bar": {
      height: 9,
      width: 1,
      backgroundColor: "currentColor",
      marginLeft: 1,
      marginRight: 1,
    },
  },
  "& .MuiSlider-track": {
    height: 3,
  },
  "& .MuiSlider-rail": {
    color: theme.palette.mode === "dark" ? "#bfbfbf" : "#d8d8d8",
    opacity: theme.palette.mode === "dark" ? undefined : 1,
    height: 3,
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "#fc9823",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&::before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
}));

interface AirbnbThumbComponentProps extends React.HTMLAttributes<unknown> {}

function AirbnbThumbComponent(props: AirbnbThumbComponentProps) {
  const { children, ...other } = props;
  return (
    <SliderThumb {...other}>
      {children}
      <PetsIcon />
    </SliderThumb>
  );
}

const Products = () => {
  /*INITIALIZATIONS*/
  const [category, setCategory] = CategoryCont();
  console.log("category", category);

  const navigate = useNavigate();
  const pathname = useLocation();
  const [searchProductsObj, setSearchProductsObj] = useState<ProductSearchObj>({
    order: "product_views",
    page: 1,
    limit: 9,
    product_collection:
      category === "all"
        ? ["food", "beauty", "clothes", "toy", "etc"]
        : [category],
    price: [0, 1000],
  });
  const { setAllProducts } = actionDispatch(useDispatch());
  useEffect(() => {
    const productService = new ProductApiService();
    productService
      .getTargetProducts(searchProductsObj)
      .then((data) => setAllProducts(data))
      .catch((err) => console.log(err));
  }, [searchProductsObj]);
  const { allProducts } = useSelector(allProductsRetriever);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  const [price, setPrice] = useState<number[]>([0, 50]);

  /*HANDLERS*/
  const handlePaginationChange = (event: any, value: number) => {
    searchProductsObj.page = value;
    setSearchProductsObj({ ...searchProductsObj });
  };
  const handleSortingChange = (e: any) => {
    searchProductsObj.order = e.target.value;
    searchProductsObj.page = 1;
    setSearchProductsObj({ ...searchProductsObj });
  };
  const handleCollectionChange = (e: any) => {
    searchProductsObj.product_collection =
      e.target.value === "all"
        ? ["food", "beauty", "clothes", "toy", "etc"]
        : [e.target.value];
    searchProductsObj.page = 1;
    setCategory(e.target.value);
    setSearchProductsObj({ ...searchProductsObj });
  };
  const handlePriceChange = (e: any, value: any) => {
    setPrice(value);

    searchProductsObj.price = value;
    searchProductsObj.page = 1;
    setSearchProductsObj({ ...searchProductsObj });
  };
  return (
    <Container className="products_container">
      <Box className="dir_box">
        <Box onClick={() => navigate("/")} className="dir_link">
          <Home />
          <p>Home</p>
        </Box>
        <p className="link_div">/</p>
        <Box className="dir_link">
          <p className="before_icon">Shop</p>
          <Close onClick={() => navigate("/")} className="close" />
        </Box>
      </Box>

      <Stack className="main_box">
        <Box className="filter_box">
          <Box className="filter_head">
            <p>Product Collection</p>
          </Box>
          <Box className="filter_body">
            <Box className="filter_line">
              <FormControl>
                <RadioGroup
                  onChange={handleCollectionChange}
                  defaultValue={category}
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="all"
                    control={<Radio />}
                    label="All"
                  />
                  <FormControlLabel
                    value="clothes"
                    control={<Radio />}
                    label="Clothes"
                  />
                  <FormControlLabel
                    value="food"
                    control={<Radio />}
                    label="Food"
                  />
                  <FormControlLabel
                    value="toy"
                    control={<Radio />}
                    label="Toys"
                  />
                  <FormControlLabel
                    value="beauty"
                    control={<Radio />}
                    label="Beauty"
                  />
                  <FormControlLabel
                    value="etc"
                    control={<Radio />}
                    label="Etc"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
          </Box>
          <Box className="filter_head">
            <p>Default Sorting</p>
          </Box>
          <Box className="filter_body">
            <Box className="filter_line">
              <FormControl>
                <RadioGroup
                  onChange={handleSortingChange}
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="createdAt"
                    control={<Radio />}
                    label="New"
                  />
                  <FormControlLabel
                    value="product_discount"
                    control={<Radio />}
                    label="Sale"
                  />
                  <FormControlLabel
                    value="product_views"
                    control={<Radio />}
                    label="View"
                  />
                  <FormControlLabel
                    value="product_likes"
                    control={<Radio />}
                    label="Like"
                  />
                  <FormControlLabel
                    value="product_reviews"
                    control={<Radio />}
                    label="Review"
                  />
                  <FormControlLabel
                    value="product_point"
                    control={<Radio />}
                    label="Points"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
          </Box>
          <Box className="filter_head">
            <p>Price Sorting</p>
          </Box>
          <Box className="filter_body">
            <Box className="filter_line">
              <Box className="price_info">&#8361; ..,000</Box>
              <AirbnbSlider
                className="price_change"
                valueLabelDisplay="auto"
                value={price}
                onChange={handlePriceChange}
                max={60}
                min={0}
                slots={{ thumb: AirbnbThumbComponent }}
                getAriaLabel={(index) =>
                  index === 0 ? "Minimum price" : "Maximum price"
                }
              />
            </Box>
          </Box>
        </Box>
        <Box className="product_box">
          <Box className="product_wrap">
            {allProducts.map((ele) => {
              return (
                <ShoppingCart
                  className="shopping_cart"
                  key={ele._id}
                  cartData={ele}
                />
              );
            })}
          </Box>
          <Pagination
            count={searchProductsObj.page >= 3 ? searchProductsObj.page + 1 : 3}
            page={searchProductsObj.page}
            renderItem={(item) => (
              <PaginationItem
                components={{
                  previous: ArrowBack,
                  next: ArrowForward,
                }}
                {...item}
              />
            )}
            onChange={handlePaginationChange}
          />
        </Box>
      </Stack>
    </Container>
  );
};

export default Products;
