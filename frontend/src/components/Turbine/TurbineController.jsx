import React, { useState, useEffect } from "react";
import turbineIMG from "../../img/Turbine.png";
import { useSpring, animated, config } from "react-spring";
import { useTurbineContext } from "./TurbineProvider";
import "../../Turbine.css";

const TurbineController = () => {

    const [groupState, setGroupState] = React.useState({ group: [] });
    const { isTurbineOn, setIsTurbineOn } = useTurbineContext();
    const [isSpinning, setIsSpinning] = useState(
        localStorage.getItem("isSpinning") === "true" ? true : false
    );

    const props = useSpring({
        from: { transform: "rotate(0deg)" },
        to: { transform: `rotate(${isSpinning ? 360 : 0}deg)` },
        config: { duration: 1000 },
        reset: true,
        loop: isSpinning,
    });

    const handleTurbineOn = (e) => {
        e.preventDefault();
        setIsTurbineOn(true);
        setIsSpinning(true);
        localStorage.setItem("isSpinning", true);
    };

    const handleTurbineOff = (e) => {
        e.preventDefault();
        setIsTurbineOn(false);
        setIsSpinning(false);
        localStorage.setItem("isSpinning", false);
    };

    return (
        <div>

            <div className="button-container">
                <button className="btn" onClick={handleTurbineOn}>
                    <span>Turn On</span>
                </button>
                <button className="btn" onClick={handleTurbineOff}>
                    <span>Turn Off</span>
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

            <div>
            </div>
        </div>
    );
};
export default TurbineController;