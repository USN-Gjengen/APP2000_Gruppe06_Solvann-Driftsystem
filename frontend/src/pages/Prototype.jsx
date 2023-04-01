import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import {Chart as ChartJS, Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement, Filler} from 'chart.js';
ChartJS.register(
  Title, Tooltip, LineElement, Legend,
  CategoryScale, LinearScale, PointElement, Filler
)
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

    const [money, setMoney] = useState({
        labels: [],
        datasets: [
            {
                label: "Money",
                data: [],
                backgroundColor: "#16ccc6",
                borderColor: "green",
                tension: 0.4,
                fill: true,
                pointStyle: "rect",
                pointBorderColor: "blue",
                pointBackgroundColor: "#fff",
                showLine: true,
            },
        ],
    });

    const [data, setData] = useState({
        labels: [],
        datasets: [
          {
            label: "Water level",
            data: [],
            backgroundColor: "#16ccc6",
            borderColor: "green",
            tension: 0.4,
            fill: true,
            pointStyle: "rect",
            pointBorderColor: "blue",
            pointBackgroundColor: "#fff",
            showLine: true,
          },
        ],
      });

      const generateTimeLabels = (minutesInterval, numberOfLabels) => {
        const now = new Date();
        const labels = [];

        for (let i = 0; i < numberOfLabels; i++) {
            const time = new Date(now.getTime() - i * minutesInterval * 60000);
            const formattedTime = time.toLocaleDateString("en-GB", {
                timeZone: 'Europe/Oslo',
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
            });
            labels.unshift(formattedTime);
        }

        return labels;
      };
      
      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(
              "http://api.solvann.eksempler.no/api/groupstates/last"
            );
            const jsonData = await response.json();
      
            if (typeof jsonData === "object" && jsonData !== null) {
              const waterLevel = jsonData.waterLevel;
              const labels = generateTimeLabels(5, 12); // updates labels every 5 minutes
      
              setData((prevState) => ({
                ...prevState,
                labels: labels,
                datasets: [
                  {
                    ...prevState.datasets[0],
                    data: [...prevState.datasets[0].data, waterLevel],
                  },
                ],
              }));
            } else {
              console.error("Error: jsonData is not an object", jsonData);
            }
          } catch (error) {
            console.error(error);
          }
        };
      
        fetchData();


        const interval = setInterval(() => {
            fetchData(); // make this update every 5 minutes
        }, 300000); // 5 Minutes

        return () => clearInterval(interval);

      }, []);


      useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    "http://api.solvann.eksempler.no/api/groupstates/last"
                );
                const jsonData = await response.json();

                if (typeof jsonData === "object" && jsonData !== null) {
                    const money = jsonData.money;
                    const labels = generateTimeLabels(5, 12); // updates labels every 5 minutes

                    setMoney((prevState) => ({
                        ...prevState,
                        labels: labels,
                        datasets: [
                            {
                                ...prevState.datasets[0],
                                data: [...prevState.datasets[0].data, money],
                            },
                        ],
                    }));
                } else {
                    console.error("Error: jsonData is not an object", jsonData);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();


        const interval = setInterval(() => {
            fetchData(); // make this update every 5 minutes
        }, 300000); // 5 Minutes
        
        return () => clearInterval(interval);

    }, []);



    return (

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
                    <Line data={data}></Line>
                </div>
                <div className='cards money-graph'>
                    <h2>Money Graph</h2>
                    <Line data={money}></Line>

                </div>

            </div>
            <div className="data">
                <p>The turbine is currently {isTurbineOn ? "on" : "off"}</p>
                <p>Water level: {groupState.waterLevel} </p>
                <p>Money: {groupState.money}</p>
                <p>Environment Cost: {groupState.environmentCost}</p>
            </div>

        </div>
            
    
    );
};

export default Prototype;