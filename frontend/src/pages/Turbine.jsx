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
		const response = await fetch("http://api.solvann.eksempler.no/api/turbines/all", {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			},
		});

		const data = await response.json();
		return data;
	}

	const setTurbines = async (capacity) => {
		const response = await fetch("http://api.solvann.eksempler.no/api/turbines/all", {
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

			<div className="turbines-container">
				{turbineList}
			</div>
		</div>

	);
};
export default Turbine;
