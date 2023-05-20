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
import WaterContainer from "./components/Waterlevel/WaterContainer";

function App() {
  return (
    <TurbineProvider>
      <Router>
        <div className="Appen">
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/Prototype" element={<Prototype />} />
            <Route exact path="/Trend" element={<Trend />} />
            <Route exact path="/Turbine" element={<Turbine />} />
            <Route exact path="/Logg" element={<Logg />} />
            <Route exact path="/Waterlevel" element={<WaterContainer />} />
            <Route exact path="/components/WaterInflux" element={<WaterInflux />} />
            <Route exact path="/components/WaterInfluxDash" element={<WaterInfluxDash />} />
            <Route exact path="/components/Money" element={<Money />} />
            <Route exact path="/components/WaterLevelGraph" element={<WaterLevelGraph />} />
            <Route exact path="/components/EnvironmentCost" element={<EnvironmentCost />} />
            <Route exact path="/components/Turbine/TurbineController" element={<TurbineController />} />
            <Route exact path="/components/Waterlevel/WaterContainer" element={<WaterContainer />} />
          </Routes>
        </div>
      </Router>
    </TurbineProvider>
  );
}

export default App;
