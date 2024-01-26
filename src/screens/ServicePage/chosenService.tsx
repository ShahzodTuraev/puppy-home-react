import {
  Close,
  Email,
  Favorite,
  FavoriteBorder,
  Home,
  Phone,
  Room,
} from "@mui/icons-material";
import { Box, Container, Rating, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "../../scss/shop.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ServiceCard from "./serciveCard";
// REDUX
import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setChosenService, setRelatedServices } from "./slice";
import { Product } from "../../types/product";
import { retrieveChosenService, retrieveRelatedServices } from "./selector";
import { serverApi } from "../../app/lib/config";
import { verifyMemberData } from "../../app/apiServices/verify";
import { Definer } from "../../app/lib/Definer";
import MemberApiService from "../../app/apiServices/memberApiService";
import assert from "assert";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../app/lib/sweetAlert";
import ServiceApiService from "../../app/apiServices/serviceApiService";
import ServiceReview from "./serviceReview";

// REDUX SLICE
const actionDispatch = (dispatch: Dispatch) => ({
  setChosenService: (data: Product) => dispatch(setChosenService(data)),
  setRelatedServices: (data: Product[]) => dispatch(setRelatedServices(data)),
});
// REDUX SELECTOR
const chosenServiceRetriever = createSelector(
  retrieveChosenService,
  (chosenService) => ({
    chosenService,
  })
);
const relatedServiceRetriever = createSelector(
  retrieveRelatedServices,
  (relatedService) => ({
    relatedService,
  })
);

const ChosenService = () => {
  /*INITIALIATIONS*/
  const [serviceRebuild, setServiceRebuild] = useState<Date>(new Date());
  const { setChosenService, setRelatedServices } = actionDispatch(
    useDispatch()
  );
  let { service_id } = useParams<{ service_id: any }>();
  const { chosenService } = useSelector(chosenServiceRetriever);
  const { relatedService } = useSelector(relatedServiceRetriever);
  const pathname = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);
  const service_type = chosenService?.product_name
    ? chosenService?.product_name
    : "dog_cafe";
  useEffect(() => {
    const serviceService = new ServiceApiService();
    serviceService
      .getTargetServices({
        order: "product_views",
        page: 1,
        limit: 9,
        service_collection: [service_type],
        service_area: [
          "Seoul",
          "Daejeon",
          "Busan",
          "Incheon",
          "Ulsan",
          "Daegu",
          "Gwangju",
        ],
      })
      .then((data) => setRelatedServices(data))
      .catch((err) => console.log(err));
  }, [service_type, serviceRebuild]);
  const serviceRelatedProcess = async () => {
    try {
      const serviceService = new ServiceApiService();
      const service: Product = await serviceService.getChosenService(
        service_id
      );
      setChosenService(service);
    } catch (err) {
      console.log("serviceRelatedProcess:", err);
    }
  };
  useEffect(() => {
    serviceRelatedProcess().then();
  }, [pathname, serviceRebuild]);
  const navigate = useNavigate();
  const productRating =
    (chosenService?.product_rating ? chosenService?.product_rating : 0) /
    (chosenService?.product_reviews && chosenService?.product_reviews > 0
      ? chosenService?.product_reviews
      : 1);
  /*HANDLERS*/
  const targetLikeHandler = async (e: any) => {
    try {
      assert.ok(verifyMemberData, Definer.auth_err1);
      const memberService = new MemberApiService();
      const data = { like_ref_id: chosenService?._id, group_type: "product" };
      const like_result: any = await memberService.memberLikeTarget(data);
      assert.ok(like_result, Definer.general_err1);

      if (like_result.like_status > 0) {
        e.target.style.fill = "#FF3040";
      } else {
        e.target.style.fill = "white";
      }
      setServiceRebuild(new Date());
      await sweetTopSmallSuccessAlert("success", 700, false);
    } catch (err: any) {
      console.log("targetLikeBest, ERROR:::", err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <div className="chosen_product">
      <Container className="chosen_container">
        <Box className="dir_box">
          <Box onClick={() => navigate("/")} className="dir_link">
            <Home />
            <p>Home</p>
          </Box>
          <p className="link_div">/</p>
          <Box className="dir_link" onClick={() => navigate("/service")}>
            <p className="before_icon">Service</p>
          </Box>
          <p className="link_div">/</p>
          <Box className="dir_link">
            <p className="before_icon">One Service</p>
            <Close onClick={() => navigate("/service")} className="close" />
          </Box>
        </Box>
        <Stack className="pro_main_box">
          <Box className="pro_img_box">
            <Swiper
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Navigation]}
              className="img_swiper"
            >
              {chosenService?.product_images?.map((img) => {
                return (
                  <SwiperSlide key={img}>
                    <img
                      className="service_img"
                      src={`${serverApi}/${img}`}
                      alt="content"
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </Box>
          <Box className="info_box">
            <Box className="name_wrap">
              <h4 className="product_name">
                {chosenService?.shop_data?.mb_nick}
              </h4>
              {chosenService?.me_liked &&
              chosenService?.me_liked[0]?.my_favorite ? (
                <Favorite
                  onClick={targetLikeHandler}
                  sx={{
                    fill: "#FF3040",
                  }}
                  className="favorite_icon"
                />
              ) : (
                <FavoriteBorder
                  onClick={targetLikeHandler}
                  sx={{ fill: "#6e6e6e" }}
                  className="favorite_icon"
                />
              )}
            </Box>
            <Box className="review_box">
              <Rating
                className="review_icon"
                name="half-rating"
                value={productRating}
                precision={0.5}
                size="small"
                readOnly
              />
              <p className="review_text">
                (
                {chosenService?.product_reviews
                  ? chosenService?.product_reviews
                  : 0}
                )
              </p>
            </Box>
            <Box className="vertical_line" />
            <p className="content">
              <Room className="content_icon" />
              {chosenService?.shop_data?.mb_address}
            </p>
            <a href="tel:01057885120" className="content">
              <Phone className="content_icon" />
              {chosenService?.shop_data?.mb_phone}
            </a>
            <a href="mailto:turayevshahzodbek@gmail.com" className="content">
              <Email className="content_icon" />
              {chosenService?.shop_data?.mb_email}
            </a>
            <p className="product_desc">
              {chosenService?.shop_data?.mb_nick} is here. Embrace a world of
              tailored care for your newest family member with our exceptional
              puppy services. Our dedicated team is committed to providing a
              nurturing environment that promotes growth, health, and happiness
              for your furry bundle of joy. From specialized nutrition plans to
              interactive socialization sessions, we prioritize the unique needs
              of puppies. Our safe and stimulating play areas encourage vital
              development, while experienced trainers instill essential
              obedience skills. We understand the importance of building a
              strong foundation for a lifelong bond, offering guidance for both
              pups and their families. Entrust us with your puppy's early
              experiences, and witness a flourishing, well-rounded companion
              emerge.
            </p>
          </Box>
        </Stack>
        <Stack className="map_frame">
          <iframe
            title="service_map"
            className="map"
            src={chosenService?.shop_data?.mb_location
              ?.split(" ")[1]
              .slice(5, -1)}
          ></iframe>
        </Stack>

        <ServiceReview chosenService={chosenService} />
        <Stack sx={{ pt: 5, pb: 10 }} className="related_box">
          <h3 className="related_head">Related Services</h3>
          <Swiper
            className="rec_swiper"
            spaceBetween={50}
            style={{ width: "88%" }}
            slidesPerView={3}
            navigation={true}
            modules={[Navigation]}
          >
            {relatedService.map((ele) => {
              return (
                <SwiperSlide key={ele._id}>
                  <ServiceCard cartData={ele} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Stack>
      </Container>
    </div>
  );
};

export default ChosenService;
