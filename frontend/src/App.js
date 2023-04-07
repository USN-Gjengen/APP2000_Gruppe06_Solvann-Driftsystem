import "./App.css";
import Login from "./pages/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import Prototype from "./pages/Prototype";
import Trend from "./pages/Trend";

function App() {

  return (
    <Router>
    <div className="Appen">
      <Routes>
        <Route exact path="/" element={< Login />}></Route>
        <Route exact path="/login" element={< Login />}></Route>
        <Route exact path="/Prototype" element={< Prototype />} ></Route>
        <Route exact path="/Trend" element={< Trend />} ></Route>
      </Routes>
    </div>
    </Router>
  );
}

export default App;
