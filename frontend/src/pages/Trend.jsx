import React from "react";
import Graph from "../components/Graphs/Graph";
import GraphLastWeek from "../components/Graphs/GraphLastWeek";
const Trend = () => {

    return (

        <div className="trend">
            <div className='boxes'>
                <div className='container2'>
                    <button className="btn-box">
                        <h2>Water Influx</h2>
                        <Graph
                            src={`http://${process.env.REACT_APP_FRONTEND_API_ADDRESS}/api/WaterInflux/lastHour`}
                            title="Water Influx"
                        />
                    </button>
                </div>
                <div className='container2'>
                    <button className="btn-box">
                        <h2>Money</h2>
                        <Graph
                            src={`http://${process.env.REACT_APP_FRONTEND_API_ADDRESS}/api/groupstates/lastHourMoney`}
                            title="Money"
                        />
                    </button>
                </div>
                <div className='container2'>
                    <button className="btn-box">
                        <h2>Water Level</h2>
                        <Graph
                            src={`http://${process.env.REACT_APP_FRONTEND_API_ADDRESS}/api/groupstates/lastHourWaterLevel`}
                            title="Water Level"
                        />
                    </button>
                </div>
                <div className='container2'>
                    <button className="btn-box">
                        <h2>Environment Cost</h2>
                        <Graph
                            src={`http://${process.env.REACT_APP_FRONTEND_API_ADDRESS}/api/groupstates/lastHourEnvironmentCost`}
                            title="Environment Cost"
                        />
                    </button>
                </div>
                <div className='container2'>
                    <button className="btn-box">
                        <h2>Solar Value</h2>
                        <Graph
                            src={`http://${process.env.REACT_APP_FRONTEND_API_ADDRESS}/api/solarvalue/lastHour`}
                            title="Solar Value"
                        />
                    </button>
                </div>
                <div className='container2'>
                    <button className="btn-box">
                        <h2>Power Price</h2>
                        <Graph
                            src={`http://${process.env.REACT_APP_FRONTEND_API_ADDRESS}/api/powerprice/lastHour`}
                            title="Power Price"
                        />
                    </button>
                </div>
                <div className='container2'>
                    <button className="btn-box">
                        <h2>Power Price Week</h2>
                        <GraphLastWeek
                            src={`http://${process.env.REACT_APP_FRONTEND_API_ADDRESS}/api/powerprice/lastWeek`}
                            title="Power Price Week"
                        />
                    </button>
                </div>
            </div>
        </div>

    );

}

export default Trend;
