import { Avatar, Box, Button, Container, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import "../../scss/account.scss";
import { AddAPhoto } from "@mui/icons-material";
import { Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { verifyMemberData } from "../../app/apiServices/verify";
import assert from "assert";
import { Definer } from "../../app/lib/Definer";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../app/lib/sweetAlert";
import MemberApiService from "../../app/apiServices/memberApiService";
import { useLocation } from "react-router-dom";
const AccountPage = () => {
  // INITIALIZATIONS
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
  const [file, setFile] = useState(verifyMemberData?.mb_image);
  const [memberUpdate, setMemberUpdate] = useState<any>({
    mb_nick: "",
    mb_description: "",
    mb_address: "",
    mb_image: "",
    mb_phone: "",
    mb_email: "",
  });
  // HANDLERS
  const changeMemberNickHandler = (e: any) => {
    memberUpdate.mb_nick = e.target.value;
    setMemberUpdate({ ...memberUpdate });
  };
  const changeMemberPhoneHandler = (e: any) => {
    memberUpdate.mb_phone = e.target.value;
    setMemberUpdate({ ...memberUpdate });
  };
  const changeMemberEmailHandler = (e: any) => {
    memberUpdate.mb_email = e.target.value;
    setMemberUpdate({ ...memberUpdate });
  };
  const changeMemberDeskHandler = (e: any) => {
    memberUpdate.mb_description = e.target.value;
    setMemberUpdate({ ...memberUpdate });
  };
  const changeMemberAddressHandler = (e: any) => {
    memberUpdate.mb_address = e.target.value;
    setMemberUpdate({ ...memberUpdate });
  };

  const handleImagePreviewer = (e: any) => {
    try {
      const file = e.target.files[0];
      const fileType = file["type"],
        validTypes = ["image/jpg", "image/jpeg", "image/png"];
      assert.ok(validTypes.includes(fileType) && file, Definer.input_err2);
      memberUpdate.mb_image = file;
      setMemberUpdate({ ...memberUpdate });
      setFile(URL.createObjectURL(file));
    } catch (err) {
      console.log(`ERROR ::: handleImagePreviewer ${err}`);
      sweetErrorHandling(err).then();
    }
  };

  const handleSubmitButton = async (e: any) => {
    try {
      const memberService = new MemberApiService();
      const result = await memberService.updateMemberData(memberUpdate);
      assert.ok(result, Definer.general_err1);
      await sweetTopSmallSuccessAlert(
        "Information modified successfully",
        700,
        false
      );
      window.location.reload();
    } catch (err) {
      console.log(`ERROR ::: handleSubmitButton ${err}`);
      sweetErrorHandling(err).then();
    }
  };
  return (
    <Container className="account_container">
      <h2 className="main_title">Profile Settings</h2>
      <Stack className="main_wrapper">
        <Box className="sidebar">
          <Box className="avatar_wrap">
            <Avatar className="user_avatar" src={file} alt="user" />
            <Button
              className="add_img_btn"
              onChange={handleImagePreviewer}
              component="label"
              style={{ minWidth: "0" }}
            >
              <AddAPhoto className="add_icon" />
              <input type="file" hidden />
            </Button>
          </Box>
          <p className="user_name">{verifyMemberData?.mb_nick}</p>
          <p className="user_type">User</p>
        </Box>
        <Box className="mainbar">
          <p className="input_label">User name</p>
          <Input
            size="large"
            placeholder={verifyMemberData?.mb_nick}
            className="text_field"
            onChange={changeMemberNickHandler}
          />
          <p className="input_label">Email address</p>
          <Input
            onChange={changeMemberEmailHandler}
            size="large"
            placeholder={verifyMemberData?.mb_email}
            className="text_field"
          />
          <p className="input_label">Phone number</p>
          <Input
            size="large"
            onChange={changeMemberPhoneHandler}
            placeholder={verifyMemberData?.mb_phone}
            className="text_field"
          />
          <p className="input_label">Address</p>
          <Input
            placeholder={verifyMemberData?.mb_address}
            size="large"
            className="text_field"
            onChange={changeMemberAddressHandler}
          />
          <p className="input_label">User description</p>
          <TextArea
            showCount
            maxLength={1000}
            onChange={changeMemberDeskHandler}
            className="text_field"
            placeholder={verifyMemberData?.mb_description}
            style={{ height: 120, resize: "none" }}
          />
          <Box className="btn_wrap">
            <Button onClick={handleSubmitButton} className="form_submit_btn">
              Submit
            </Button>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default AccountPage;
