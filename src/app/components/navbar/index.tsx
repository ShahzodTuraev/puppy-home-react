import { Badge, Box, Container, IconButton, Menu } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  Notifications,
  ArrowUpward,
} from "@mui/icons-material";
import "../../../scss/navbar.scss";
import { navbar } from "../../lib/navbar";
import Footer from "../footer";
import { FullContext } from "../../context";

const Navbar = () => {
  /*INITIALIZATIONS*/
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [category, setCategory] = useContext(FullContext);
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
  const [menu, setMenu] = useState(false);
  const onMenu = () => {
    setMenu(!menu);
  };

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
            <Badge badgeContent="0" color="primary" className="badge">
              <IconButton className="icon_box cart_icon">
                <ShoppingCart className="icon" />
              </IconButton>
            </Badge>

            <Badge badgeContent="0" color="primary" className="badge">
              <IconButton className="icon_box cart_icon">
                <Notifications className="icon" />
              </IconButton>
            </Badge>
            <NavLink to={"/sign-up"} className="nav_btn">
              Sign up
            </NavLink>
            <NavLink to={"/log-in"} className="nav_btn">
              Log in
            </NavLink>
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
