import {
  Add,
  Close,
  Favorite,
  FavoriteBorder,
  Home,
  Remove,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Rating,
  Stack,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ReactImageMagnify from "react-image-magnify";
import "../../scss/shop.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ShoppingCart from "../../app/components/shoppingCart";
// REDUX
import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setChosenProduct, setRelatedProducts } from "./slice";
import { Product } from "../../types/product";
import { retrieveChosenProduct, retrieveRelatedProducts } from "./selector";
import ProductApiService from "../../app/apiServices/productApiService";
import { serverApi } from "../../app/lib/config";
import { verifyMemberData } from "../../app/apiServices/verify";
import { Definer } from "../../app/lib/Definer";
import MemberApiService from "../../app/apiServices/memberApiService";
import assert from "assert";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../app/lib/sweetAlert";
import { ShoppingCartCont } from "../../app/context/ShoppingCart";
import ProductReview from "./productReview";
// REDUX SLICE
const actionDispatch = (dispatch: Dispatch) => ({
  setChosenProduct: (data: Product) => dispatch(setChosenProduct(data)),
  setRelatedProducts: (data: Product[]) => dispatch(setRelatedProducts(data)),
});
// REDUX SELECTOR
const chosenProductRetriever = createSelector(
  retrieveChosenProduct,
  (chosenProduct) => ({
    chosenProduct,
  })
);
const relatedProductRetriever = createSelector(
  retrieveRelatedProducts,
  (relatedProduct) => ({
    relatedProduct,
  })
);

const ChosenProduct = () => {
  /*INITIALIATIONS*/
  const { setChosenProduct, setRelatedProducts } = actionDispatch(
    useDispatch()
  );
  const { chosenProduct } = useSelector(chosenProductRetriever);
  let { product_id } = useParams<{ product_id: any }>();

  const pathname = useLocation();
  const [productRebuild, setProductRebuild] = useState<Date>(new Date());
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);
  const product_type = chosenProduct?.product_collection
    ? chosenProduct?.product_collection
    : "clothes";
  // related products retrieve:
  useEffect(() => {
    const productService = new ProductApiService();
    productService
      .getTargetProducts({
        order: "createdAt",
        page: 1,
        limit: 20,
        product_collection: [product_type],
        price: [0, 1000],
        search: "",
      })
      .then((data) => setRelatedProducts(data))
      .catch((err) => console.log(err));
  }, [product_type, productRebuild]);
  const { relatedProduct } = useSelector(relatedProductRetriever);

  const [count, setCount] = useState<number>(1);
  const navigate = useNavigate();
  const productRelatedProcess = async () => {
    try {
      const productService = new ProductApiService();
      const product: Product = await productService.getChosenProduct(
        product_id
      );
      setChosenProduct(product);
    } catch (err) {
      console.log("ProductRelatedProcess:", err);
    }
  };

  const [imgChange, setImgChange] = useState(0);
  const wide_img = `${serverApi}/${chosenProduct?.product_images.filter(
    (ele) => chosenProduct?.product_images.indexOf(ele) === imgChange
  )}`;
  useEffect(() => {
    productRelatedProcess().then();
  }, [productRebuild, pathname]);
  const price = chosenProduct?.product_price ? chosenProduct?.product_price : 0;
  const discount = chosenProduct?.product_discount
    ? chosenProduct?.product_discount
    : 0;
  const salePrice = Math.round((price * (100 - discount)) / 1000) * 10;
  const setAddToCart = ShoppingCartCont();
  const product_review = chosenProduct?.product_reviews;
  const divider = product_review && product_review > 0 ? product_review : 1;
  const ratingValue =
    (chosenProduct?.product_rating ? chosenProduct?.product_rating : 0) /
    divider;
  /*HANDLERS*/
  const addToCartHandler = () => {
    chosenProduct?.product_left_cnt !== 0 &&
      setAddToCart[1]([chosenProduct, count, new Date()]);
  };
  const targetLikeHandler = async (e: any) => {
    try {
      assert.ok(verifyMemberData, Definer.auth_err1);
      const memberService = new MemberApiService();
      const data = { like_ref_id: chosenProduct?._id, group_type: "product" };
      const like_result: any = await memberService.memberLikeTarget(data);
      assert.ok(like_result, Definer.general_err1);

      if (like_result.like_status > 0) {
        e.target.style.fill = "#FF3040";
      } else {
        e.target.style.fill = "white";
      }
      setProductRebuild(new Date());
      await sweetTopSmallSuccessAlert("success", 700, false);
    } catch (err: any) {
      console.log("targetLikeBest, ERROR:::", err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <div className="chosen_product">
      <div className="mobile_note">
        Mobile version is on developing process. Please use laptop version
      </div>
      <Container className="chosen_container">
        <Box className="dir_box">
          <Box onClick={() => navigate("/")} className="dir_link">
            <Home />
            <p>Home</p>
          </Box>
          <p className="link_div">/</p>
          <Box className="dir_link">
            <p className="before_icon">Shop</p>
          </Box>
          <p className="link_div">/</p>
          <Box className="dir_link">
            <p className="before_icon">Product</p>
            <Close onClick={() => navigate("/shop")} className="close" />
          </Box>
        </Box>
        <Stack className="pro_main_box">
          <Box className="pro_img_box">
            <Box className="select_box">
              {chosenProduct?.product_images?.map((ele, id) => {
                const image_path = `${serverApi}/${ele}`;
                return (
                  <img
                    onMouseEnter={() => setImgChange(id)}
                    src={image_path}
                    key={id}
                    className="select_item"
                    alt="product"
                    style={
                      imgChange === id
                        ? { border: " 2px solid #fc9823" }
                        : { border: " 2px solid #ffffff" }
                    }
                  />
                );
              })}
            </Box>
            <Box className="main_img_box">
              <ReactImageMagnify
                className="selected_item"
                {...{
                  smallImage: {
                    alt: "Wristwatch by Ted Baker London",
                    isFluidWidth: true,
                    src: wide_img,
                  },
                  largeImage: {
                    width: 700,
                    height: 700,
                    src: wide_img,
                  },
                }}
              />
            </Box>
          </Box>
          <Box className="info_box">
            <Box className="name_wrap">
              <h4 className="product_name">{chosenProduct?.product_name}</h4>
              {chosenProduct?.me_liked &&
              chosenProduct?.me_liked[0]?.my_favorite ? (
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
                value={ratingValue} //to do review avarage
                precision={0.5}
                size="small"
                readOnly
              />
              <p className="review_text">
                ({chosenProduct?.product_reviews || 0})
              </p>
            </Box>
            <Box className="vertical_line" />
            {chosenProduct && chosenProduct?.product_discount * 1 > 0 ? (
              <Box className="price_box">
                <Box className="discount_percent">
                  <p>{chosenProduct?.product_discount}%</p>
                </Box>
                <p className="real_price">
                  {" "}
                  &#8361; {chosenProduct?.product_price}
                </p>
              </Box>
            ) : (
              <></>
            )}
            <Box className="feat_box">
              <p className="sale_price">&#8361; {salePrice}</p>
              <Box className="point_box">
                <img
                  src="/icons/point.png"
                  alt="point"
                  className="point_icon"
                />
                <p>{chosenProduct?.product_point} points</p>
              </Box>
            </Box>
            <p className="product_desc">
              {chosenProduct?.product_description}. Elevate your pup's lifestyle
              with our curated collection of canine delights! Explore a range of
              stylish clothes, whimsical toys, and nutritious food that cater to
              your furry friend's every need. From cozy sweaters to interactive
              playthings and premium nutrition, indulge your puppy in a world of
              comfort, play, and scrumptious delights—because every tail wag
              deserves the very best!
            </p>

            <div
              style={
                chosenProduct?.product_collection === "clothes"
                  ? { display: "block" }
                  : { display: "none" }
              }
            >
              <p className="size_box">Size:</p>
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel value="s" control={<Radio />} label="S" />
                  <FormControlLabel value="m" control={<Radio />} label="M" />
                  <FormControlLabel value="l" control={<Radio />} label="L" />
                  <FormControlLabel value="xl" control={<Radio />} label="XL" />
                  <FormControlLabel
                    value="xxl"
                    control={<Radio />}
                    label="XXL"
                  />
                </RadioGroup>
              </FormControl>
            </div>

            <Box className="add_box">
              <Box className="add_number">
                <Remove
                  onClick={() => {
                    count > 1 ? setCount(count - 1) : setCount(1);
                  }}
                  className="add_rem_icon"
                />
                <p className="show_num">{count}</p>
                <Add
                  onClick={() => setCount(count + 1)}
                  className="add_rem_icon"
                />
              </Box>
              <Button onClick={addToCartHandler} className="add_btn">
                add to cart
              </Button>
            </Box>
          </Box>
        </Stack>
        <Stack className="related_box">
          <h3>Related Products</h3>
          <Swiper
            className="rec_swiper"
            spaceBetween={20}
            slidesPerView={4}
            navigation={true}
            modules={[Navigation]}
          >
            {relatedProduct.map((ele) => {
              return (
                <SwiperSlide key={ele._id}>
                  <ShoppingCart cartData={ele} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Stack>
        <ProductReview chosenProduct={chosenProduct} />
      </Container>
    </div>
  );
};

export default ChosenProduct;
