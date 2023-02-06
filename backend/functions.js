import fs from 'fs';

let username = "";
let password = "";

try {
    const data = JSON.parse(fs.readFileSync('credentials.json', 'utf8'));
    username = data.username;
    password = data.password;
  } catch (err) {
    console.error(err);
  }


function getSolarValue() { 
    fetch('https://solvann.azurewebsites.net/api/Solar/')
    .then(res => res.json())
    .then(data => console.log(data));
}
function getWaterInflux() { 
    fetch('https://solvann.azurewebsites.net/api/WaterInflux/')
    .then(res => res.json())
    .then(data => console.log(data));
}

function getPowerPrice(){ 
    fetch('https://solvann.azurewebsites.net/api/PowerPrice')
    .then(res => res.json())
    .then(data => console.log(data));
}

function getGroupState(){
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
function getTurbineStatus(){
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

export { getWaterInflux };
export { getSolarValue }; 
export { getPowerPrice };
export { getGroupState };
export { getTurbineStatus };
//export { turnOnTurbine };
