import {
  Box,
  FormControl,
  FormControlLabel,
  Pagination,
  PaginationItem,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ShoppingCart from "../../app/components/shoppingCart";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { product_list, service_list } from "../../mock/cart_data";
import ServiceCard from "../ServicePage/serciveCard";
// REDUX
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setWishList } from "./slice";
import { Product } from "../../types/product";
import { createSelector } from "reselect";
import { useSelector } from "react-redux";
import { retrieveWishlist } from "./selector";
import ProductApiService from "../../app/apiServices/productApiService";
// REDUX SLICE
const actionDispatch = (dispatch: Dispatch) => ({
  setWishList: (data: any) => dispatch(setWishList(data)),
});
// REDUX SELECTOR
const wishListRetriever = createSelector(retrieveWishlist, (wishList) => ({
  wishList,
}));
const WishList = () => {
  /*INITIALIZATIONS*/
  const { wishList } = useSelector(wishListRetriever);
  const { setWishList } = actionDispatch(useDispatch());
  const [wishType, setWishType] = useState<string>("product");
  const [wishData, setWishData] = useState({
    page: 1,
    limit: 9,
    like_group: "product",
  });
  useEffect(() => {
    const productService = new ProductApiService();
    productService
      .getLikedProduct(wishData)
      .then((data) => setWishList(data))
      .catch((err) => console.log(err));
  }, [wishData]);
  /*HANDLERS*/
  const categoryChange = (e: any) => {
    setWishType(e.target.value);
  };
  const handlePaginationChange = (event: any, value: number) => {
    wishData.page = value;
    setWishData({ ...wishData });
  };
  return (
    <Stack className="wish_wrap">
      <Box className="head_wrap">
        <h3>Wishlist</h3>
        <FormControl>
          <RadioGroup
            onChange={categoryChange}
            defaultValue={wishType}
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel
              value="product"
              control={<Radio />}
              label="Product"
            />
            <FormControlLabel
              value="service"
              control={<Radio />}
              label="Service"
            />
          </RadioGroup>
        </FormControl>
      </Box>
      <Box
        className={
          wishType === "product"
            ? "wish_box_wrap wish_box_active"
            : "wish_box_wrap"
        }
      >
        {wishList.map((ele) => {
          return (
            <ShoppingCart
              className="shopping_cart"
              key={ele._id}
              cartData={ele.product_data}
            />
          );
        })}
        <Box className="pagination_wrap">
          <Pagination
            count={wishData.page >= 3 ? wishData.page + 1 : 3}
            page={wishData.page}
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
      </Box>

      <Box
        className={
          wishType === "service"
            ? "wish_box_wrap wish_box_active"
            : "wish_box_wrap"
        }
      >
        {service_list?.map((service) => {
          return <ServiceCard key={service} cartData={service} />;
        })}

        <Pagination
          count={3}
          page={1}
          renderItem={(item) => (
            <PaginationItem
              components={{
                previous: ArrowBack,
                next: ArrowForward,
              }}
              {...item}
            />
          )}
        />
      </Box>
    </Stack>
  );
};

export default WishList;
