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
import React, { useState } from "react";
import ShoppingCart from "../../app/components/shoppingCart";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { product_list, service_list } from "../../mock/cart_data";
import ServiceCard from "../ServicePage/serciveCard";

const WishList = () => {
  /*INITIALIZATIONS*/
  const [wishType, setWishType] = useState<string>("product");
  return (
    <Stack className="wish_wrap">
      <Box className="head_wrap">
        <h3>Wishlist</h3>
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel
              value="product"
              control={
                <Radio
                  onChange={(e) => {
                    setWishType(e.target.value);
                  }}
                />
              }
              label="Product"
            />
            <FormControlLabel
              value="service"
              control={
                <Radio
                  onChange={(e) => {
                    setWishType(e.target.value);
                  }}
                />
              }
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
        {product_list.map((ele) => {
          return (
            <ShoppingCart
              className="shopping_cart"
              key={ele.product_id}
              cartData={ele}
            />
          );
        })}
        {/*  */}
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
