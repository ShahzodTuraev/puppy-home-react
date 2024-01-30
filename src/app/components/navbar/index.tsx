import {
  Avatar,
  Badge,
  Box,
  Container,
  IconButton,
  Stack,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  Search,
  ArrowUpward,
  Person,
  Logout,
  FavoriteBorder,
  ListAlt,
  MenuOutlined,
  KeyboardArrowRight,
} from "@mui/icons-material";
import "../../../scss/navbar.scss";
import { navbar } from "../../lib/navbar";
import Footer from "../footer";
import { verifyMemberData } from "../../apiServices/verify";
import { Dropdown, MenuProps } from "antd";
import MemberApiService from "../../apiServices/memberApiService";
import {
  sweetFailureProvider,
  sweetTopSmallSuccessAlert,
} from "../../lib/sweetAlert";
import { Definer } from "../../lib/Definer";
import Basket from "./basket";
import { WishCont } from "../../context/Wishlist";
import NotificationPart from "./notification";
import Chatting from "./chatting";
import { SearchCont } from "../../context/Search";
const Navbar = () => {
  /*INITIALIZATIONS*/
  const navigate = useNavigate();
  const setSide = WishCont();
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [search, setSearch] = SearchCont();
  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isScrolled = scrollPosition >= 100;
  const isTopScroll = scrollPosition >= 300;

  /*HANDLERS*/
  const topHandler = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleLogOutRequest = async () => {
    try {
      const memberApiService = new MemberApiService();
      await memberApiService.logOutRequest();
      await sweetTopSmallSuccessAlert("success", 700, true);
    } catch (err) {
      console.log(err);
      sweetFailureProvider(Definer.general_err1);
    }
  };
  const handleWishlist = () => {
    setSide[1](3);
    navigate("/orders");
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Box onClick={() => navigate("/my-account")} className="drop_item">
          <Person sx={{ fill: "#444444" }} />
          <p>My Account</p>
        </Box>
      ),
    },
    {
      key: "2",
      label: (
        <Box onClick={() => navigate("/orders")} className="drop_item">
          <ListAlt sx={{ fill: "#444444" }} />
          <p>My Orders</p>
        </Box>
      ),
    },
    {
      key: "3",
      label: (
        <Box onClick={handleWishlist} className="drop_item">
          <FavoriteBorder sx={{ fill: "#444444" }} />
          <p>Wishlist</p>
        </Box>
      ),
    },
    {
      key: "4",
      label: (
        <Box onClick={handleLogOutRequest} className="drop_item">
          <Logout sx={{ fill: "#444444" }} />
          <p>Log Out</p>
        </Box>
      ),
    },
  ];

  return (
    <>
      <div
        className={
          isScrolled ? "navbar_background active_scroll" : "navbar_background"
        }
      >
        <Container className="navbar_container">
          <Box
            onClick={() => navigate("/")}
            className="navbar_section section_1"
          >
            <img className="logo_image" src="/icons/logo.svg" alt="logo" />
            <h3 className="logo_text">
              Puppy<span>Home</span>
            </h3>
          </Box>

          <Box className="navbar_section section_2">
            {navbar.map(({ title, path, hidden }, id) => {
              return (
                !hidden && (
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "nav_link active" : "nav_link"
                    }
                    key={id}
                    to={path}
                  >
                    {title}
                  </NavLink>
                )
              );
            })}
          </Box>
          <Box className="navbar_section section_3">
            <Dropdown
              trigger={["click"]}
              className="account_dropdown"
              placement="bottomRight"
              arrow={{ pointAtCenter: true }}
              overlayClassName="search_root"
              dropdownRender={(menu) => (
                <div>
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    type="text"
                    placeholder="search"
                  />
                </div>
              )}
            >
              <Badge color="primary" className="badge">
                <IconButton
                  onClick={() => navigate("/shop")}
                  className=" icon_box cart_icon "
                >
                  <Search className="icon" />
                </IconButton>
              </Badge>
            </Dropdown>
            <Basket />

            {verifyMemberData ? (
              <Box className="auth_box">
                <NotificationPart />
                <Dropdown
                  className="account_dropdown"
                  menu={{ items }}
                  placement="bottomRight"
                >
                  <Box className="user_avatar_wrap">
                    <Avatar
                      className="user_avatar"
                      alt="User"
                      src={verifyMemberData.mb_image}
                    />
                  </Box>
                </Dropdown>
              </Box>
            ) : (
              <div>
                <NavLink to={"/sign-up"} className="nav_btn">
                  Sign up
                </NavLink>
                <NavLink to={"/log-in"} className="nav_btn">
                  Log in
                </NavLink>
              </div>
            )}
          </Box>
          <MenuOutlined
            className="mobile_menu_btn"
            onClick={() => setOpenMenu(true)}
          />
          <Stack
            sx={{ display: "flex", flexDirection: "row" }}
            className={openMenu ? "mobile_menu menu_opened" : "mobile_menu"}
          >
            <Box className="menu_left_section">
              <KeyboardArrowRight
                onClick={() => setOpenMenu(false)}
                className="close_menu_btn"
              />
            </Box>
            <Box className="menu_right_section">
              <p>HOME</p>
              <p>SHOP</p>
              <p>SERVICE</p>
              <p>DAENGGRAM</p>
              <p>HELP</p>
              <p>SIGN UP</p>
              <p>LOG IN</p>
            </Box>
          </Stack>
        </Container>
        <Box className="chat_icon_wrap">
          <Chatting />
        </Box>
        {isTopScroll && (
          <ArrowUpward
            sx={{ fill: "#ffffff ", width: "40px", height: "40px" }}
            className="up_icon"
            onClick={topHandler}
          />
        )}
      </div>

      <Outlet />
      <Footer />
    </>
  );
};

export default Navbar;
