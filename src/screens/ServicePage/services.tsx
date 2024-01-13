import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Checkbox,
  Stack,
  FormControlLabel,
  Pagination,
  PaginationItem,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Rating from "@mui/material/Rating";
import { product_list } from "../../mock/cart_data";
import { ArrowBack, ArrowForward, Close, Home } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
const Services = () => {
  /*INITIALIZATIONS*/

  const [cartChange, setCartChange] = useState<number>(-1);
  const navigate = useNavigate();
  useEffect(() => {}, []);
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
          <p className="before_icon">Service</p>
          <Close onClick={() => navigate("/")} className="close" />
        </Box>
      </Box>

      <Stack className="main_box">
        <Box className="filter_box">
          <Box className="filter_head">
            <p>Puppy Services</p>
          </Box>
          <Box className="filter_body">
            <Box className="filter_line">
              <FormControlLabel
                control={<Checkbox />}
                className="check_box"
                label="Daycare"
              />
              <FormControlLabel
                control={<Checkbox />}
                className="check_box"
                label="Dog cafe"
              />

              <FormControlLabel
                control={<Checkbox />}
                className="check_box"
                label="Veterinary Clinic"
              />
              <FormControlLabel
                control={<Checkbox />}
                className="check_box"
                label="Grooming Salon"
              />
              <FormControlLabel
                control={<Checkbox />}
                className="check_box"
                label="Kindergarten"
              />
              <FormControlLabel
                control={<Checkbox />}
                className="check_box"
                label="Daycare"
              />
            </Box>
          </Box>
          <Box className="filter_head">
            <p>Service Area</p>
          </Box>
          <Box className="filter_body">
            <Box className="filter_line">
              <FormControlLabel
                control={<Checkbox />}
                className="check_box"
                label="Seoul"
              />
              <FormControlLabel
                control={<Checkbox />}
                className="check_box"
                label="Busan"
              />
              <FormControlLabel
                control={<Checkbox />}
                className="check_box"
                label="Daejeon"
              />
              <FormControlLabel
                control={<Checkbox />}
                className="check_box"
                label="Incheon"
              />
              <FormControlLabel
                control={<Checkbox />}
                className="check_box"
                label="Ulsan"
              />
              <FormControlLabel
                control={<Checkbox />}
                className="check_box"
                label="Daegu"
              />
              <FormControlLabel
                control={<Checkbox />}
                className="check_box"
                label="Gwangju "
              />
            </Box>
          </Box>
        </Box>
        <Box className="product_box">
          <Box className="product_wrap">
            {product_list?.map((service) => {
              return (
                <Stack
                  key={service.product_id}
                  className={
                    cartChange === service.product_id
                      ? "service_cart service_cart_active"
                      : "service_cart"
                  }
                  onMouseEnter={() => setCartChange(service.product_id)}
                  onMouseLeave={() => setCartChange(-1)}
                >
                  <Box
                    sx={{
                      backgroundImage: "url(/images/mock-img/images.jpeg)",
                    }}
                    className="image_box"
                  >
                    <Box
                      className={
                        cartChange === service.product_id
                          ? "like_btn_wrap like_btn_wrap_active"
                          : "like_btn_wrap"
                      }
                    >
                      <FavoriteIcon
                        className="like_btn"
                        sx={
                          service.product_liken
                            ? { fill: "red" }
                            : { fill: "white" }
                        }
                      />
                    </Box>
                  </Box>
                  <Box className="desc_box">
                    <h4 className="cart_name">Dog Cafe</h4>
                    <Box className="service_location">
                      <LocationOnIcon />
                      <p className="location_text">Seoul</p>
                    </Box>
                    <Box className="service_location">
                      <PhoneIcon />
                      <p className="location_text">010 5788 5120</p>
                    </Box>
                  </Box>
                  <Box className="bottom_box">
                    <Box className="review_box">
                      <Rating
                        className="review_icon"
                        name="half-rating"
                        defaultValue={4}
                        precision={0.5}
                        size="small"
                        readOnly
                      />
                      <p className="review_text">(23)</p>
                    </Box>
                    <Box className="like_view_box">
                      <FavoriteIcon className="like_view_btn" />
                      <p className="like_view_cnt">30</p>
                      <RemoveRedEyeIcon className="like_view_btn" />
                      <p className="like_view_cnt">58</p>
                    </Box>
                  </Box>
                </Stack>
              );
            })}
          </Box>

          <Pagination
            sx={{ mt: "20px" }}
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
    </Container>
  );
};

export default Services;
