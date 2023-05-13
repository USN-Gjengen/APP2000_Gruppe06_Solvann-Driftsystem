import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TurbineController from "../components/Turbine/TurbineController";


const Turbine = () => {
  const navigate = useNavigate();
  const [logout, setLogout] = React.useState(false);
/*
  const props = useSpring({
    from: { transform: "rotate(0deg)" },
    to: { transform: `rotate(${isSpinning ? 360 : 0}deg)` },
    config: { duration: 1000 },
    reset: true,
    loop: isSpinning,
  });

 */
  React.useEffect(() => {
    if (!localStorage.getItem("auth")) navigate("/login");
  }, [navigate, logout]);

  const logoutHandler = (e) => {
    e.preventDefault();
    localStorage.removeItem("auth");
    setLogout(true);
  };
/*
  React.useEffect(() => {
    fetch("http://api.solvann.eksempler.no/api/turbines/all", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isTurbineOn: isTurbineOn }),
    }).catch((error) => {
      console.error(error);
    });
  }, [isTurbineOn]);

  const handleUpdate = async () => {
    var response = await fetch(
      "http://api.solvann.eksempler.no/api/groupstates/last",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    var data = await response.json();
    setGroupState(data);
  };

  const handleTurbineOn = (e) => {
    e.preventDefault();
    setIsTurbineOn(true);
    setIsSpinning(true);
  };

  const handleTurbineOff = (e) => {
    e.preventDefault();
    setIsTurbineOn(false);
    setIsSpinning(false);
  };*/

  return (
    <div className="dashboard">
      <div className="Header">
            <div className="nav">
            <div className="left">
                                <li>
                                    <button onClick={logoutHandler} className="btn">Logg ut</button>
                                </li>
                            </div>
                        <div className="center">
                                <li>
                                    <h1 className="dashboard-title">Turbiner</h1>
                                </li>
                            </div>
                            <div className="right">
                                <li>
                                    <button className="btn">Profil</button>
                                </li>
                            </div>
                        </div>
        </div>
       <TurbineController/>
      </div>
            
    );
};
export default Turbine;
