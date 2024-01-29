import { WechatOutlined } from "@ant-design/icons";
import { Send } from "@mui/icons-material";
import { Avatar, Box, Stack } from "@mui/material";
import { Dropdown } from "antd";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { socket } from "../../context/Socket";
import { verifyMemberData } from "../../apiServices/verify";
import { ChatGreetMsg, ChatInfoMsg, ChatMessage } from "../../../types/others";
import { sweetErrorHandling, sweetFailureProvider } from "../../lib/sweetAlert";
import { Definer } from "../../lib/Definer";
import assert from "assert";
import { RippleBadge } from "../../MaterialTheme/styled";
import ScrollToBottom from "react-scroll-to-bottom";
// import { css } from 'emotion';
const NewMessage = (data: any) => {
  if (data.new_message.mb_id === verifyMemberData?._id) {
    return (
      <Box
        flexDirection={"row"}
        sx={{ display: "flex", m: "10px 0" }}
        alignItems={"flex-end"}
        justifyContent={"flex-end"}
      >
        <div className="msg_right">{data.new_message.msg}</div>
      </Box>
    );
  } else {
    return (
      <Box flexDirection={"row"} sx={{ display: "flex", m: "10px 0" }}>
        <Avatar
          src={data.new_message.mb_image}
          alt={data.new_message.mb_nick}
        />
        <div className="msg_left">{data.new_message.msg}</div>
      </Box>
    );
  }
};
const Chatting = () => {
  /*INITIALIZATIONS*/

  const [messageList, setMessageList] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState<number>(0);
  const [message, setMessage] = useState<string>("");
  const textInput: any = useRef(null);
  const socketitem = socket;
  useEffect(() => {
    socketitem.connect();
    socketitem?.on("connect", function () {
      // console.log("CLIENT: connected");
    });

    socketitem?.on("newMsg", (new_message: ChatMessage) => {
      messageList.push(
        // @ts-ignore
        <NewMessage new_message={new_message} key={messageList.length} />
      );
      setMessageList([...messageList]);
    });

    socketitem?.on("greetMsg", (msg: ChatGreetMsg) => {
      messageList.push(
        // @ts-ignore
        <p style={{ textAlign: "center" }}>
          {msg.text}, dear {verifyMemberData?.mb_nick ?? "guest"}
        </p>
      );
      setMessageList([...messageList]);
    });

    socketitem?.on("infoMsg", (msg: ChatInfoMsg) => {
      // console.log("CLIENT: infoMsg");

      setOnlineUsers(msg.total);
    });
    return () => {
      socketitem.disconnect();
    };
  }, [socketitem]);

  // HANDLERS
  const getInputMessageHandler = useCallback(
    (e: any) => {
      const text = e.target.value;
      setMessage(text);
    },
    [message]
  );

  const sendMsgHandler = () => {
    try {
      if (!verifyMemberData) {
        textInput.current.value = "";
        sweetFailureProvider("Please login first!", true);
        return false;
      }
      assert.ok(textInput.current.value, Definer.input_err3);
      textInput.current.value = "";
      socketitem.emit("createMsg", {
        msg: message,
        mb_id: verifyMemberData?._id,
        mb_nick: verifyMemberData?.mb_nick,
        mb_image: verifyMemberData?.mb_image,
      });
      setMessage("");
    } catch (err) {
      console.log("sendMsgHandler, Error:", err);
      sweetErrorHandling(err).then();
    }
  };
  const getKeyHandler = (e: any) => {
    try {
      if (e.key === "Enter") {
        assert.ok(message, Definer.input_err3);
        sendMsgHandler();
      }
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <Dropdown
      trigger={["click"]}
      className="account_dropdown"
      placement="bottomRight"
      overlayClassName="chatting_root"
      dropdownRender={(menu) => (
        <Stack
          sx={{ backgroundImage: "url(/images/mock-img/Painting.jpeg)" }}
          className="chatting_container"
        >
          <Box className="chatting_title">
            <p>Live Chat</p>
            <RippleBadge
              style={{
                position: "absolute",
                top: "22px",
                right: "100px",
                background: "none",
              }}
              badgeContent={onlineUsers}
            />
          </Box>
          <Box className="chatting_main">
            <ScrollToBottom className="ROOT_CSS">
              <Box flexDirection={"row"} sx={{ display: "flex", m: "10px 0" }}>
                <div className="msg_left">Wellcome to Live Chat</div>
              </Box>
              {messageList.filter((ele, index) => index % 2)}
            </ScrollToBottom>
          </Box>
          <Box className="chatting_input">
            <input
              ref={textInput}
              type="text"
              name="message"
              className="msg_input"
              placeholder="Send message"
              onChange={getInputMessageHandler}
              onKeyDown={getKeyHandler}
            />
            <Send onClick={sendMsgHandler} className="send_icon" />
          </Box>
        </Stack>
      )}
    >
      <WechatOutlined className="chat_icon" />
    </Dropdown>
  );
};

export default Chatting;
