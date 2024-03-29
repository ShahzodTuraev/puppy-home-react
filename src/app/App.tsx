import React from "react";
import "../scss/home.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { navbar } from "./lib/navbar";
import Navbar from "./components/navbar";
import NotFound from "../screens/NotFount";

const App = () => {
  return (
    <div className="root_container">
      <BrowserRouter>
        <Routes>
          <Route element={<Navbar />}>
            {navbar.map(({ path, element }, id) => {
              return <Route key={id} path={path} element={element} />;
            })}
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
