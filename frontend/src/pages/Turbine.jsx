import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TurbineController from "../components/Turbine/TurbineController";


const Turbine = () => {
	const navigate = useNavigate();
	const [logout, setLogout] = React.useState(false);

	React.useEffect(() => {
		if (!localStorage.getItem("auth")) navigate("/login");
	}, [navigate, logout]);

	const logoutHandler = (e) => {
		e.preventDefault();
		localStorage.removeItem("auth");
		setLogout(true);
	};

	const [turbineList, setTurbineList] = useState([]);

	const getTurbines = async () => {
		//const response = await fetch("http://api.solvann.eksempler.no/api/turbines/all", {
		const response = await fetch("http://localhost:21613/api/turbines/all", {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			},
		});

		const data = await response.json();
		return data;
	}

	const handleTurbineOn = (e) => {
		e.preventDefault();

		// Set turbine status and if it's spinning
	};

	const handleTurbineOff = (e) => {
		e.preventDefault();

		// Set turbine status and if it's spinning
	};


	React.useEffect(() => {
		setInterval(async () => {
			let turbines = await getTurbines();
			setTurbineList(turbines.map((turbine) => {

				return (
					<TurbineController 
					key={turbine.id} 
					id={turbine.id} 
					isSpinning={turbine.capacityUsage != 0}
					/>
				)
			}));
		}, 4000);
	}, []);

	return (
		<div className="dashboard">
			<div className="Header">
				<div className="nav">
					<div className="left">
						<li>
							<button onClick={logoutHandler} className="btn">Logg ut</button>
						</li>
					</div>
					<div className="center">
						<li>
							<h1 className="dashboard-title">Turbiner</h1>
						</li>
					</div>
					<div className="right">
						<li>
							<button className="btn">Profil</button>
						</li>
					</div>
				</div>
			</div>


			<div className="button-container">
				<button className="btn" onClick={handleTurbineOn}>
					<span>Turn On</span>
				</button>
				<button className="btn" onClick={handleTurbineOff}>
					<span>Turn Off</span>
				</button>
			</div>

			<div className="turbines-container">
				{turbineList}
			</div>
		</div>

	);
};
export default Turbine;
