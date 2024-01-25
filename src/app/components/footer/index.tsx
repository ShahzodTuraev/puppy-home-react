import { Box, Button, Stack } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import TelegramIcon from "@mui/icons-material/Telegram";
import RoomIcon from "@mui/icons-material/Room";
import PhoneIcon from "@mui/icons-material/Phone";
import "../../../scss/navbar.scss";
import { sweetTopSmallSuccessAlert } from "../../lib/sweetAlert";
const Footer = () => {
  /*INITIALIZATIONS*/
  const [value, setValue] = useState<string>("");
  const navigate = useNavigate();
  /*HANDLERS*/
  const submitHandler = () => {
    if (value !== "") {
      setValue("");
      sweetTopSmallSuccessAlert("success", 800, false);
    }
  };
  return (
    <div className="footer">
      <Stack className="footer_container">
        <Box className="subscribe_box">
          <h3 className="subs_title">sign up for news</h3>
          <Box className="input_wrap">
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              type="email"
              placeholder="Your email address"
              className="footer_input"
            />
            <Button onClick={submitHandler} className="footer_btn">
              subscribe
            </Button>
          </Box>
        </Box>
        <Box className="main_box">
          <Box className="main_section_1">
            <Box onClick={() => navigate("/")} className="site_logo">
              <img className="logo_image" src="/icons/logo.svg" alt="logo" />
              <h3 className="logo_text">
                Puppy<span>Home</span>
              </h3>
            </Box>
            <p className="footer_text">
              The platform assists in discovering top-quality dog essentials and
              encourages interaction and the exchange of relevant experiences
              among users.
            </p>
            <Box className="sns_box">
              <a href="https://github.com/ShahzodTuraev">
                <FacebookIcon className="sns_icon" />
              </a>
              <a href="https://t.me/shahzodbek_turaev">
                <TelegramIcon className="sns_icon" />
              </a>
              <a href="https://www.linkedin.com/in/shahzod-turaev-a71b0718b/">
                <LinkedInIcon className="sns_icon" />
              </a>
              <a href="https://www.instagram.com/shahzodbek0909/">
                <InstagramIcon className="sns_icon" />
              </a>
              <a href="https://github.com/ShahzodTuraev/">
                <GitHubIcon className="sns_icon" />
              </a>
            </Box>
          </Box>
          <Box className="main_section_2">
            <h4 className="section_heading">Content</h4>
            <Box className="marginer" />
            <p onClick={() => navigate("/")} className="content">
              Home
            </p>
            <p onClick={() => navigate("/shop")} className="content">
              Shop
            </p>
            <p onClick={() => navigate("/service")} className="content">
              Service
            </p>
            <p onClick={() => navigate("/blogs")} className="content">
              Blogs
            </p>
            <p onClick={() => navigate("/help")} className="content">
              Help
            </p>
          </Box>
          <Box className="main_section_2 section_3">
            <h4 className="section_heading">Contact Us</h4>
            <Box className="marginer" />
            <p className="content">
              <RoomIcon className="content_icon" />
              South Korea
            </p>
            <a href="tel:01057885120" className="content">
              <PhoneIcon className="content_icon" />+ 82 10 5788 5120
            </a>
            <a href="mailto:turayevshahzodbek@gmail.com" className="content">
              <EmailIcon className="content_icon" />
              turayevshahzodbek@gmail.com
            </a>
          </Box>
        </Box>
        <Box className="sec_divider" />
        <p className="bottom_box">
          © 2024 Copyright: PuppyHome. All Right Reserved.
        </p>
      </Stack>
    </div>
  );
};

export default Footer;
