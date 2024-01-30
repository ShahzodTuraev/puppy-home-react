import React, { useEffect, useState } from "react";
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

import { ArrowBack, ArrowForward, Close, Home } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import ServiceCard from "./serciveCard";

// REDUX
import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setAllServices } from "./slice";
import { Product } from "../../types/product";
import { retrieveAllServices } from "./selector";
import ServiceApiService from "../../app/apiServices/serviceApiService";
import { ServiceSearchObj } from "../../types/others";
// REDUX SLICE
const actionDispatch = (dispatch: Dispatch) => ({
  setAllServices: (data: Product[]) => dispatch(setAllServices(data)),
});
// REDUX SELECTOR
const allServicesRetriever = createSelector(
  retrieveAllServices,
  (allServices) => ({
    allServices,
  })
);
const Services = () => {
  /*INITIALIZATIONS*/
  const { setAllServices } = actionDispatch(useDispatch());
  const { allServices } = useSelector(allServicesRetriever);
  const [category, setCategory] = useState<string>("all");
  const [area, setArea] = useState<string>("all");
  const [searchServicesObj, setSearchServicesObj] = useState<ServiceSearchObj>({
    order: "product_views",
    page: 1,
    limit: 9,
    service_collection: [
      "daycare",
      "dog_cafe",
      "grooming_salon",
      "veterinary_clinic",
      "kindergarten",
    ],
    service_area: [
      "Seoul",
      "Daejeon",
      "Busan",
      "Incheon",
      "Ulsan",
      "Daegu",
      "Gwangju",
    ],
  });
  const navigate = useNavigate();
  useEffect(() => {
    const serviceService = new ServiceApiService();
    serviceService
      .getTargetServices(searchServicesObj)
      .then((data) => setAllServices(data))
      .catch((err) => console.log(err));
  }, [searchServicesObj]);
  /*HANDLERS*/
  const handleTypeChange = (e: any) => {
    searchServicesObj.service_collection =
      e.target.value === "all"
        ? [
            "daycare",
            "dog_cafe",
            "grooming_salon",
            "veterinary_clinic",
            "kindergarten",
          ]
        : [e.target.value];
    searchServicesObj.page = 1;
    setCategory(e.target.value);
    setSearchServicesObj({ ...searchServicesObj });
  };
  const handleAreaChange = (e: any) => {
    searchServicesObj.service_area =
      e.target.value === "all"
        ? ["Seoul", "Daejeon", "Busan", "Incheon", "Ulsan", "Daegu", "Gwangju"]
        : [e.target.value];
    searchServicesObj.page = 1;
    setArea(e.target.value);
    setSearchServicesObj({ ...searchServicesObj });
  };
  const handlePaginationChange = (event: any, value: number) => {
    searchServicesObj.page = value;
    setSearchServicesObj({ ...searchServicesObj });
  };
  return (
    <Container className="products_container">
      <div className="mobile_note">
        Mobile version is on developing process. Please use laptop version
      </div>
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
              <FormControl>
                <RadioGroup
                  onChange={handleTypeChange}
                  value={category}
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                >
                  <FormControlLabel
                    value="all"
                    control={<Radio />}
                    label="All"
                  />
                  <FormControlLabel
                    value="daycare"
                    control={<Radio />}
                    label="Daycare"
                  />
                  <FormControlLabel
                    value="dog_cafe"
                    control={<Radio />}
                    label="Dog cafe"
                  />
                  <FormControlLabel
                    value="veterinary_clinic"
                    control={<Radio />}
                    label="Veterinary Clinic"
                  />
                  <FormControlLabel
                    value="grooming_salon"
                    control={<Radio />}
                    label="Grooming Salon"
                  />
                  <FormControlLabel
                    value="kindergarten"
                    control={<Radio />}
                    label="Kindergarten"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
          </Box>
          <Box className="filter_head">
            <p>Service Area</p>
          </Box>
          <Box className="filter_body">
            <Box className="filter_line">
              <FormControl>
                <RadioGroup
                  onChange={handleAreaChange}
                  value={area}
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                >
                  <FormControlLabel
                    value="all"
                    control={<Radio />}
                    label="All"
                  />
                  <FormControlLabel
                    value="Seoul"
                    control={<Radio />}
                    label="Seoul"
                  />
                  <FormControlLabel
                    value="Busan"
                    control={<Radio />}
                    label="Busan"
                  />
                  <FormControlLabel
                    value="Daejeon"
                    control={<Radio />}
                    label="Daejeon"
                  />
                  <FormControlLabel
                    value="Incheon"
                    control={<Radio />}
                    label="Incheon"
                  />
                  <FormControlLabel
                    value="Ulsan"
                    control={<Radio />}
                    label="Ulsan"
                  />
                  <FormControlLabel
                    value="Daegu"
                    control={<Radio />}
                    label="Daegu"
                  />
                  <FormControlLabel
                    value="Gwangju"
                    control={<Radio />}
                    label="Gwangju"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
          </Box>
        </Box>
        <Box className="product_box">
          <Box className="product_wrap">
            {allServices.map((service) => {
              return <ServiceCard key={service._id} cartData={service} />;
            })}
          </Box>

          <Pagination
            count={searchServicesObj.page >= 3 ? searchServicesObj.page + 1 : 3}
            page={searchServicesObj.page}
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

export default Services;
