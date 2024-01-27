import { CloudUpload } from "@mui/icons-material";
import { Box, Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import CommunityApiService from "../../app/apiServices/communityApiService";
import { serverApi } from "../../app/lib/config";
import assert from "assert";
import { Definer } from "../../app/lib/Definer";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../app/lib/sweetAlert";

const CreatePost = ({ setOpen, setArtRebuild }: any) => {
  /*INITIALIZATIONS*/
  const [img, setImg] = useState<string>("/images/mock-img/postBack.jpg");
  const [subject, setSubject] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [data, setData] = useState<any>({ art_subject: "", art_content: "" });
  //HANDLERS
  const subjectHandler = (e: any) => {
    setSubject(e.target.value);
    data.art_subject = e.target.value;
    setData({ ...data });
  };
  const contentHandler = (e: any) => {
    setContent(e.target.value);
    data.art_content = e.target.value;
    setData({ ...data });
  };
  const handleImagePreviewer = (e: any) => {
    try {
      const file = e.target.files[0];
      const fileType = file["type"],
        validTypes = ["image/jpg", "image/jpeg", "image/png"];
      assert.ok(validTypes.includes(fileType) && file, Definer.input_err2);
      data.art_image = file;
      setData({ ...data });
      setImg(URL.createObjectURL(file));
    } catch (err) {
      console.log(`ERROR ::: handleImagePreviewer ${err}`);
      sweetErrorHandling(err).then();
    }
  };

  const handleSubmitButton = async () => {
    try {
      const memberService = new CommunityApiService();
      const result = await memberService.createBoArticle(data);
      assert.ok(result, Definer.general_err1);
      setOpen(false);
      setArtRebuild(new Date());
      await sweetTopSmallSuccessAlert("Post created successfully", 700, false);
    } catch (err) {
      console.log(`ERROR ::: handleSubmitButton ${err}`);
      sweetErrorHandling(err).then();
    }
  };
  return (
    <Stack className="modal_content">
      <h4>Create Post</h4>
      <TextField
        id="outlined-basic"
        label="Post Subject"
        variant="outlined"
        value={subject}
        className="input_subject"
        onChange={subjectHandler}
      />
      <TextField
        id="outlined-multiline-static"
        label="Post Content"
        multiline
        rows={6}
        value={content}
        className="input_content"
        onChange={contentHandler}
      />
      <Box className="upload_box">
        <p className="upload_title">Upload image</p>
        <Button
          onChange={handleImagePreviewer}
          component="label"
          style={{ minWidth: "0" }}
        >
          <CloudUpload className="img_icon" />
          <input type="file" hidden />
        </Button>
        <img src={img} className="image_box" alt="post" />
      </Box>
      <Button onClick={handleSubmitButton} className="create_btn">
        submit
      </Button>
    </Stack>
  );
};

export default CreatePost;
