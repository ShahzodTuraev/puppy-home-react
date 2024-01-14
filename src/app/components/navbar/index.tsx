import { Badge, Box, Button, Container, IconButton, Menu } from "@mui/material";
import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  Notifications,
  KeyboardArrowUp,
} from "@mui/icons-material";
import "../../../scss/navbar.scss";
import { navbar } from "../../lib/navbar";
import { Link } from "react-scroll";
import Footer from "../footer";

const Navbar = () => {
  /*INITIALIZATIONS*/
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
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
            <Badge badgeContent="2" color="primary" className="badge">
              <IconButton className="icon_box cart_icon">
                <ShoppingCart className="icon" />
              </IconButton>
            </Badge>

            <Badge badgeContent="4" color="primary" className="badge">
              <IconButton className="icon_box cart_icon">
                <Notifications className="icon" />
              </IconButton>
            </Badge>
            <Button className="nav_btn_sign">Sign up </Button>
            <Button className="nav_btn">Log in </Button>
          </Box>
        </Container>
      </div>
      {isTopScroll && (
        <Link
          to="pageHeader"
          spy={true}
          smooth={true}
          offset={0}
          duration={500}
        >
          <KeyboardArrowUp className="up_icon" />
        </Link>
      )}

      <Outlet />
      <Footer />
    </>
  );
};

export default Navbar;
