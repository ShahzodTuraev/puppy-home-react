import React, { useEffect } from "react";
import {
  Box,
  Container,
  Checkbox,
  Stack,
  FormControlLabel,
  Pagination,
  PaginationItem,
} from "@mui/material";

import { service_list } from "../../mock/cart_data";
import { ArrowBack, ArrowForward, Close, Home } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import ServiceCard from "./serciveCard";
const Services = () => {
  /*INITIALIZATIONS*/

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
            {service_list?.map((service) => {
              return <ServiceCard key={service} cartData={service} />;
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
