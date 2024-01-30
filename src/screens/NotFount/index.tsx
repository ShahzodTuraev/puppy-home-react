import { Button } from "@mui/material";
import React from "react";
import "../../scss/notFound.scss";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  /*INITIALIZATIONS*/
  const navigate = useNavigate();
  return (
    <div className="nf_container">
      <img src="/images/mock-img/notfound.jpg" alt="notfound" />
      <Button onClick={() => navigate("/")} className="nf_btn">
        Go Back
      </Button>
    </div>
  );
};

export default NotFound;
