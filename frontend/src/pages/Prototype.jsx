import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  } from 'chart.js';
  import { Bar } from "react-chartjs-2";
  
ChartJS.register (CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Prototype = () => {

    const navigate = useNavigate();
    const [isTurbineOn, setIsTurbineOn] = React.useState(false);
    const [logout, setLogout] = React.useState(false);
    const [groupState, setGroupState] = React.useState({ group: [] });


   

    React.useEffect(() => {
        if (!localStorage.getItem("auth")) navigate("/login");
    }, [navigate, logout]);
    
    
    React.useEffect(() => {
        fetch("http://api.solvann.eksempler.no/api/turbines/all", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ isTurbineOn: isTurbineOn })
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


    const [chartData, setChartData] = useState({
        datasets: [],
      });
    const [chartOptions, setChartOptions] = useState({});
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    let waterLevel = [];
    axios
    .get("http://api.solvann.eksempler.no/api/groupstates/last") // get data from api
    .then((res) => { 
        console.log(res.data);
        for (const dataObj of res.data.data) { // loop through data and create new array with only data
            waterLevel.push(parseInt(dataObj.waterLevel));
        }
    })
      useEffect(() => {
        setChartData({
          labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          datasets: [
            {
              label: "Water level",
              data: [52, 43, 15, 65, 53, 43, 32],
              borderColor: "rgba(53, 162, 235)",
              backgroundColor: "rgba(53, 162, 235, 0.4)",
                

            }
          ]
      });
      setChartOptions({
        responsive: true,
        plugins: {
          Legend: {
            position: "top"
          },
          title: {
            display: true,
            text: "Chart.js Bar Chart"
          },
        }
      });
    }, [waterLevel])
   
    
    return (
        
    <html className='html-dashboard'>
        
        
            
        <div className="dashboard">
            <div className="Header">  
                <div className="nav">
                    <div className="left">
                        <li>
                            <button onClick={logoutHandler} className="btn">Logout</button>
                        </li>
                    </div>
                    <div className="center">
                        <li>
                            <h1 className="dashboard-title">Dashboard</h1>
                        </li>
                    </div>
                    <div className="right">
                        <li>
                            <button className="btn">Profile</button>
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
				<button className="btn" onClick={handleUpdate}>
					<span>Update</span>
				</button>
        	</div>

            <div className='main-container'>
                <div className='cards water-level-graph'>
                    <h2>Water level Graph</h2>
                    
                <Bar options={chartOptions} data={chartData}/>
                </div>
                <div className='cards money-graph'>
                    <h2>Money Graph</h2>

                </div>

            </div>
            <div className="data">
                <p>The turbine is currently {isTurbineOn ? "on" : "off"}</p>
                <p>Water level: {groupState.waterLevel} </p>
                <p>Money: {groupState.money}</p>
                <p>Environment Cost: {groupState.environmentCost}</p>
            </div>
        </div>
            
    </html>
    );
};

export default Prototype;