import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();
  const [logg, setLogg] = React.useState(false);

  React.useEffect(() => {
      if (localStorage.getItem("auth") && logg) {
          navigate("/Logg");
      }
  }, [navigate, logg]);

  const handleLogPage = (e) => {
    e.preventDefault();
    setLogg(true);
  };

  return (
    <div className="settings">
      <div className="button-container">
        <button id="log" onClick={handleLogPage}>Logg</button>
      </div>
    </div>
  );
};

export default Settings;
