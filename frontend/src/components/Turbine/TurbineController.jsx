import React, { useState, useEffect } from "react";
import turbineIMG from "../../img/Turbine.png";
import { useSpring, animated, config } from "react-spring";
import { useTurbineContext } from "./TurbineProvider";
import "../../Turbine.css";

const TurbineController = () => {
    const [isSpinning, setIsSpinning] = useState(false);

    const props = useSpring({
        from: { transform: "rotate(0deg)" },
        to: { transform: `rotate(${isSpinning ? 360 : 0}deg)` },
        config: { duration: 10000 },
        reset: true,
        loop: isSpinning,
    });

    return (
        <div>
            <animated.img
                className="turbine"
                style={props}
                src={turbineIMG}
                alt="Turbine"
            />
        </div>
    );
};
export default TurbineController;