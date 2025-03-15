import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./app/App";
import reportWebVitals from "./reportWebVitals";
import "./scss/index.scss";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./app/MaterialTheme";
import Context from "./app/context";
import { BrowserRouter } from "react-router-dom"; // Move BrowserRouter here

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        {" "}
        {/* Wrap everything */}
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Context>
            <App />
          </Context>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();

// import React from "react";
// import { createRoot } from "react-dom/client";
// import { Provider } from "react-redux";
// import { store } from "./app/store";
// import App from "./app/App";
// import reportWebVitals from "./reportWebVitals";
// import "./scss/index.scss";

// import CssBaseline from "@mui/material/CssBaseline";
// import { ThemeProvider } from "@mui/material/styles";
// import theme from "./app/MaterialTheme";
// import Context from "./app/context";
// const container = document.getElementById("root")!;
// const root = createRoot(container);

// root.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <ThemeProvider theme={theme}>
//         <CssBaseline />
//         <Context>
//           <App />
//         </Context>
//       </ThemeProvider>
//     </Provider>
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
