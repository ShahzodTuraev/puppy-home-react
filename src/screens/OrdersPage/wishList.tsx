import { Box, Pagination, PaginationItem, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import ShoppingCart from "../../app/components/shoppingCart";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
// REDUX
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setWishList } from "./slice";
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

  const handlePaginationChange = (event: any, value: number) => {
    wishData.page = value;
    setWishData({ ...wishData });
  };
  return (
    <Stack className="wish_wrap">
      <Box className="head_wrap">
        <h3>My Liked Products</h3>
      </Box>
      <Box className="wish_box_wrap wish_box_active">
        {wishList
          ?.filter((item) => item.product_data.product_collection !== "service")
          .map((ele) => {
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
    </Stack>
  );
};

export default WishList;
