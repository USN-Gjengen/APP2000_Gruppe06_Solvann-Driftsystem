import "./App.css";
import Login from "./pages/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import Trend from "./pages/Trend";
import Turbine from "./pages/Turbine";
import Logg from "./pages/Logg";
import Waterlevel from "./pages/Waterlevel";
import HeaderSection from "./components/HeaderSection";
import Dashboard from "./pages/Dashboard";

function App() {

  return (
    <Router>
      <div className="page">
        <HeaderSection />
        <Routes>
          <Route exact path="/" element={< Login />}></Route>
          <Route exact path="/login" element={< Login />}></Route>
          <Route exact path="/Dashboard" element={< Dashboard />} ></Route>
          <Route exact path="/Trend" element={< Trend />} ></Route>
          <Route exact path="/Turbine" element={< Turbine />} ></Route>
          <Route exact path="/Logg" element={< Logg />} ></Route>
          <Route exact path="/Waterlevel" element={< Waterlevel />} ></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
