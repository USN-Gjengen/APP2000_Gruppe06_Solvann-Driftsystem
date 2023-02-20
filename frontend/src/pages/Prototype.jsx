import React from 'react';
import { useHistory } from 'react-router-dom';

const Prototype = () => {
    const history = useHistory();
    const [isTurbineOn, setIsTurbineOn] = React.useState(false);
    const [logout, setLogout] = React.useState(false);
    const [groupState, setGroupState] = React.useState({ group: [] });

    React.useEffect(() => {
        if (!localStorage.getItem("auth")) history.push("/login");
    }, [logout]);
    
    
    React.useEffect(() => {
        fetch("http://api.solvann.eksempler.no/api/turbines/all", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ isTurbineOn: isTurbineOn })
        })
        .then(response => {
            if (response.ok) {
                this.setState({ isTurbineOn: isTurbineOn });
            } else {
                throw new Error("Failed to turn on the turbine");
            }
        })
        .catch(error => {
            console.error(error);
        });
    }, [isTurbineOn]);

    const handleTurbineOn = (e) => {
        e.preventDefault();
        setIsTurbineOn(true);
    };

    const handleTurbineOff = (e) => {
        e.preventDefault();
        setIsTurbineOn(false);
    };

    const logoutHandler = (e) => {
        e.preventDefault();
        localStorage.removeItem("auth");
        setLogout(true);
    };

    const handleUpdate = async () => {
        var response = await fetch("http://api.solvann.eksempler.no/api/groupstates/last", {
            method: "GET",
            headers: {
            	"Content-Type": "application/json"
            },
        });

        var data = await response.json();
        setGroupState(data);
    };


    return (
        <div className="dashboard">
            <button onClick={logoutHandler} className="btn">
                Logout
            </button>
          	<h1 className="dashboard-title">Dashboard</h1>
          	<div className="button-container">
				<button className="btn" onClick={handleTurbineOn}>
					<span>Turn On</span>
				</button>
				<button className="btn" onClick={handleTurbineOff}>
					<span>Turn Off</span>
				</button>
				<button className="btn" onClick={handleUpdate}>
					<span>Update</span>
				</button>
        	</div>

          	<p>The turbine is currently {isTurbineOn ? "on" : "off"}</p>
			<p>Water level: {groupState.waterLevel} </p>
			<p>Money: {groupState.money}</p>
			<p>Environment Cost: {groupState.environmentCost}</p>
        </div>
    );
};

export default Prototype;