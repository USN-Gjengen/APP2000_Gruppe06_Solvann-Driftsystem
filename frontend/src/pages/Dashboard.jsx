import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import WaterInfluxDash from "../components/Graphs/WaterInfluxDash";
import { useTurbineContext } from "../components/Turbine/TurbineProvider";


const Dashboard = () => {
    const navigate = useNavigate();
    const { isTurbineOn } = useTurbineContext();
    const [trend, setTrend] = React.useState(false);
    const [turbine, setTurbine] = React.useState(false);
    const [logg, setLogg] = React.useState(false);
    const [waterlevel, setWaterlevel] = useState(false);

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
        if (localStorage.getItem("auth") && waterlevel) {
            navigate("/Waterlevel");
        }
    }, [navigate, waterlevel]);


    React.useEffect(() => {
        fetch("http://" + process.env.REACT_APP_FRONTEND_API_ADDRESS + "/api/turbines/all", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ isTurbineOn: isTurbineOn }),
        }).catch((error) => {
            console.error(error);
        });
    }, [isTurbineOn]);

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

    const handleWaterLevel = (e) => {
        e.preventDefault();
        setWaterlevel(true);
    };


    return (
        <div className="dashboard">
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
                                <button className="btn" onClick={handleWaterLevel}>
                                    Åpne Vannstand
                                </button>
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
                                <WaterInfluxDash></WaterInfluxDash>
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

export default Dashboard;