import React, { useState, useEffect } from "react";
import turbineIMG from "../../img/Turbine.png";
import { useSpring, animated, config } from "react-spring";
import { useTurbineContext } from "./TurbineProvider";
import "../../Turbine.css";

const TurbineController = (props) => {
    const style = useSpring({
        from: { transform: "rotate(0deg)" },
        to: { transform: `rotate(${props.isSpinning ? 360 : 0}deg)` },
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