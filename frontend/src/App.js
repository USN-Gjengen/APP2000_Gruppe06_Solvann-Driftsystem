
import React, { useState } from 'react';
import { Login } from "./Login.jsx";
import { Register } from "./Register.jsx";
import './App.css';

export default function App() {
  const [currentForm, setCurrentForm] = useState("login");

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }


  return ( 
  <div className="App">
    {
      currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
    }
  </div>
  );
}
