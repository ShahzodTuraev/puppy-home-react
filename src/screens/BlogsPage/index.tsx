import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  Modal,
  Pagination,
  PaginationItem,
  Stack,
  TextField,
} from "@mui/material";
import {
  Close,
  Home,
  CloudUpload,
  Facebook,
  Instagram,
  Telegram,
  YouTube,
  WhatsApp,
  Settings,
  ArrowBack,
  ArrowForward,
} from "@mui/icons-material";

import "../../scss/blogs.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { BoArticle, SearchArticlesObj } from "../../types/boArticle";
import CommunityApiService from "../../app/apiServices/communityApiService";
// REDUX
import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setTargetBoArticles } from "./slice";
import { retrieveTargetBoArticles } from "./selector";
import Postcard from "./postcard";
import { verifyMemberData } from "../../app/apiServices/verify";
import CreatePost from "./createPost";
import { Member } from "../../types/user";
// REDUX SLICE
const actionDispatch = (dispatch: Dispatch) => ({
  setTargetBoArticles: (data: BoArticle[]) =>
    dispatch(setTargetBoArticles(data)),
});
// REDUX SELECTOR
const targetBoArticlesRetriever = createSelector(
  retrieveTargetBoArticles,
  (targetBoArticles) => ({
    targetBoArticles,
  })
);

const BlogsPage = () => {
  /*INITIALIZATIONS*/
  const { setTargetBoArticles } = actionDispatch(useDispatch());
  const { targetBoArticles } = useSelector(targetBoArticlesRetriever);
  const pathname = useLocation();
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    scrollTop();
  }, [pathname]);
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const [artRebuild, setArtRebuild] = useState<Date>(new Date());
  const [user, setUser] = useState<Member>(verifyMemberData);
  const userImage = user?.mb_image ? user?.mb_image : "/icons/user_avatar.jpg";
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
  const [searchArticlesObj, setSearchArticlesObj] = useState<SearchArticlesObj>(
    {
      page: 1,
      limit: 10,
      mb_id: "all",
    }
  );
  const [posts, setPosts] = useState<boolean>(false);
  useEffect(() => {
    const communityService = new CommunityApiService();
    communityService
      .getTargetArticles(searchArticlesObj)
      .then((data) => setTargetBoArticles(data))
      .catch((err) => console.log(err));
  }, [searchArticlesObj, artRebuild]);

  /*HANDLERS*/
  const handlePaginationChange = (event: any, value: number) => {
    searchArticlesObj.page = value;
    setSearchArticlesObj({ ...searchArticlesObj });
    scrollTop();
  };
  const myPostsHandler = () => {
    setPosts(true);
    if (user?._id === verifyMemberData?._id) {
      setSearchArticlesObj({
        page: 1,
        limit: 10,
        mb_id: "none",
      });
    } else {
      setSearchArticlesObj({
        page: 1,
        limit: 10,
        mb_id: user?._id,
      });
    }
  };
  const allPostsHandler = () => {
    setPosts(false);
    setSearchArticlesObj({
      page: 1,
      limit: 10,
      mb_id: "all",
    });
  };
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
            <Box className="avatar_wrap">
              <Settings
                className="setting_icon"
                onClick={() => navigate("/my-account")}
              />
              <Avatar alt="user" src={userImage} className="avatar" />
            </Box>
            <h4 className="user_name">{user?.mb_nick}</h4>
            <Box className="follow_box">
              <p className="follow_text">
                <span>{user?.mb_subscriber_cnt}</span>followers
              </p>
              <p className="follow_text">
                <span>{user?.mb_follow_cnt}</span>following
              </p>
              <p className="follow_text">
                <span>{user?.mb_point}</span>points
              </p>
            </Box>
            <Box className="icon_box">
              <Facebook className="sns_icon" />
              <Instagram className="sns_icon" />
              <WhatsApp className="sns_icon" />
              <Telegram className="sns_icon" />
              <YouTube className="sns_icon" />
            </Box>

            <p className="user_desc">
              As a new member of the group, I aim to contribute by sharing posts
              that offer value to everyone.{user?.mb_description}
            </p>
            <Box className="btn_box">
              {user._id === verifyMemberData._id ? (
                <Button onClick={() => setOpen(true)} className="user_btn">
                  Create Post
                </Button>
              ) : (
                <Button onClick={() => setOpen(true)} className="user_btn">
                  Follow
                </Button>
              )}
              {posts ? (
                <Button onClick={allPostsHandler} className="user_btn">
                  All Posts
                </Button>
              ) : (
                <Button onClick={myPostsHandler} className="user_btn">
                  {user?.mb_nick === verifyMemberData.mb_nick
                    ? "My Posts"
                    : `${user?.mb_nick}'s posts`}
                </Button>
              )}
              <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style_create}>
                  <CreatePost setOpen={setOpen} setArtRebuild={setArtRebuild} />
                </Box>
              </Modal>
            </Box>
            <Box className="follow_container"></Box>
          </Stack>
          <Stack className="main_posts">
            {targetBoArticles.map((post) => {
              return (
                <Postcard
                  key={post._id}
                  cartData={post}
                  setArtRebuild={setArtRebuild}
                  artRebuild={artRebuild}
                  setUser={setUser}
                />
              );
            })}
            <Pagination
              count={
                searchArticlesObj.page >= 3 ? searchArticlesObj.page + 1 : 3
              }
              page={searchArticlesObj.page}
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
          </Stack>
        </Stack>
      </Container>
    </div>
  );
};

export default BlogsPage;
