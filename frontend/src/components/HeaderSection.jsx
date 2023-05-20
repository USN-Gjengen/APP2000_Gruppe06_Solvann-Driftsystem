import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HeaderSection = () => {
  const navigate = useNavigate();
  const [logout, setLogout] = React.useState(false);

  React.useEffect(() => {
    if (!localStorage.getItem("auth")) navigate("/login");
  }, [navigate, logout]);

  const logoutHandler = (e) => {
    e.preventDefault();
    localStorage.removeItem("auth");
    setLogout(true);
  };

  return (
    <div className="Header">
      <div className="nav">
        <div className="left">
          <li>
            <button onClick={logoutHandler} className="btn">
              Logg ut
            </button>
          </li>
        </div>
        <div className="center">
              <h1>SOLVANN DRIFTSYSTEM</h1>
          </div>
        <div className="right">
          <li>
            <button className="btn">
                Profil
            </button>
          </li>
        </div>
      </div>
    </div>
  );
};

export default HeaderSection;
