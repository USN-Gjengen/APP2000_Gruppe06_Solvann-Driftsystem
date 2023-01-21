
import React, { useState, useEffect } from 'react';
import { Login } from "./Login.jsx";
import { Register } from "./Register.jsx";
import './App.css';

export default function App() {
  const [currentForm, setCurrentForm] = useState("login");

  const toggleForm = (formName) => {
    setCurrentForm(formName);
    }

  useEffect(() => {
    fetch(`https://datausa.io/api/data?drilldowns=Nation&measures=Population`)
    .then((response) => response.json())
    .then((actualData) => console.log(actualData))
    .catch((err) => {
      console.log(err.message);
      });
  }, []);


  return ( 
  <div className="App">
    {
      currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
    }
  </div>
  );
}
