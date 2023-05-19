import React, { useState, useEffect } from "react";
import turbineIMG from "../../img/Turbine.png";
import { useSpring, animated, config } from "react-spring";
import { useTurbineContext } from "./TurbineProvider";
import "../../Turbine.css";

const TurbineController = (props) => {
    const from = {
        transform: "rotate(0deg)",
        filter: "invert(100%) sepia(0%) saturate(1000%) hue-rotate(190deg) contrast(50%) drop-shadow(0em 0 10px " + props.color + ")"
    };
    const to = {
        transform: `rotate(${props.isSpinning ? 360 : 0}deg)`,
        filter: "invert(100%) sepia(0%) saturate(1000%) hue-rotate(190deg) contrast(50%) drop-shadow(0em 0 10px " + props.color + ")"
    };

    const style = useSpring({
        from: from,
        to: to,
        config: { duration: 1000 },
        reset: true,
        loop: props.isSpinning,
    });


    return (
        <div>
            <animated.img
                className="turbine"
                style={style}
                src={turbineIMG}
                alt="Turbine"
            />
        </div>
    );
};
export default TurbineController;