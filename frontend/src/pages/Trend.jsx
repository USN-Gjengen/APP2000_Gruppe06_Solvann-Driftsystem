import React, { useEffect, useState } from "react";
import Graph from "../components/Graphs/Graph";
const Trend = () => {
	const generateGraphs = (timespan, dateFormat) => {
		return (
			<div className='boxes'>
				<div className='trend-Container'>
					<h2>Vanntilstrømming</h2>
					<Graph
						src={`http://${process.env.REACT_APP_FRONTEND_API_ADDRESS}/api/WaterInflux/${timespan}`}
						title={`m\u00b3/s`}
						dateFormat={dateFormat}
					/>
				</div>
				<div className='trend-Container'>
					<h2>Finans</h2>
					<Graph
						title="NOK"
						src={`http://${process.env.REACT_APP_FRONTEND_API_ADDRESS}/api/money/${timespan}`}
						dateFormat={dateFormat}
					/>
				</div>
				<div className='trend-Container'>
					<h2>Vannstand</h2>
					<Graph
						title="Meter"
						src={`http://${process.env.REACT_APP_FRONTEND_API_ADDRESS}/api/waterLevel/${timespan}`}
						dateFormat={dateFormat}
					/>
				</div>
				<div className='trend-Container'>
					<h2>Miljøkostnad</h2>
					<Graph
						title="NOK"
						src={`http://${process.env.REACT_APP_FRONTEND_API_ADDRESS}/api/environmentCost/${timespan}`}
						dateFormat={dateFormat}
					/>
				</div>
				<div className='trend-Container'>
					<h2>Solenergiverdi</h2>
					<Graph
						title="kWh/s"
						src={`http://${process.env.REACT_APP_FRONTEND_API_ADDRESS}/api/solarvalue/${timespan}`}
						dateFormat={dateFormat}
					/>
				</div>
				<div className='trend-Container'>
					<h2>Strømpris</h2>
					<Graph
						title="NOK/MWh"
						src={`http://${process.env.REACT_APP_FRONTEND_API_ADDRESS}/api/powerprice/${timespan}`}
						dateFormat={dateFormat}
					/>
				</div>
			</div>
		);
	};

	const [lastHourActive, setLastHourActive] = useState(true);
	const [lastWeekActive, setLastWeekActive] = useState(false);
	const [lastMonthActive, setLastMonthActive] = useState(false);

	const handlePeriodChange = (e) => {
		e.preventDefault();

		if (e.target.innerHTML === "Time") {
			setLastHourActive(true);
		} else {
			setLastHourActive(false);
		}

		if (e.target.innerHTML === "Uke") {
			setLastWeekActive(true);
		} else {
			setLastWeekActive(false);
		}

		if (e.target.innerHTML === "Måned") {
			setLastMonthActive(true);
		} else {
			setLastMonthActive(false);
		}

	}

	return (
		<div className="trend">
			<div className="graph-buttons-switch">
				<button className='btn' onClick={handlePeriodChange}>Time</button>
				<button className='btn' onClick={handlePeriodChange}>Uke</button>
				<button className='btn' onClick={handlePeriodChange}>Måned</button>
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
