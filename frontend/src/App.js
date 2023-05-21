import "./App.css";
import Login from "./pages/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import Prototype from "./pages/Prototype";
import Trend from "./pages/Trend";
import Turbine from "./pages/Turbine";
import Logg from "./pages/Logg";
import WaterInflux from "./components/Graphs/WaterInflux";
import WaterInfluxDash from "./components/Graphs/WaterInfluxDash";
import Money from "./components/Graphs/Money";
import WaterLevelGraph from "./components/Graphs/WaterLevelGraph";
import EnvironmentCost from "./components/Graphs/EnvironmentCost";
import { TurbineProvider } from "./components/Turbine/TurbineProvider";
import TurbineController from "./components/Turbine/TurbineController";
import HeaderSection from "./components/HeaderSection";

function App() {

  return (
    <TurbineProvider>
      <Router>
      <div className="Appen">
        <Routes>
          <Route exact path="/" element={< Login />}></Route>
          <Route exact path="/login" element={< Login />}></Route>
          <Route exact path="/Prototype" element={< Prototype />} ></Route>
          <Route exact path="/Trend" element={< Trend />} ></Route>
          <Route exact path="/Turbine" element={< Turbine />} ></Route>
          <Route exact path="/Logg" element={< Logg />} ></Route>
          <Route exact path="/components/WaterInflux" element={< WaterInflux />} ></Route>
          <Route exact path="/components/WaterInfluxDash" element={< WaterInfluxDash />} ></Route>
          <Route exact path="/components/Money" element={< Money />} ></Route>
          <Route exact path="/components/WaterLevelGraph" element={< WaterLevelGraph />} ></Route>
          <Route exact path="/components/EnvironmentCost" element={< EnvironmentCost />} ></Route>
          <Route exact path="/components/Turbine/TurbineController" element={< TurbineController />} ></Route>
          <Route exact path="/components/HeaderSection" element={< HeaderSection />} ></Route>
        </Routes>
      </div>
      </Router>
    </TurbineProvider>
  );
}

export default App;
