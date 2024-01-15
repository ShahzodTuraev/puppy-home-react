import React from "react";
import "../scss/home.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { navbar } from "./lib/navbar";
import Navbar from "./components/navbar";

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
          <Route path="*" element={<h1>404 Not Founded</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
