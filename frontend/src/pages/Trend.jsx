import React from "react";
import Graph from "../components/Graphs/Graph";
const Trend = () => {

    return (

        <div className="trend">
            <div className='bokser'>
                <div className='trend-Konteiner'>
                        <h2>Vanninfiltrasjon</h2>
                        <Graph
                            src={`http://${process.env.REACT_APP_FRONTEND_API_ADDRESS}/api/WaterInflux/lastHour`}
                            title={`m\u00b3/s`}
                        />
                </div>
                <div className='trend-Konteiner'>
                        <h2>Finansdata</h2>
                        <Graph
                            src={`http://${process.env.REACT_APP_FRONTEND_API_ADDRESS}/api/groupstates/lastHourMoney`}
                            title="NOK"
                        />
                </div>
                <div className='trend-Konteiner'>
                        <h2>Vannstand</h2>
                        <Graph
                            src={`http://${process.env.REACT_APP_FRONTEND_API_ADDRESS}/api/groupstates/lastHourWaterLevel`}
                            title="Meter"
                        />
                </div>
                <div className='trend-Konteiner'>
                        <h2>Miljøkostnad</h2>
                        <Graph
                            src={`http://${process.env.REACT_APP_FRONTEND_API_ADDRESS}/api/groupstates/lastHourEnvironmentCost`}
                            title="NOK"
                        />
                </div>
                <div className='trend-Konteiner'>
                        <h2>Solenergiverdi</h2>
                        <Graph
                            src={`http://${process.env.REACT_APP_FRONTEND_API_ADDRESS}/api/solarvalue/lastHour`}
                            title="kWh/s"
                        />
                </div>
                <div className='trend-Konteiner'>
                        <h2>Strømpris</h2>
                        <Graph
                            src={`http://${process.env.REACT_APP_FRONTEND_API_ADDRESS}/api/powerprice/lastHour`}
                            title="NOK/MWh"
                        />
                </div>
            </div>
        </div>

    );

}

export default Trend;
