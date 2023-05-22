import React from "react";
import Money from "../components/Graphs/MoneyGraph";
import WaterInflux from "../components/Graphs/WaterInfluxGraph";
import WaterLevelGraph from "../components/Graphs/WaterLevelGraph";
import EnvironmentCost from "../components/Graphs/EnvironmentCostGraph";
const Trend = () => {

    return (

        <div className="trend">
            <div className='boxes'>
                <div className='container2'>
                    <button className="btn-box">
                        <h2>Water Influx</h2>
                        <WaterInflux/>
                    </button>
                </div>
                <div className='container2'>
                    <button className="btn-box">
                        <h2>Money</h2>
                        <Money/>
                    </button>
                </div>
                <div className='container2'>
                    <button className="btn-box">
                        <h2>Water Level</h2>
                        <WaterLevelGraph/>
                    </button>
                </div>
                <div className='container2'>
                    <button className="btn-box">
                        <h2>Environment Cost</h2>
                        <EnvironmentCost/>
                    </button>
                </div>
            </div>
        </div>

    );

}

export default Trend;
