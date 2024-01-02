import { Container } from "@mui/material";
import React from "react";
import "./css/home.scss";

const App = () => {
  return (
    <Container className="container">
      <div className="box1">
        <p className="text1">Text1</p>
      </div>
      <div className="box2">
        <p className="text2">Text2</p>
      </div>
    </Container>
  );
};

export default App;
