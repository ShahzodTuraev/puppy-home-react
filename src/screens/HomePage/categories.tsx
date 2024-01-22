import { Box, Container } from "@mui/material";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useNavigate } from "react-router-dom";
import { CategoryCont } from "../../app/context/Category";
const Categories = () => {
  /*INITIALIZATIONS*/
  const [category, setCategory] = CategoryCont();

  const navigate = useNavigate();
  const category_list = [
    { collection: "etc", imagePath: "/images/categories/bag.jpg", name: "Bag" },
    {
      collection: "etc",
      imagePath: "/images/categories/accessory.png",
      name: "Accessory",
    },
    {
      collection: "clothes",
      imagePath: "/images/categories/dress.png",
      name: "Dress",
    },
    {
      collection: "food",
      imagePath: "/images/categories/food.png",
      name: "Food",
    },
    { collection: "etc", imagePath: "/images/categories/bed.jpg", name: "Bed" },
    { collection: "toy", imagePath: "/images/categories/toy.jpg", name: "Toy" },
    {
      collection: "beauty",
      imagePath: "/images/categories/parfume.png",
      name: "Hygiene",
    },
    {
      collection: "etc",
      imagePath: "/images/categories/dish.jpg",
      name: "Bowl",
    },
  ];
  /*HANDLERS*/

  return (
    <div className="category_container">
      <Container>
        <h2 className="component_title">Shop by Category</h2>
        <Swiper
          spaceBetween={20}
          slidesPerView={7}
          loop={true}
          centeredSlides={true}
          className="mySwiper_category"
        >
          {category_list.map(({ imagePath, name, collection }, id) => {
            return (
              <SwiperSlide
                className="swiper_slide"
                onClick={() => {
                  setCategory(collection);
                  navigate("/shop");
                }}
                key={id}
              >
                <Box
                  className="category_img"
                  sx={{ backgroundImage: `url(${imagePath})` }}
                />
                <p className="category_name">{name}</p>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Container>
    </div>
  );
};

export default Categories;
