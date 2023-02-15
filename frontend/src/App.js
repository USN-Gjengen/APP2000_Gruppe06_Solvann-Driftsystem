import "./App.css";
import Login from "./pages/Login";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import React from "react";


class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isTurbineOn: false
    };
  }

  handleTurbineOn = () => {
   
    fetch("http://solvann.eksempler.no/api/turbines/all", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ isTurbineOn: true })
    })
      .then(response => {
        if (response.ok) {
          this.setState({ isTurbineOn: true });
        } else {
          throw new Error("Failed to turn on the turbine");
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  handleTurbineOff = () => {
    
    fetch("http://solvann.eksempler.no/api/turbines/all", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ isTurbineOn: false })
    })
      .then(response => {
        if (response.ok) {
          this.setState({ isTurbineOn: false });
        } else {
          throw new Error("Failed to turn off the turbine");
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  
  render() {
    return (
      <div className="dashboard">
        <h1 className="dashboard-title">Dashboard</h1>
        <div className="button-container">
          <button className="btn" onClick={this.handleTurbineOn}>
            <span>Turn On</span>
          </button>
          <button className="btn" onClick={this.handleTurbineOff}>
            <span>Turn Off</span>
          </button>
        </div>
        <p>The turbine is currently {this.state.isTurbineOn ? "on" : "off"}</p>
      </div>
    );
  }
}

function App() {
  return (
    <div className="Appen">
      <BrowserRouter>
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Dashboard} />
      </BrowserRouter>
    </div>
  );
}

export default App;
