import React from "react";
import Money from "../components/Graphs/Money";
import WaterInflux from "../components/Graphs/WaterInflux";
import WaterLevelGraph from "../components/Graphs/WaterLevelGraph";
import EnvironmentCost from "../components/Graphs/EnvironmentCost";
const Trend = () => {

    return (

        <div className="trend">
            <div className='boxes'>
                <div className='container2'>
                    <button className="btn-box">
                        <WaterInflux></WaterInflux>
                    </button>
                </div>
                <div className='container2'>
                    <button className="btn-box">
                        <Money></Money>
                    </button>
                </div>
                <div className='container2'>
                    <button className="btn-box">
                        <WaterLevelGraph></WaterLevelGraph>
                    </button>
                </div>
                <div className='container2'>
                    <button className="btn-box">
                        <EnvironmentCost></EnvironmentCost>
                    </button>
                </div>
            </div>
        </div>

    );

}

export default Trend;
