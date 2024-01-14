import React from "react";
import { styled } from "@mui/material/styles";
import PetsIcon from "@mui/icons-material/Pets";
import {
  Box,
  Container,
  Checkbox,
  Stack,
  FormControlLabel,
  Pagination,
  PaginationItem,
} from "@mui/material";
import Slider, { SliderThumb } from "@mui/material/Slider";
import { product_list } from "../../mock/cart_data";
import ShoppingCart from "../../app/components/shoppingCart";
import { ArrowBack, ArrowForward, Home, Close } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Products = () => {
  /*INITIALIZATIONS*/
  const navigate = useNavigate();
  const AirbnbSlider = styled(Slider)(({ theme }) => ({
    color: "#3a8589",
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
      backgroundColor: "#3a8589",
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
  /*HANDLERS*/

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
              <FormControlLabel
                control={<Checkbox />}
                className="check_box"
                label="All"
              />
              <FormControlLabel
                control={<Checkbox />}
                className="check_box"
                label="Clothes "
              />
              <FormControlLabel
                control={<Checkbox />}
                className="check_box"
                label="Food "
              />
              <FormControlLabel
                control={<Checkbox />}
                className="check_box"
                label="Toys"
              />
              <FormControlLabel
                control={<Checkbox />}
                className="check_box"
                label="Beauty "
              />
              <FormControlLabel
                control={<Checkbox />}
                className="check_box"
                label="etc "
              />
            </Box>
          </Box>
          <Box className="filter_head">
            <p>Product Feature</p>
          </Box>
          <Box className="filter_body">
            <Box className="filter_line">
              <FormControlLabel
                control={<Checkbox />}
                className="check_box"
                label="New "
              />
              <FormControlLabel
                control={<Checkbox />}
                className="check_box"
                label="Sale "
              />
              <FormControlLabel
                control={<Checkbox />}
                className="check_box"
                label="View"
              />
              <FormControlLabel
                control={<Checkbox />}
                className="check_box"
                label="Like "
              />
              <FormControlLabel
                control={<Checkbox />}
                className="check_box"
                label="Review "
              />
              <FormControlLabel
                control={<Checkbox />}
                className="check_box"
                label="Points "
              />
            </Box>
          </Box>
          <Box className="filter_head">
            <p>Product Price</p>
          </Box>
          <Box className="filter_body">
            <Box className="filter_line">
              <Box className="price_info">&#8361; ..,000</Box>
              <AirbnbSlider
                className="price_change"
                valueLabelDisplay="auto"
                max={500}
                min={5}
                slots={{ thumb: AirbnbThumbComponent }}
                getAriaLabel={(index) =>
                  index === 0 ? "Minimum price" : "Maximum price"
                }
                defaultValue={[5, 100]}
              />
            </Box>
          </Box>
        </Box>
        <Box className="product_box">
          <Box className="product_wrap">
            {product_list.map((ele) => {
              return (
                <ShoppingCart
                  className="shopping_cart"
                  key={ele.product_id}
                  cartData={ele}
                />
              );
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
              // onChange={handlePaginationChange}
            />
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default Products;
