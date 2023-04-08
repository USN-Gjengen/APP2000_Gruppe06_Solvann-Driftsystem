import React, {useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Turbine = () => {
    
        const navigate = useNavigate();
        const [logout, setLogout] = React.useState(false);
        const [groupState, setGroupState] = React.useState({ group: [] });
    
        React.useEffect(() => {
            if (!localStorage.getItem("auth")) navigate("/login");
        }, [navigate, logout]);
    
        const logoutHandler = (e) => {
            e.preventDefault();
            localStorage.removeItem("auth");
            setLogout(true);
        };
    
        const handleUpdate = async () => {
            var response = await fetch("http://api.solvann.eksempler.no/api/groupstates/last", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            });
            var data = await response.json();
            setGroupState(data);
        };
    
    return (
    
        <div className="dashboard">
            <div className="Header">
                <div className="nav">
                    <div className="left">
                        <li>
                            <button onClick={logoutHandler} className="btn">Logout</button>
                        </li>
                    </div>
                    <div className="center">
                        <li>
                            <h1 className="dashboard-title">Dashboard</h1>
                        </li>
                    </div>
                    <div className="right">
                        <li>
                            <button className="btn">Profile</button>
                        </li>
                    </div>
                </div>
            </div>
        </div>
            
    );
};
export default Turbine;
