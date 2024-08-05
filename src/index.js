import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import HomeDesktop from "./pages/Desktop/Home";
import HomeMobile from "./pages/Mobile/Home";
import Login from "./pages/Login";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/Desktop/Home" element={<HomeDesktop />} />
      <Route exact path="/Mobile/Home" element={<HomeMobile />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
