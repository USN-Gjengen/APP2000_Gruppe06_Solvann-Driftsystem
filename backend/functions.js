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

const setAllTurbinesOn = () => {
    setTurbineStatus("8d360792-d4ab-42df-927d-11a8a1c83edc", 1);
    setTurbineStatus("f39090e5-22bf-406f-ab96-7cd8b89180aa", 1);
    setTurbineStatus("ebe242ea-baea-4241-a158-763c429fd495", 1);
    setTurbineStatus("6381c1d6-b347-4afb-9b16-ba17ed239a95", 1);
    setTurbineStatus("abe4c576-0e7f-481b-b48d-ff2cd2b2dffe", 1);
    setTurbineStatus("c061b20b-6dcf-4584-9609-10d7bbaa0be1", 1);
}
const setAllTurbinesOff = () => {
    setTurbineStatus("8d360792-d4ab-42df-927d-11a8a1c83edc", 0);
    setTurbineStatus("f39090e5-22bf-406f-ab96-7cd8b89180aa", 0);
    setTurbineStatus("ebe242ea-baea-4241-a158-763c429fd495", 0);
    setTurbineStatus("6381c1d6-b347-4afb-9b16-ba17ed239a95", 0);
    setTurbineStatus("abe4c576-0e7f-481b-b48d-ff2cd2b2dffe", 0);
    setTurbineStatus("c061b20b-6dcf-4584-9609-10d7bbaa0be1", 0);
}

const setAllTurbinesReverse = () => {
    setTurbineStatus("8d360792-d4ab-42df-927d-11a8a1c83edc", -1);
    setTurbineStatus("f39090e5-22bf-406f-ab96-7cd8b89180aa", -1);
    setTurbineStatus("ebe242ea-baea-4241-a158-763c429fd495", -1);
    setTurbineStatus("6381c1d6-b347-4afb-9b16-ba17ed239a95", -1);
    setTurbineStatus("abe4c576-0e7f-481b-b48d-ff2cd2b2dffe", -1);
    setTurbineStatus("c061b20b-6dcf-4584-9609-10d7bbaa0be1", -1);
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
exports.setTurbineStatus = setTurbineStatus;
exports.setAllTurbinesOn = setAllTurbinesOn;
exports.setAllTurbinesOff = setAllTurbinesOff;
exports.setAllTurbinesReverse = setAllTurbinesReverse;
