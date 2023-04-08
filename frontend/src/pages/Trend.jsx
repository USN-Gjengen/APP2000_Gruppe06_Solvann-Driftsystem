import React, {useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Money from "../components/Money";
import WaterInflux from "../components/WaterInflux";
import WaterLevel from "../components/WaterLevel";
import EnvironmentCost from "../components/EnvironmentCost";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement, Filler } from "chart.js";
ChartJS.register(Title, Tooltip, LineElement, 
    Legend, CategoryScale, LinearScale, PointElement, Filler);

const Trend = () => {

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
            <div className='boxes'>
                <div className='container'>
                    <button className="btn-box">
                        <WaterInflux></WaterInflux>
                    </button>
                </div>
                <div className='container'>
                    <button className="btn-box">
                        <Money></Money>
                    </button>
                </div>
                <div className='container'>
                    <button className="btn-box">
                        <WaterLevel></WaterLevel>
                    </button>
                </div>
                <div className='container'>
                    <button className="btn-box">
                        <EnvironmentCost></EnvironmentCost>
                    </button>
                </div>
            </div>
        </div>
    
    );

}

export default Trend;
    