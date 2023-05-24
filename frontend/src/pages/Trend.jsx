import React, { useEffect, useState } from "react";
import Graph from "../components/Graphs/Graph";
const Trend = () => {
    const generateGraphs = (timespan, dateFormat) => {
        return (
            <div className='boxes'>
                <div className='container2'>
                    <button className="btn-box">
                        <h2>Water Influx</h2>
                        <Graph
                            src={`http://${process.env.REACT_APP_FRONTEND_API_ADDRESS}/api/WaterInflux/${timespan}`}
                            title="Water Influx"
                            dateFormat={dateFormat}
                        />
                    </button>
                </div>
                <div className='container2'>
                    <button className="btn-box">
                        <h2>Money</h2>
                        <Graph
                            src={`http://${process.env.REACT_APP_FRONTEND_API_ADDRESS}/api/money/${timespan}`}
                            title="Money"
                            dateFormat={dateFormat}
                        />
                    </button>
                </div>
                <div className='container2'>
                    <button className="btn-box">
                        <h2>Water Level</h2>
                        <Graph
                            src={`http://${process.env.REACT_APP_FRONTEND_API_ADDRESS}/api/waterLevel/${timespan}`}
                            title="Water Level"
                            dateFormat={dateFormat}
                        />
                    </button>
                </div>
                <div className='container2'>
                    <button className="btn-box">
                        <h2>Environment Cost</h2>
                        <Graph
                            src={`http://${process.env.REACT_APP_FRONTEND_API_ADDRESS}/api/environmentCost/${timespan}`}
                            title="Environment Cost"
                            dateFormat={dateFormat}
                        />
                    </button>
                </div>
                <div className='container2'>
                    <button className="btn-box">
                        <h2>Solar Value</h2>
                        <Graph
                            src={`http://${process.env.REACT_APP_FRONTEND_API_ADDRESS}/api/solarvalue/${timespan}`}
                            title="Solar Value"
                            dateFormat={dateFormat}
                        />
                    </button>
                </div>
                <div className='container2'>
                    <button className="btn-box">
                        <h2>Power Price</h2>
                        <Graph
                            src={`http://${process.env.REACT_APP_FRONTEND_API_ADDRESS}/api/powerprice/${timespan}`}
                            title="Power Price"
                            dateFormat={dateFormat}
                        />
                    </button>
                </div>
            </div>
        );
    };

    const [lastHourActive, setLastHourActive] = useState(true);
    const [lastWeekActive, setLastWeekActive] = useState(false);
    const [lastMonthActive, setLastMonthActive] = useState(false);

    const handlePeriodChange = (e) => {
        e.preventDefault();

        if (e.target.innerHTML === "Hour") {
            setLastHourActive(true);
        } else {
            setLastHourActive(false);
        }

        if (e.target.innerHTML === "Week") {
            setLastWeekActive(true);
        } else {
            setLastWeekActive(false);
        }

        if (e.target.innerHTML === "Month") {
            setLastMonthActive(true);
        } else {
            setLastMonthActive(false);
        }

    }

    return (
        <div className="trend">
            <div className="graph-buttons-switch">
                <button className='btn' onClick={handlePeriodChange}>Hour</button>
                <button className='btn' onClick={handlePeriodChange}>Week</button>
                <button className='btn' onClick={handlePeriodChange}>Month</button>
            </div>
            <div className={lastHourActive ? "" : "hidden"}>
                {generateGraphs("lastHour", {
                    hour: "2-digit",
                    minute: "2-digit",
                })}
            </div>
            <div className={lastWeekActive ? "" : "hidden"}>
                {generateGraphs("lastWeek", {
                    weekday: "short",
                })}
            </div>
            <div className={lastMonthActive ? "" : "hidden"}>
                {generateGraphs("lastMonth", {
                    day: "2-digit",
                    month: "short"
                })}
            </div>
        </div>

    );

}

export default Trend;
