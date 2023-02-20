import "./App.css";
import Login from "./pages/Login";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import React from "react";
import Prototype from "./pages/Prototype";

function App() {
  return (
    <div className="Appen">
      <BrowserRouter>
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Prototype} />
      </BrowserRouter>
    </div>
  );
}

export default App;
