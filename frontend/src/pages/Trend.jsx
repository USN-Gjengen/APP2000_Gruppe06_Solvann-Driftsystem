import React from "react";
import Money from "../components/Graphs/Money";
import WaterInflux from "../components/Graphs/WaterInflux";
import WaterLevel from "../components/Graphs/WaterLevel";
import EnvironmentCost from "../components/Graphs/EnvironmentCost";
import HeaderSection from "../components/HeaderSection";

const Trend = () => {

    return (

        <div className="dashboard">
        <HeaderSection></HeaderSection>
            
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
                        <WaterLevel></WaterLevel>
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
    