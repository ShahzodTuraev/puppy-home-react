import { Avatar, Badge, Box, Container, IconButton, Menu } from "@mui/material";
import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  Search,
  Notifications,
  ArrowUpward,
  Person,
  Logout,
  FavoriteBorder,
  ListAlt,
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
const Navbar = () => {
  /*INITIALIZATIONS*/
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [side, setSide] = WishCont();
  const open = Boolean(anchorEl);
  const [scrollPosition, setScrollPosition] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Check if scrollPosition is greater than or equal to 100
  const isScrolled = scrollPosition >= 100;
  const isTopScroll = scrollPosition >= 300;
  // const [menu, setMenu] = useState(false);
  // const onMenu = () => {
  //   setMenu(!menu);
  // };

  /*HANDLERS*/
  const topHandler = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const handleSearch = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
    setSide(3);
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
            <Badge
              className="badge"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleSearch}
            >
              <IconButton className="icon_box search_icon">
                <Search
                  className={anchorEl == null ? "icon" : "icon set_color"}
                />
              </IconButton>
            </Badge>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
              PaperProps={{
                sx: {
                  overflow: "visible",
                  boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <Box className="search_menu">
                <input
                  className="search_input"
                  placeholder="Search"
                  type="text"
                />
                <Box className="search_button">Search</Box>
              </Box>
            </Menu>
            <Basket />

            {verifyMemberData ? (
              <Box className="auth_box">
                <Badge
                  badgeContent={4}
                  color="primary"
                  className="badge notif_badge"
                >
                  <IconButton className="icon_box">
                    <Notifications className="icon" />
                  </IconButton>
                </Badge>
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
        </Container>
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
