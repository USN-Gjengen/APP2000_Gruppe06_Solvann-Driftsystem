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


const getSolarValue = async () => {
    const response = await fetch('https://solvann.azurewebsites.net/api/Solar/');
    const data = await response.json();
    return data;
}
const getWaterInflux = async () => {
    const response = await fetch('https://solvann.azurewebsites.net/api/WaterInflux/');
    const data = await response.json();
    return data;
}

const getPowerPrice = async () => {
    const response = await fetch('https://solvann.azurewebsites.net/api/PowerPrice/');
    const data = await response.json();
    return data;
}

const getGroupState = async () => {
    let headers = new fetch.Headers();

    headers.set('GroupId', SOLVANN_USR);
    headers.set('GroupKey', SOLVANN_PWD);
    headers.append('Content-Type', 'text/json');

    const response = await fetch('https://solvann.azurewebsites.net/api/GroupState/', {
        method: 'GET',
        headers: headers
    })

    const data = await response.json();
    return data;
}

const getTurbineStatus = async () => {
    let headers = new fetch.Headers();

    headers.set('GroupId', SOLVANN_USR);
    headers.set('GroupKey', SOLVANN_PWD);
    headers.append('Content-Type', 'text/json');

    const response = await fetch('https://solvann.azurewebsites.net/api/Turbines/', {
        method: 'GET',
        headers: headers
    })

    const data = await response.json();
    return data;
}

const getSingleTurbineStatus = async (id) => {
    let response = await getTurbineStatus();
    return response.find(turbine => turbine.id === id);
}

const setAllTurbines = async (flow) => {
    let turbines = await getTurbineStatus();
    turbines.forEach(turbine => {
        setTurbineStatus(turbine.id, flow);
    });
}

const setTurbineStatus = (id, cap) => {
    let headers = new fetch.Headers();

    headers.set('GroupId', SOLVANN_USR);
    headers.set('GroupKey', SOLVANN_PWD);

    fetch('https://solvann.azurewebsites.net/api/Turbines/' + id + '?capacityUsage=' + cap, {
        method: 'PUT',
        headers: headers
    })
        .then(res => console.log(res.status));
}

exports.getWaterInflux = getWaterInflux;
exports.getSolarValue = getSolarValue;
exports.getPowerPrice = getPowerPrice;
exports.getGroupState = getGroupState;
exports.getTurbineStatus = getTurbineStatus;
exports.getSingleTurbineStatus = getSingleTurbineStatus;
exports.setTurbineStatus = setTurbineStatus;
exports.setAllTurbines = setAllTurbines;
