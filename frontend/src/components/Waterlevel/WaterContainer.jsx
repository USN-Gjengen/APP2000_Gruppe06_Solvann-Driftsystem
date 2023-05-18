import React from 'react';

const WaterContainer = ({ waterLevel }) => {
  return (
    <div className="water-container">
      <div className="water" style={{ height: `${waterLevel}%` }}></div>
    </div>
  );
};

export default WaterContainer;