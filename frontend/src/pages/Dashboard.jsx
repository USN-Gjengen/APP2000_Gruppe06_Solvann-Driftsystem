import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Graph from "../components/Graphs/Graph";
import { useTurbineContext } from "../components/Turbine/TurbineProvider";


const Dashboard = () => {
    const navigate = useNavigate();
    const { isTurbineOn } = useTurbineContext();
    const [trend, setTrend] = React.useState(false);
    const [turbine, setTurbine] = React.useState(false);
    const [settings, setSettings] = useState(false);

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
        if (localStorage.getItem("auth") && settings) {
            navigate("/Innstillinger");
        }
    }, [navigate, settings]);


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

    const handleSettings = (e) => {
        e.preventDefault();
        setSettings(true);
    };


    return (
        <div className="dashboard">
            <div className="wrapper">
                <div className="container">

                    <div className="row">
                        <button className="btn-dash" onClick={handleTurbine}>
                            <div className="info">
                                <div className="sub">
                                        Turbin status:{" "}
                                        <span style={{ color: isTurbineOn ? "green" : "red" }}>
                                            {isTurbineOn ? "Aktive" : "Passiv"}
                                        </span>
                                </div>
                                <div className="title">Driftskontroll av vannturbiner</div>

                            </div>
                        </button>

                        <button className='btn-dash-Weather'>
                            <div className="info">
                                <div className="sub">Værmelding</div>
                                <div className="weather">
                                    <img src="https://www.yr.no/nb/innhold/1-15183/meteogram.svg" alt="Værmelding" className="vær-Desktop"/>
                                    <iframe src="https://www.yr.no/nb/innhold/1-15183/card.html" title="VærmeldingMobil" className="vær-Mobil" style={{ width: '100%', height: '50vh', border: 'none' }}/>
                                </div>
                                
                            </div>
                        </button>

                    </div>

                    <div className="row">
                        <button className='btn-dash' onClick={handleTrend}>
                            <div className="info trend-Dashboard">
                                <div className="sub">Utforsk siste trender og analyser</div>
                                <Graph 
                                    src={`http://${process.env.REACT_APP_FRONTEND_API_ADDRESS}/api/WaterInflux/lastHour`}
                                    title={`Vanntilstrømming m\u00b3/s`}
                                    dateFormat = {{
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    }}
                                    />
                            </div>
                        </button>

                        <button className='btn-dash' onClick={handleSettings}>
                            <div className="info">
                                <div className="title">Innstillinger</div>
                                
                            </div>
                        </button>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default Dashboard;