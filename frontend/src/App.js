import Login from "./pages/Login";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import React from "react";
import Trend from "./pages/Trend";
import Turbine from "./pages/Turbine";
import Logg from "./pages/Logg";
import HeaderSection from "./components/HeaderSection";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";


function HeaderSectionFix() {
	const location = useLocation();

	if (location.pathname === "/login") {
		return null; // Hide header for the login page
	}

	return (
		<HeaderSection />
	);
}


function App() {
	return (
		<Router>
			<div className="page">
				<HeaderSectionFix />
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/login" element={<Login />} />
					<Route path="/Dashboard" element={<Dashboard />} />
					<Route path="/Trend" element={<Trend />} />
					<Route path="/Turbine" element={<Turbine />} />
					<Route path="/Logg" element={<Logg />} />
					<Route path="/Innstillinger" element={<Settings />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
