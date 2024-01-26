import { MapsUgcOutlined } from "@mui/icons-material";
import { Avatar, Box } from "@mui/material";
import { Dropdown } from "antd";
import React from "react";

const Reviews = () => {
  return (
    <Dropdown
      trigger={["click"]}
      className="account_dropdown"
      placement="bottomLeft"
      overlayClassName="shopcart_root"
      dropdownRender={(menu) => (
        <Box className="comment_container">
          <Box className="comment_wrap">
            {[1, 2, 5].map((item) => {
              return (
                <Box className="comment_item">
                  <Box className="commentor_wrap">
                    <Avatar src="/images/categories/dish.jpg" alt="comment" />
                    <Box className="text_wrap">
                      <Box className="user_name_wrap">
                        <p className="commentor_name">Lindacha</p>
                        <p className="comment_time">• 4 hours</p>
                      </Box>
                      <p className="comment_content">
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Eos adipisci molestiae eligendi atque aspernatur
                        veritatis
                      </p>
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Box>
          <Box className="comment_input">helo</Box>
        </Box>
      )}
    >
      <MapsUgcOutlined className="post_icon" />
    </Dropdown>
  );
};

export default Reviews;
