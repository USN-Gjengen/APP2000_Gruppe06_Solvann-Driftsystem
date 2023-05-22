import React from 'react';
import WaterContainer from '../components/Waterlevel/WaterContainer';

const Waterlevel = () => {

  return (
    <div className="waterLevel">
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
    <WaterContainer />

    </div>
    );
};

export default Waterlevel;