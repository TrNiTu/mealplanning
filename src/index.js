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
import InventoryMobile from "./pages/Mobile/Inventory";
import MealsMobile from "./pages/Mobile/Meals";
import StoreMobile from "./pages/Mobile/Store";
import Login from "./pages/Login";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<Router>
		<Routes>
			<Route path="/" element={<Login />} />
			<Route path="/desktop/home" element={<HomeDesktop />} />
			<Route path="/mobile/home" element={<HomeMobile />} />
			<Route path="/mobile/inventory" element={<InventoryMobile />} />
			<Route path="/mobile/meals" element={<MealsMobile />} />
			<Route path="/mobile/store" element={<StoreMobile />} />
			<Route path="*" element={<Navigate to="/" />} />
		</Routes>
	</Router>
);

reportWebVitals(console.log);
