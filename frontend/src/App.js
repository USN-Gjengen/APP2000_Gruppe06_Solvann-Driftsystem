import "./App.css";
import login from "./pages/login";
import { BrowserRouter, Route} from "react-router-dom";
import React from "react";
import Prototype from "./pages/Prototype";

function App() {
  return (
    <div className="Appen">
      <BrowserRouter>
        <Route exact path="/login" component={login} />
        <Route exact path="/" component={Prototype} />
      </BrowserRouter>
    </div>
  );
}

export default App;
