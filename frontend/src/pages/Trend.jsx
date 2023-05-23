import React from "react";
import Graph from "../components/Graphs/Graph";
const Trend = () => {

    return (

        <div className="trend">
            <div className='bokser'>
                <div className='trend-Konteiner'>
                        <h2>Water Influx</h2>
                        <Graph
                            src={`http://${process.env.REACT_APP_FRONTEND_API_ADDRESS}/api/WaterInflux/lastHour`}
                            title="Water Influx"
                        />
                </div>
                <div className='trend-Konteiner'>
                        <h2>Money</h2>
                        <Graph
                            src={`http://${process.env.REACT_APP_FRONTEND_API_ADDRESS}/api/groupstates/lastHourMoney`}
                            title="Money"
                        />
                </div>
                <div className='trend-Konteiner'>
                        <h2>Water Level</h2>
                        <Graph
                            src={`http://${process.env.REACT_APP_FRONTEND_API_ADDRESS}/api/groupstates/lastHourWaterLevel`}
                            title="Water Level"
                        />
                </div>
                <div className='trend-Konteiner'>
                        <h2>Environment Cost</h2>
                        <Graph
                            src={`http://${process.env.REACT_APP_FRONTEND_API_ADDRESS}/api/groupstates/lastHourEnvironmentCost`}
                            title="Environment Cost"
                        />
                </div>
                <div className='trend-Konteiner'>
                        <h2>Solar Value</h2>
                        <Graph
                            src={`http://${process.env.REACT_APP_FRONTEND_API_ADDRESS}/api/solarvalue/lastHour`}
                            title="Solar Value"
                        />
                </div>
                <div className='trend-Konteiner'>
                        <h2>Power Price</h2>
                        <Graph
                            src={`http://${process.env.REACT_APP_FRONTEND_API_ADDRESS}/api/powerprice/lastHour`}
                            title="Power Price"
                        />
                </div>
            </div>
        </div>

    );

}

export default Trend;
