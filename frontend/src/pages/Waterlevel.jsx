import React from 'react';
import WaterContainer from '../components/Waterlevel/WaterContainer';

const Waterlevel = () => {
  const [waterLevel, setWaterLevel] = React.useState(50); // Initial water level

  // Example: Change the water level every second
  React.useEffect(() => {
    const interval = setInterval(() => {
      const newWaterLevel = Math.random() * 100; // Generate a random value between 0 and 100
      setWaterLevel(newWaterLevel);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='dashboard'>
        <div className="Header">
                <div className="nav">
                    <div className="left">
                        <li>
                            <button className="btn">Logg ut</button>
                        </li>
                    </div>
                    <div className="center">
                        <li>
                            <h1 className="dashboard-title">Vannstand</h1>
                        </li>
                    </div>
                    <div className="right">
                        <li>
                            <button className="btn">Profil</button>
                        </li>
                    </div>
                </div>
            </div>
    <WaterContainer waterLevel={waterLevel} />

    </div>
    );
};

export default Waterlevel;