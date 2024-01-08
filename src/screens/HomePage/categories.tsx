import { Box, Container } from "@mui/material";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
const Categories = () => {
  /*INITIALIZATIONS*/
  const category = [
    { imagePath: "/images/categories/bag.jpg", name: "Bag" },
    { imagePath: "/images/categories/accessory.png", name: "Accessory" },
    { imagePath: "/images/categories/dress.png", name: "Dress" },
    { imagePath: "/images/categories/food.png", name: "Food" },
    { imagePath: "/images/categories/bed.jpg", name: "Bed" },
    { imagePath: "/images/categories/toy.jpg", name: "Toy" },
    { imagePath: "/images/categories/parfume.png", name: "Hygiene" },
    { imagePath: "/images/categories/dish.jpg", name: "Bowl" },
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
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          className="mySwiper_category"
        >
          {category.map(({ imagePath, name }, id) => {
            return (
              <SwiperSlide className="swiper_slide" key={id}>
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
