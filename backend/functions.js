const fs = require('fs');
const fetch = require('node-fetch');

let username = "";
let password = "";

try {
    const data = JSON.parse(fs.readFileSync('credentials.json', 'utf8'));
    username = data.solvann.username;
    password = data.solvann.password;
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
    let headers = new Headers();

    headers.set('GroupId',username);
    headers.set('GroupKey',password);
    headers.append('Content-Type', 'text/json');

    fetch('https://solvann.azurewebsites.net/api/GroupState/', {method:'GET',
            headers: headers
        })
        .then(res => res.json())
        .then(data => console.log(data));
}

const getTurbineStatus = () => { 
    let headers = new Headers();
    
    headers.set('GroupId',username);
    headers.set('GroupKey',password);
    headers.append('Content-Type', 'text/json');
    
    fetch('https://solvann.azurewebsites.net/api/Turbines/', {method:'GET',
            headers: headers
           })
            .then(res => res.json())
            .then(data => console.log(data));
    }
    //FIX PLZ
    /*function setTurbineStatus(){
        let headers = new Headers();
        
        headers.set('GroupId',username);
        headers.set('GroupKey',password);
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
