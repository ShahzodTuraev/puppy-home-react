import React, { useEffect, useState } from "react";
import "../../../scss/navbar.scss";
import { Avatar, Badge, Box, Button, IconButton } from "@mui/material";
import { Close, Notifications } from "@mui/icons-material";
import { Dropdown } from "antd";
// REDUX
import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setNotifications } from "./slice";
import { retrieveNotifications } from "./selector";
import { Notification } from "../../../types/notification";
import NotificationApiService from "../../apiServices/notificationApiService";
import Moment from "react-moment";
import { serverApi } from "../../lib/config";
import { sweetErrorHandling } from "../../lib/sweetAlert";
// REDUX SLICE
const actionDispatch = (dispatch: Dispatch) => ({
  setNotifications: (data: Notification[]) => dispatch(setNotifications(data)),
});
// REDUX SELECTOR
const notificationsRetriever = createSelector(
  retrieveNotifications,
  (notifications) => ({
    notifications,
  })
);
const NotificationPart = () => {
  /*INITIALIZATIONS*/
  const [notifRebuild, setNotifRebuild] = useState<Date>(new Date());
  const { setNotifications } = actionDispatch(useDispatch());
  const { notifications } = useSelector(notificationsRetriever);
  useEffect(() => {
    const notificationService = new NotificationApiService();
    notificationService
      .getMyNotifications()
      .then((data) => setNotifications(data))
      .catch((err) => console.log(err));
  }, [notifRebuild]);

  /*HANDLERS*/
  const deleteOneHandler = async (e: any) => {
    try {
      const data = { id: e.target.id };

      const notificationService = new NotificationApiService();
      await notificationService.removeMyNotifications(data);

      setNotifRebuild(new Date());
    } catch (err) {
      console.log("payHandler, ERROR:", err);
      sweetErrorHandling(err).then();
    }
  };
  return (
    <Dropdown
      className="account_dropdown"
      placement="bottomRight"
      overlayClassName="notifcart_root"
      dropdownRender={(menu) => (
        <Box className="notifcart_container">
          <p className="notif_header">Notification</p>
          <Box className="message_container">
            {notifications.map((message) => {
              const image_path = `${serverApi}/${message.sender_data?.mb_image}`;
              return (
                <Box className="message_box">
                  <Avatar src={image_path} alt="sender" />
                  <Box className="content_wrap">
                    <p className="user_name">
                      {message?.sender_data?.mb_type.toLowerCase()}
                    </p>
                    <p className="message_subject">{message?.notif_subject}</p>
                    <p className="message_content">{message?.notif_content}</p>
                    <p className="message_time">
                      <Moment format="YYYY-MM-DD hh:mm">
                        {message?.createdAt}
                      </Moment>
                    </p>
                    <Close
                      id={message._id}
                      onClick={deleteOneHandler}
                      className="message_close"
                    />
                  </Box>
                </Box>
              );
            })}
          </Box>
          <Button id="all" onClick={deleteOneHandler} className="notif_button">
            Make all as read
          </Button>
        </Box>
      )}
    >
      <Badge
        badgeContent={notifications.length}
        color="primary"
        className="badge"
      >
        <IconButton className="icon_box cart_icon">
          <Notifications className="icon" />
        </IconButton>
      </Badge>
    </Dropdown>
  );
};

export default NotificationPart;
