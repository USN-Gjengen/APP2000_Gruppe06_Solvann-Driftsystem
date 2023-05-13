import React, { useState, useEffect } from "react";

export const handleButtonClick = (e, setLog, log) => {
  const logEntry = {
    timestamp: new Date().toISOString(),
    buttonId: e.target.id,
    buttonText: e.target.innerText,
  };
  setLog([...log, logEntry]);
};


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
    
     <ul className="table">
      {log.map((entry, index) => (
        <li key={index}>
          <strong>{entry.timestamp}</strong>: Button ID - {entry.buttonId}, Button Text - {entry.buttonText}
        </li>
      ))}
     </ul>
  );
};

export default Logg;
