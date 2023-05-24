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
                                <div className="sub">Væroversikt for vannstand</div>
                                <div className="title">Værmelding</div>
                                <div className="weather">
                                    <img src="https://www.yr.no/nb/innhold/1-15183/meteogram.svg" alt="Værmelding" className="vær-Desktop"/>
                                    <iframe src="https://www.yr.no/nb/innhold/1-15183/card.html" title="VærmeldingMobil" className="vær-Mobil" style={{ width: '100%', height: '20vh', border: 'none' }}/>
                                </div>
                                
                            </div>
                        </div>

                    </div>

                    <div className="row">
                        <div className='card'>
                            <div className="info trend-Dashboard">
                                <div className="sub">Utforsk siste trender og analyser</div>
                                <Graph 
                                    src={`http://${process.env.REACT_APP_FRONTEND_API_ADDRESS}/api/WaterInflux/lastHour`}
                                    title={`Vanntilstrømming m\u00b3/s`}
                                    />
                                <button className='btn' onClick={handleTrend}>
                                    Åpne alle trender
                                </button>
                            </div>
                        </div>

                        <div className='card'>
                            <div className="info">
                                <div className="sub">Tilpass appen etter dine behov</div>
                                <div className="title">Innstillinger</div>
                                <button className='btn' onClick={handleSettings}>
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