import React, {useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSpring, animated, config } from "react-spring";
import turbineIMG from "../img/Turbine.png";
import "../Turbine.css";

const Turbine = () => {
    
        const navigate = useNavigate();
        const [logout, setLogout] = React.useState(false);
        const [groupState, setGroupState] = React.useState({ group: [] });
        const [isTurbineOn, setIsTurbineOn] = React.useState(false);
        const [isSpinning, setIsSpinning] = useState(false);

        const props = useSpring({
            from: { transform: "rotate(0deg)" },
            to: { transform: `rotate(${isSpinning ? 360 : 0}deg)` },
            config: { duration: 1000 },
            reset: true,
            loop: isSpinning,
        });


        React.useEffect(() => {
            if (!localStorage.getItem("auth")) navigate("/login");
        }, [navigate, logout]);
    
        const logoutHandler = (e) => {
            e.preventDefault();
            localStorage.removeItem("auth");
            setLogout(true);
        };

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

        const handleTurbineOn = (e) => {
            e.preventDefault();
            setIsTurbineOn(true);
            setIsSpinning(true);
        };

        const handleTurbineOff = (e) => {
            e.preventDefault();
            setIsTurbineOn(false);
            setIsSpinning(false);
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
                <div className="button-container">
                    <button className="btn" onClick={handleTurbineOn}>
                        <span>Turn On</span>
                    </button>
                    <button className="btn" onClick={handleTurbineOff}>
                        <span>Turn Off</span>
                    </button>
                    <button className="btn" onClick={handleUpdate}>
                        <span>Update</span>
                    </button>

                </div>
                <div>
                    Turbin status:{" "}
                    <span style={{ color: isTurbineOn ? "green" : "red" }}>
                        {isTurbineOn ? "Aktive" : "Passiv"}
                    </span>
                </div>
                <div className="turbines-container">
                    <animated.img
                        className="turbine"
                        style={props}
                        src={turbineIMG}
                        alt="Turbine"
                        />
                    <animated.img
                        className="turbine"
                        style={props}
                        src={turbineIMG}
                        alt="Turbine"
                        />
                    <animated.img
                        className="turbine"
                        style={props}
                        src={turbineIMG}
                        alt="Turbine"
                        />
                </div>
            </div>
            
    );
};
export default Turbine;
