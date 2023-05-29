import React, { useState, useEffect } from 'react';
import waterTank from '../../img/waterTank.png';
import "../../styles/WaterLevel.css"


const WaterContainer = () => {
  const [waterLevel, setWaterLevel] = useState(0);
  const maxWaterLevel = 50; // Maximum water level value in your data


  const fetchWaterLevel = async () => {
    try {
      const response = await fetch(
        "http://" + process.env.REACT_APP_FRONTEND_API_ADDRESS + "/api/groupStates/last"
      );
      const jsonData = await response.json();

      if (typeof jsonData === 'object' && jsonData !== null) {
        const waterLevel = jsonData.waterLevel;
        setWaterLevel(waterLevel);
      } else {
        console.error('Error: jsonData is not an object', jsonData);
      }

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchWaterLevel();
    const interval = setInterval(() => {
      fetchWaterLevel();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Calculate the height as a percentage of the maximum value
  const waterHeight = (waterLevel / maxWaterLevel) * 100;

  return (
    <div className="WaterContainer">
      <div className='waterTank-container'>

        <div className="water-container">
          <div
            className="water"
            style={{ height: `${waterHeight}%` }}
          >
          </div>
        </div>
        <img src={waterTank} alt="water tank" className="water-tank" />

      </div>


      <div className="water-level-text">
        {waterLevel.toFixed(2)
          .replace('.', ',')} m
      </div>
    </div>
  );
};

export default WaterContainer;
