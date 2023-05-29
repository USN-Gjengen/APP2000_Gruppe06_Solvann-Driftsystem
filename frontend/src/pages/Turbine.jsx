import React, { useEffect, useState } from "react";
import TurbineController from "../components/Turbine/TurbineController";
import WaterContainer from "../components/Waterlevel/WaterContainer";
import "../styles/Turbine.css";
import "../styles/App.css";



const Turbine = () => {

	const [turbineList, setTurbineList] = useState([]);

	const getTurbines = async () => {
		const response = await fetch("http://" + process.env.REACT_APP_FRONTEND_API_ADDRESS + "/api/turbines/all", {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			},
		});

		const data = await response.json();
		return data;
	}

	const setTurbines = async (capacity) => {
		const response = await fetch("http://" + process.env.REACT_APP_FRONTEND_API_ADDRESS + "/api/turbines/all", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				capacity: capacity
			})
		});
	}

	const handleTurbineForward = (e) => {
		e.preventDefault();

		setTurbines(1);
	};

	const handleTurbineOff = (e) => {
		e.preventDefault();

		setTurbines(0);
	};

	const handleTurbineReverse = (e) => {
		e.preventDefault();

		setTurbines(-1);
	};


	React.useEffect(() => {
		const makeTurbines = async () => {
			let turbines = await getTurbines();
			setTurbineList(turbines.map((turbine) => {
				let red = "00";
				let green = "00";

				if (turbine.capacityUsage > 0) {
					green = Math.floor(0xFF * turbine.capacityUsage);
				}

				if (turbine.capacityUsage < 0) {
					red = Math.floor(255 * turbine.capacityUsage * -1);
				}

				return (
					<TurbineController
						key={turbine.id}
						isSpinning={turbine.capacityUsage != 0}
						color={"#" + red.toString(16) + green.toString(16) + "00"}
					/>
				)
			}));
		}


		makeTurbines();
		setInterval(async () => {
			makeTurbines();
		}, 5000);
	}, []);

	return (
		<div className="turbinePage">
			<div className="button-container">
				<button className="btn" onClick={handleTurbineForward} style={{background:"linear-gradient(90deg, #00ff00 0%, transparent 45%, transparent 55%, #00ff00 100%)",}}>
					<span>Max Forward</span>
				</button>
				<button className="btn" onClick={handleTurbineOff}  style={{background:"linear-gradient(90deg, #ff0d00 0%, transparent 45%, transparent 55%, #ff0d00	 100%)",}}>
					<span>Turn Off</span>
				</button>
				<button className="btn" onClick={handleTurbineReverse} style={{background:"linear-gradient(50deg, #faa49d 20%, transparent 45%, transparent 55%, #faa49d 100%)",}}>
					<span>Max Reverse</span>
				</button>
			</div>

			<div className="turbinePageContent">
				<div>
					<div className="turbines-container">
						{turbineList}
					</div>
				</div>

				<div className="waterLevel-container">
					<WaterContainer />
				</div>
			</div>
		</div>

	);
};
export default Turbine;
