const fetch = require('node-fetch');
require('dotenv').config();

let SOLVANN_USR = "";
let SOLVANN_PWD = "";

try {
    SOLVANN_USR = process.env.SOLVANN_USERNAME;
    SOLVANN_PWD = process.env.SOLVANN_PASSWORD;
  } catch (err) {
    console.error(err);
  }


  const getSolarValue = () => { 
    fetch('https://solvann.azurewebsites.net/api/Solar/')
    .then(res => res.json())
    .then(data => console.log(data));
}
const getWaterInflux = () => { 
    fetch('https://solvann.azurewebsites.net/api/WaterInflux/')
    .then(res => res.json())
    .then(data => console.log(data));
}

const getPowerPrice = () => { 
    fetch('https://solvann.azurewebsites.net/api/PowerPrice')
    .then(res => res.json())
    .then(data => console.log(data));
}

const getGroupState = () => { 
    let headers = new fetch.Headers();

    headers.set('GroupId', SOLVANN_USR);
    headers.set('GroupKey', SOLVANN_PWD);
    headers.append('Content-Type', 'text/json');

    fetch('https://solvann.azurewebsites.net/api/GroupState/', {method:'GET',
            headers: headers
        })
        .then(res => res.json())
        .then(data => console.log(data));
}

const getTurbineStatus = () => { 
    let headers = new fetch.Headers();
    
    headers.set('GroupId', SOLVANN_USR);
    headers.set('GroupKey', SOLVANN_PWD);
    headers.append('Content-Type', 'text/json');
    
    fetch('https://solvann.azurewebsites.net/api/Turbines/', {method:'GET',
            headers: headers
           })
            .then(res => res.json())
            .then(data => console.log(data));
    }
    //FIX PLZ
    /*function setTurbineStatus(){
        let headers = new fetch.Headers();
        
        headers.set('GroupId', SOLVANN_USR);
        headers.set('GroupKey', SOLVANN_PWD);
        headers.append('Content-Type', 'text/json');
        
        fetch('https://solvann.azurewebsites.net/api/Turbines/', {method:'PUT',
                headers: headers
               })
                .then(res => res.json())
                .then(data => console.log(data));
        }*/

exports.getWaterInflux = getWaterInflux;
exports.getSolarValue = getSolarValue;
exports.getPowerPrice = getPowerPrice;
exports.getGroupState = getGroupState;
exports.getTurbineStatus = getTurbineStatus;
//exports.setTurbineStatus = setTurbineStatus;
