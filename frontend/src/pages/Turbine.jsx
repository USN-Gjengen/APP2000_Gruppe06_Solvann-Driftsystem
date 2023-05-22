import React, { useEffect, useState } from "react";
import TurbineController from "../components/Turbine/TurbineController";
import WaterContainer from "../components/Waterlevel/WaterContainer";


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
				<button className="btn" onClick={handleTurbineForward}>
					<span>Max Forward</span>
				</button>
				<button className="btn" onClick={handleTurbineOff}>
					<span>Turn Off</span>
				</button>
				<button className="btn" onClick={handleTurbineReverse}>
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
