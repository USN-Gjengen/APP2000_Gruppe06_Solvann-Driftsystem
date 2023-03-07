const functions = require('./functions.js');
const dbfunctions = require('./dbfunctions.js');
const express = require('express');
const cron = require('node-cron');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 21613;
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
	res.json({ "working": true });
	console.log("Request received");
})

app.get('/api/groupstates/last', async (req, res) => {
	var states = await dbfunctions.getAll(dbfunctions.GroupState);
	res.json(states[states.length - 1]);
	console.log("Request received");
})
app.get('/api/groupstates/all', async (req, res) => {
	var states = await dbfunctions.getAll(dbfunctions.GroupState);
	res.json(states);
	console.log("Request received");
})
app.get('/api/PowerPrice/all', async (req, res) => {
	var states = await dbfunctions.getAll(dbfunctions.PowerPrice);
	res.json(states);
	console.log("Request received");
})
app.get('/api/PowerPrice/last', async (req, res) => {
	var states = await dbfunctions.getAll(dbfunctions.PowerPrice);
	res.json(states[states.length - 1]);
	console.log("Request received");
})
app.get('/api/WaterInflux/all', async (req, res) => {
	var states = await dbfunctions.getAll(dbfunctions.WaterInflux);
	res.json(states);
	console.log("Request received");
})
app.get('/api/WaterInflux/last', async (req, res) => {
	var states = await dbfunctions.getAll(dbfunctions.WaterInflux);
	res.json(states[states.length - 1]);
	console.log("Request received");
})
app.get('/api/SolarValue/all', async (req, res) => {
	var states = await dbfunctions.getAll(dbfunctions.SolarValue);
	res.json(states);
	console.log("Request received");
})
app.get('/api/SolarValue/last', async (req, res) => {
	var states = await dbfunctions.getAll(dbfunctions.SolarValue);
	res.json(states[states.length - 1]);
	console.log("Request received");
})

app.put('/api/turbines/all', (req, res) => {
	if (req.body.isTurbineOn) {
		functions.setAllTurbinesOn();
	} else {
		functions.setAllTurbinesOff();
	}

	res.send();
})

if (process.env.NODE_ENV != "test") {
	cron.schedule('0 * * * * *', async () => {
		dbfunctions.logWaterInflux();
		dbfunctions.logSolarValue();
		dbfunctions.logPowerPrice();
	});

	cron.schedule('0,10,20,30,40,50 * * * * *', async () => {
		dbfunctions.logGroupState();
	});
}

const server = app.listen(port, () => {
	console.log("Heisann");
	console.log(`Example app listening on port ${port}`);
});


module.exports = server;