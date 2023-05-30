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

/**
 * Gets the current solar value from the external API
 * @returns The current solar value
 */
const getSolarValue = async () => {
    const response = await fetch('https://solvann.azurewebsites.net/api/Solar/');
    const data = await response.json();
    return data;
}

/**
 * Gets the current water influx from the external API
 * @returns The current water influx
 */
const getWaterInflux = async () => {
    const response = await fetch('https://solvann.azurewebsites.net/api/WaterInflux/');
    const data = await response.json();
    return data;
}

/**
 * Gets the current power price from the external API
 * @returns The current power price
 */
const getPowerPrice = async () => {
    const response = await fetch('https://solvann.azurewebsites.net/api/PowerPrice/');
    const data = await response.json();
    return data;
}

/**
 * Gets the current group state from the external API
 * @returns The current group state
 */
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

/**
 * Get the status of all turbines from the external API
 * @returns The status of all turbines
 */
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

/**
 * Get the status of a single turbine from the external API
 * @param {string} id ID of the turbine
 * @returns The status of the turbine
 */
const getSingleTurbineStatus = async (id) => {
    let response = await getTurbineStatus();
    return response.find(turbine => turbine.id === id);
}

/**
 * Sets the effect of all turbines
 * @param {number} flow a number from -1 to 1
 */
const setAllTurbines = async (flow) => {
    let turbines = await getTurbineStatus();
    turbines.forEach(turbine => {
        setTurbineStatus(turbine.id, flow);
    });
}

/**
 * Sets the effect of a single turbine
 * @param {string} id The ID of the turbine
 * @param {number} cap a number from -1 to 1
 */
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
