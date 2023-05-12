import "./App.css";
import Login from "./pages/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import Prototype from "./pages/Prototype";
import Trend from "./pages/Trend";
import Turbine from "./pages/Turbine";
import Logg from "./pages/Logg";
import WaterInflux from "./components/WaterInflux";
import Money from "./components/Money";
import WaterLevel from "./components/WaterLevel";
import EnvironmentCost from "./components/EnvironmentCost";
import { TurbineProvider } from "./components/TurbineProvider";

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
          <Route exact path="/components/Money" element={< Money />} ></Route>
          <Route exact path="/components/WaterLevel" element={< WaterLevel />} ></Route>
          <Route exact path="/components/EnvironmentCost" element={< EnvironmentCost />} ></Route>
        </Routes>
      </div>
      </Router>
    </TurbineProvider>
  );
}

export default App;
