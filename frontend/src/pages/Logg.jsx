import React, { useState, useEffect } from "react";
import HeaderSection from "../components/HeaderSection";

const Logg = () => {
  const [log, setLog] = useState([]);

  useEffect(() => {
    const logData = JSON.parse(localStorage.getItem("buttonLog")) || [];
    setLog(logData);
  }, []);

  const handleButtonClick = (e) => {
    const logEntry = {
      timestamp: new Date().toISOString(),
      buttonId: e.target.id,
      buttonText: e.target.innerText,
    };
    setLog([...log, logEntry]);
  };

  const handleClearLog = () => {
    setLog([]);
    localStorage.removeItem("buttonLog");
  };

  useEffect(() => {
    localStorage.setItem("buttonLog", JSON.stringify(log));
  }, [log]);

  return (
    <div className="logg">

      <HeaderSection></HeaderSection>

      <div className="button-container">
        <button id="test" onClick={handleButtonClick}>Button 1</button>
        <button id="clear-log" onClick={handleClearLog}>Clear Log</button>
      </div>
      <ul className="table">
        {log.map((entry, index) => (
          <li key={index}>
            <strong>{entry.timestamp}</strong>: Button ID - {entry.buttonId}, Button Text - {entry.buttonText}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Logg;
