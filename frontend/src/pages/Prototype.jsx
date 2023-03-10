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
    
    
   /* React.useEffect(() => {
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
    }, [isTurbineOn]);*/

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

    const [data, setData]= useState({labels:[],datasets:[{}],})

      useEffect(()=>{
        const arr = [];
        fetch('https://jsonplaceholder.typicode.com/comments')
        .then(response=>response.json())
        .then(json => {console.log("json", json)
            json.map((item, index)=>{
                arr.push(item.postId);
                arr.reverse();
            })
            setData({
                labels:["Jan","Feb", "March", "April", "May", "June", "July", "August", "September", "Oct", "Nov", "Dec"],
                datasets:[
                  {
                    label:"First Dataset",
                    data:arr,
                    backgroundColor:'#16ccc6',
                    borderColor:'green',
                    tension:0.4,
                    fill:true,
                    pointStyle:'rect',
                    pointBorderColor:'blue',
                    pointBackgroundColor:'#fff',
                    showLine:true
                  }
                ],
              })}
        )
        console.log("arr", arr)
        

      },[])

    
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