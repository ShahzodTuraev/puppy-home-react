import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  Modal,
  Stack,
  TextField,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import {
  Close,
  Home,
  FavoriteBorder,
  Favorite,
  MapsUgcOutlined,
  RemoveRedEye,
  CloudUpload,
} from "@mui/icons-material";

import "../../scss/blogs.scss";
import { useLocation, useNavigate } from "react-router-dom";

const BlogsPage = () => {
  /*INITIALIZATIONS*/
  const pathname = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);
  const navigate = useNavigate();
  const [comment, setComment] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const style_create = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "#fff",
    boxShadow: 24,
    borderRadius: "10px",
    p: 2,
    display: "flex",
    justifyContent: "center",
  };

  /*HANDLERS*/

  return (
    <div className="blogs">
      <Box
        sx={{ backgroundImage: "url(/images/header_img/blogs-page.jpg)" }}
        className="header_box"
      />
      <Container className="blogs_page">
        <Box className="dir_box">
          <Box onClick={() => navigate("/")} className="dir_link">
            <Home />
            <p>Home</p>
          </Box>
          <p className="link_div">/</p>
          <Box className="dir_link">
            <p className="before_icon">DaengGram</p>
            <Close onClick={() => navigate("/")} className="close" />
          </Box>
        </Box>
        <Stack className="main_box">
          <Stack className="side_bar">
            <Avatar
              alt="user"
              src="/images/categories/dish.jpg"
              className="avatar"
            />
            <h4 className="user_name">Jon Derry</h4>
            <Box className="follow_box">
              <p className="follow_text">
                <span>23</span>followers
              </p>
              <p className="follow_text">
                <span>63</span>following
              </p>
            </Box>
            <Box className="btn_box">
              <Button onClick={() => setOpen(true)} className="user_btn">
                Create Post
              </Button>
              <Button className="user_btn">My Posts</Button>
              {/* click case myposts>> all posts */}
              <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style_create}>
                  <Stack className="modal_content">
                    <h4>Create Post</h4>
                    <TextField
                      id="outlined-basic"
                      label="Post Subject"
                      variant="outlined"
                      className="input_subject"
                    />
                    <TextField
                      id="outlined-multiline-static"
                      label="Post Content"
                      multiline
                      rows={6}
                      className="input_content"
                    />
                    <p className="upload_title">Upload images</p>
                    <Box className="upload_box">
                      <Button component="label" style={{ minWidth: "0" }}>
                        <Box className="image_box">
                          <CloudUpload className="img_icon" />
                        </Box>
                        <input type="file" hidden />
                      </Button>
                      <Button component="label" style={{ minWidth: "0" }}>
                        <Box className="image_box">
                          <CloudUpload className="img_icon" />
                        </Box>
                        <input type="file" hidden />
                      </Button>
                      <Button component="label" style={{ minWidth: "0" }}>
                        <Box className="image_box">
                          <CloudUpload className="img_icon" />
                        </Box>
                        <input type="file" hidden />
                      </Button>
                      <Button component="label" style={{ minWidth: "0" }}>
                        <Box className="image_box">
                          <CloudUpload className="img_icon" />
                        </Box>
                        <input type="file" hidden />
                      </Button>
                    </Box>
                  </Stack>
                </Box>
              </Modal>
            </Box>
            <Box className="follow_container"></Box>
          </Stack>
          <Stack className="main_posts">
            <Box className="post_card">
              <Box className="auth_box">
                <Box className="user_info">
                  <Avatar alt="user" src="/images/categories/dish.jpg" />
                  <h4 className="user_name">Jon Derry</h4>
                </Box>
                <p className="post_time">• 2w •</p>
                <p className="follow_link">Follow</p>
              </Box>
              <Swiper
                pagination={{
                  clickable: true,
                }}
                navigation={true}
                modules={[Navigation, Pagination]}
                className="img_swiper"
              >
                <SwiperSlide>
                  <img
                    className="post_img"
                    src="/images/categories/bag.jpg"
                    alt="content"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    className="post_img"
                    src="/images/categories/dish.jpg"
                    alt="content"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    className="post_img"
                    src="/images/categories/dish.jpg"
                    alt="content"
                  />
                </SwiperSlide>
              </Swiper>
              <Box className="like_box">
                <Box className="left_icons">
                  <Box className="num_col">
                    <FavoriteBorder className="post_icon" />
                    <p>34</p>
                  </Box>
                  <Box onClick={() => setComment(true)} className="num_col">
                    <MapsUgcOutlined className="post_icon" />
                    <p>20</p>
                  </Box>
                </Box>
                <Box className="num_col col_left ">
                  <RemoveRedEye className="post_icon" />
                  <p>50</p>
                </Box>
              </Box>
              <Box className="article_box">
                <Box
                  className={
                    comment
                      ? "comments_wrap comments_wrap_active"
                      : "comments_wrap"
                  }
                >
                  <Close
                    className="close_comment"
                    onClick={() => setComment(false)}
                  />
                  <Box className="comment_box">
                    <Box className="comment_top">
                      <Avatar
                        className="user_avatar"
                        alt="user"
                        src="/images/categories/dish.jpg"
                      />
                      <h4 className="user_name">Jon Derry </h4>
                      <p className="comment_time">• 2w</p>
                    </Box>
                    <p className="comment_text">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Ut dolorum eaque cum veniam quae placeat optio earum?
                    </p>
                  </Box>
                  <Box className="comment_box">
                    <Box className="comment_top">
                      <Avatar
                        className="user_avatar"
                        alt="user"
                        src="/images/categories/dish.jpg"
                      />
                      <h4 className="user_name">Jon Derry </h4>
                      <p className="comment_time">• 2w</p>
                    </Box>
                    <p className="comment_text">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Ut dolorum eaque cum veniam quae placeat optio earum?
                    </p>
                  </Box>
                  <Box className="comment_box">
                    <Box className="comment_top">
                      <Avatar
                        className="user_avatar"
                        alt="user"
                        src="/images/categories/dish.jpg"
                      />
                      <h4 className="user_name">Jon Derry </h4>
                      <p className="comment_time">• 2w</p>
                    </Box>
                    <p className="comment_text">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Ut dolorum eaque cum veniam quae placeat optio earum?
                    </p>
                  </Box>
                  <Box className="comment_box">
                    <Box className="comment_top">
                      <Avatar
                        className="user_avatar"
                        alt="user"
                        src="/images/categories/dish.jpg"
                      />
                      <h4 className="user_name">Jon Derry </h4>
                      <p className="comment_time">• 2w</p>
                    </Box>
                    <p className="comment_text">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Ut dolorum eaque cum veniam quae placeat optio earum?
                    </p>
                  </Box>
                  <Box className="comment_bottom">
                    <input
                      className="add_comment"
                      placeholder="add a comment"
                      type="text"
                    />
                    <h4 className="submit_commit">Post</h4>
                  </Box>
                </Box>
                <h4 className="article_title">Lorem, ipsum dolor.</h4>
                <p className="article_content">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Dolore ad totam maxime autem. Lorem ipsum dolor sit amet,
                  consectetur adipisicing elit. Voluptatum, deleniti commodi!
                  Cum dolor sapiente alias sequi, esse similique optio quod
                  obcaecati perferendis, animi aspernatur magni. Voluptatibus
                  pariatur iure officiis dolores!
                </p>
              </Box>
            </Box>
            <Box className="post_card">
              <Box className="auth_box">
                <Box className="user_info">
                  <Avatar alt="user" src="/images/categories/dish.jpg" />
                  <h4 className="user_name">Jon Derry</h4>
                </Box>
                <p className="post_time">• 2w •</p>
                <p className="follow_link">Follow</p>
              </Box>
              <Swiper
                pagination={{
                  clickable: true,
                }}
                navigation={true}
                modules={[Navigation, Pagination]}
                className="img_swiper"
              >
                <SwiperSlide>
                  <img
                    className="post_img"
                    src="/images/categories/bag.jpg"
                    alt="content"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    className="post_img"
                    src="/images/categories/dish.jpg"
                    alt="content"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    className="post_img"
                    src="/images/categories/dish.jpg"
                    alt="content"
                  />
                </SwiperSlide>
              </Swiper>
              <Box className="like_box">
                <Box className="left_icons">
                  <Box className="num_col">
                    <Favorite className="post_icon" sx={{ fill: "#FF3040" }} />
                    <p>34</p>
                  </Box>
                  <Box onClick={() => setComment(true)} className="num_col">
                    <MapsUgcOutlined className="post_icon" />
                    <p>20</p>
                  </Box>
                </Box>
                <Box className="num_col col_left ">
                  <RemoveRedEye className="post_icon" />
                  <p>50</p>
                </Box>
              </Box>
              <Box className="article_box">
                <Box
                  className={
                    comment
                      ? "comments_wrap comments_wrap_active"
                      : "comments_wrap"
                  }
                >
                  <Close
                    className="close_comment"
                    onClick={() => setComment(false)}
                  />
                  <Box className="comment_box">
                    <Box className="comment_top">
                      <Avatar
                        className="user_avatar"
                        alt="user"
                        src="/images/categories/dish.jpg"
                      />
                      <h4 className="user_name">Jon Derry </h4>
                      <p className="comment_time">• 2w</p>
                    </Box>
                    <p className="comment_text">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Ut dolorum eaque cum veniam quae placeat optio earum?
                    </p>
                  </Box>
                  <Box className="comment_box">
                    <Box className="comment_top">
                      <Avatar
                        className="user_avatar"
                        alt="user"
                        src="/images/categories/dish.jpg"
                      />
                      <h4 className="user_name">Jon Derry </h4>
                      <p className="comment_time">• 2w</p>
                    </Box>
                    <p className="comment_text">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Ut dolorum eaque cum veniam quae placeat optio earum?
                    </p>
                  </Box>
                  <Box className="comment_box">
                    <Box className="comment_top">
                      <Avatar
                        className="user_avatar"
                        alt="user"
                        src="/images/categories/dish.jpg"
                      />
                      <h4 className="user_name">Jon Derry </h4>
                      <p className="comment_time">• 2w</p>
                    </Box>
                    <p className="comment_text">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Ut dolorum eaque cum veniam quae placeat optio earum?
                    </p>
                  </Box>
                  <Box className="comment_box">
                    <Box className="comment_top">
                      <Avatar
                        className="user_avatar"
                        alt="user"
                        src="/images/categories/dish.jpg"
                      />
                      <h4 className="user_name">Jon Derry </h4>
                      <p className="comment_time">• 2w</p>
                    </Box>
                    <p className="comment_text">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Ut dolorum eaque cum veniam quae placeat optio earum?
                    </p>
                  </Box>
                  <Box className="comment_bottom">
                    <input
                      className="add_comment"
                      placeholder="add a comment"
                      type="text"
                    />
                    <h4 className="submit_commit">Post</h4>
                  </Box>
                </Box>
                <h4 className="article_title">Lorem, ipsum dolor.</h4>
                <p className="article_content">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Dolore ad totam maxime autem. Lorem ipsum dolor sit amet,
                  consectetur adipisicing elit. Voluptatum, deleniti commodi!
                  Cum dolor sapiente alias sequi, esse similique optio quod
                  obcaecati perferendis, animi aspernatur magni. Voluptatibus
                  pariatur iure officiis dolores!
                </p>
              </Box>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
};

export default BlogsPage;
