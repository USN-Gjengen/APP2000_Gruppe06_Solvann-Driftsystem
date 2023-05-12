import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Line } from "react-chartjs-2";
import WaterInflux from "../components/WaterInflux";
import { useTurbineContext } from "../components/TurbineProvider";
import logLogo from "../img/log.png";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  LineElement,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
} from "chart.js";
ChartJS.register(
  Title,
  Tooltip,
  LineElement,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler
);

const Prototype = () => {
        const navigate = useNavigate();
        const { isTurbineOn, setIsTurbineOn } = useTurbineContext();
        const [logout, setLogout] = React.useState(false);
        const [groupState, setGroupState] = React.useState({ group: [] });
        const [trend, setTrend] = React.useState(false);
        const [turbine, setTurbine] = React.useState(false);
        const [logg, setLogg] = React.useState(false);

        React.useEffect(() => {
            if (!localStorage.getItem("auth")) navigate("/login");
        }, [navigate, logout]);

        React.useEffect(() => {
            if (localStorage.getItem("auth") && trend) {
            navigate("/Trend");
            }
        }, [navigate, trend]);

        React.useEffect(() => {
            if (localStorage.getItem("auth") && turbine) {
            navigate("/Turbine");
            }
        }, [navigate, turbine]);

        React.useEffect(() => {
            if (localStorage.getItem("auth") && logg) {
            navigate("/Logg");
            }   
        }, [navigate, logg]);

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
        
        const logoutHandler = (e) => {
            e.preventDefault();
            localStorage.removeItem("auth");
            setLogout(true);
        };

        const handleTrend = (e) => {
            e.preventDefault();
            setTrend(true);
        };

        const handleTurbine = (e) => {
            e.preventDefault();
            setTurbine(true);
        };

        const handleLogg = (e) => {
            e.preventDefault();
            setLogg(true);
        };

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

    return (
        <div className="dashboard">
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
                    <li>
                    <h1 className="dashboard-title">Solvann Driftsystem</h1>
                    </li>
                </div>
                <div className="right">
                    <li>
                    <button className="btn">Profil</button>
                    </li>
                </div>
                </div>
            </div>
            
                <div className="wrapper">
                    
                    <div className="container">

                        <div className="row">
                            <div className="card">
                                <div className="info">
                                <div className="sub"><div>
                                        Turbin status:{" "}
                                            <span style={{ color: isTurbineOn ? "green" : "red" }}>
                                                        {isTurbineOn ? "Aktive" : "Passiv"}
                                            </span>
                                        </div></div>
                                <div className="title">Driftskontroll av vannturbiner</div>
            
                                    <button className="btn" onClick={handleTurbine}>
                                        Åpne Driftskontroll
                                    </button>

                                </div>
                            </div>
                            
                            <div className="card">
                                <div className="info">
                                <div className="sub">Vannstandskontroll</div>
                                <div className="title">Nivåindikator</div>
                                    <button className="btn">Åpne Vannstand</button>
                                </div>
                            </div>

                            <div className="card">
                                <div className="info">
                                <div className="sub">Væroversikt for vannstand</div>
                                <div className="title">Værmelding</div>
                                    <button className="btn">Åpne Vær</button>
                                </div>
                            </div>
                            
                        </div>

                        <div className="row">
                            <div className='card'>
                            <div className="info">
                                <div className="sub">Utforsk siste trender og analyser</div>
                                <div className="title">Trender</div>
                                <WaterInflux></WaterInflux>
                                    <button className='btn' onClick={handleTrend}>
                                        Åpne alle trender
                                    </button>
                                </div>
                            </div>

                            <div className='card'>
                                <div className="info">
                                <div className="sub">Oversikt over tidligere logging</div>
                                <div className="title">Logging Historikk</div>
                                    <button className='btn' onClick={handleLogg}>
                                        Åpne logging historikk
                                    </button>
                                </div>
                            </div>

                            <div className='card'>
                                <div className="info">
                                <div className="sub">Tilpass appen etter dine behov</div>
                                <div className="title">Innstillinger</div>
                                    <button className='btn'>
                                        Åpne Innstillinger
                                    </button>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
        </div>
    );
};

export default Prototype;