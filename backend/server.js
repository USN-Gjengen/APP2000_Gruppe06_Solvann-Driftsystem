const functions = require('./functions.js');
const dbfunctions = require('./dbfunctions.js');
const mongoose = dbfunctions.connect();
const express = require('express');
const cron = require('node-cron');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 21613;
app.use(cors());
app.use(express.json());


process.on('SIGINT', () => {
	mongoose.connection.close();
});

app.use((req, res, next) => {
	// Before responding to each request, log it in the console with relevant data
	let time = (new Date()).toISOString().replace("T", " ").split(".")[0];
	console.log(`[${req.ip}] ${time} : Request received on "${req.url}"`);
	next();
});

// Basic route to check if the server functions
app.get('/', (req, res) => {
	try {
		res.json({ "working": true });
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

app.get('/api/groupstates/last', async (req, res) => {
	try {
		var states = await dbfunctions.getN(dbfunctions.GroupState, 1);
		res.json(states[0]);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

app.get('/api/groupstates/all', async (req, res) => {
	try {
		var states = await dbfunctions.getAll(dbfunctions.GroupState);
		res.json(states);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

app.get('/api/waterLevel/lastHour', async (req, res) => {
	try {
		var start = new Date();
		var end = new Date();
		start.setHours(start.getHours() - 1);
		var states = await dbfunctions.getNAverage(dbfunctions.GroupState, start, end, "waterLevel", 12);
		res.json(states);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

app.get('/api/money/lastHour', async (req, res) => {
	try {
		var start = new Date();
		var end = new Date();
		start.setHours(start.getHours() - 1);
		var states = await dbfunctions.getNAverage(dbfunctions.GroupState, start, end, "money", 12);
		res.json(states);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

app.get('/api/environmentCost/lastHour', async (req, res) => {
	try {
		var start = new Date();
		var end = new Date();
		start.setHours(start.getHours() - 1);
		var states = await dbfunctions.getNAverage(dbfunctions.GroupState, start, end, "environmentCost", 12);
		res.json(states);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

app.get('/api/waterLevel/lastWeek', async (req, res) => {
	try {
		var start = new Date();
		var end = new Date();
		start.setDate(start.getDate() - 7);
		var states = await dbfunctions.getNAverage(dbfunctions.GroupState, start, end, "waterLevel", 7);
		res.json(states);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

app.get('/api/money/lastWeek', async (req, res) => {
	try {
		var start = new Date();
		var end = new Date();
		start.setDate(start.getDate() - 7);
		var states = await dbfunctions.getNAverage(dbfunctions.GroupState, start, end, "money", 7);
		res.json(states);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

app.get('/api/environmentCost/lastWeek', async (req, res) => {
	try {
		var start = new Date();
		var end = new Date();
		start.setDate(start.getDate() - 7);
		var states = await dbfunctions.getNAverage(dbfunctions.GroupState, start, end, "environmentCost", 7);
		res.json(states);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

app.get('/api/waterLevel/lastMonth', async (req, res) => {
	try {
		var start = new Date();
		var end = new Date();
		start.setDate(start.getDate() - 30);
		var states = await dbfunctions.getNAverage(dbfunctions.GroupState, start, end, "waterLevel", 5);
		res.json(states);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

app.get('/api/money/lastMonth', async (req, res) => {
	try {
		var start = new Date();
		var end = new Date();
		start.setDate(start.getDate() - 30);
		var states = await dbfunctions.getNAverage(dbfunctions.GroupState, start, end, "money", 5);
		res.json(states);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

app.get('/api/environmentCost/lastMonth', async (req, res) => {
	try {
		var start = new Date();
		var end = new Date();
		start.setDate(start.getDate() - 30);
		var states = await dbfunctions.getNAverage(dbfunctions.GroupState, start, end, "environmentCost", 5);
		res.json(states);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

app.get('/api/PowerPrice/all', async (req, res) => {
	try {
		var states = await dbfunctions.getAll(dbfunctions.PowerPrice);
		res.json(states);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

app.get('/api/PowerPrice/last', async (req, res) => {
	try {
		var states = await dbfunctions.getN(dbfunctions.PowerPrice, 1);
		res.json(states[0]);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

app.get('/api/PowerPrice/lastWeek', async (req, res) => {
	try {
		var start = new Date();
		var end = new Date();
		start.setDate(start.getDate() - 7);
		var states = await dbfunctions.getNAverage(dbfunctions.PowerPrice, start, end, "value", 7);
		res.json(states);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

app.get('/api/PowerPrice/lastHour', async (req, res) => {
	try {
		var start = new Date();
		var end = new Date();
		start.setHours(start.getHours() - 1);
		var states = await dbfunctions.getNAverage(dbfunctions.PowerPrice, start, end, "value", 12);
		res.json(states);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

app.get('/api/PowerPrice/lastMonth', async (req, res) => {
	try {
		var start = new Date();
		var end = new Date();
		start.setDate(start.getDate() - 30);
		var states = await dbfunctions.getNAverage(dbfunctions.PowerPrice, start, end, "value", 5);
		res.json(states);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

app.get('/api/WaterInflux/all', async (req, res) => {
	try {
		var states = await dbfunctions.getAll(dbfunctions.WaterInflux);
		res.json(states);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

app.get('/api/WaterInflux/last', async (req, res) => {
	try {
		var states = await dbfunctions.getN(dbfunctions.WaterInflux, 1);
		res.json(states[0]);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

app.get('/api/WaterInflux/lastWeek', async (req, res) => {
	try {
		var start = new Date();
		var end = new Date();
		start.setDate(start.getDate() - 7);
		var states = await dbfunctions.getNAverage(dbfunctions.WaterInflux, start, end, "value", 7);
		res.json(states);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

app.get('/api/WaterInflux/lastHour', async (req, res) => {
	try {
		var start = new Date();
		var end = new Date();
		start.setHours(start.getHours() - 1);
		var states = await dbfunctions.getNAverage(dbfunctions.WaterInflux, start, end, "value", 12);
		res.json(states);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

app.get('/api/WaterInflux/lastMonth', async (req, res) => {
	try {
		var start = new Date();
		var end = new Date();
		start.setDate(start.getDate() - 30);
		var states = await dbfunctions.getNAverage(dbfunctions.WaterInflux, start, end, "value", 5);
		res.json(states);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

app.get('/api/SolarValue/all', async (req, res) => {
	try {
		var states = await dbfunctions.getAll(dbfunctions.SolarValue);
		res.json(states);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

app.get('/api/SolarValue/last', async (req, res) => {
	try {
		var states = await dbfunctions.getN(dbfunctions.SolarValue, 1);
		res.json(states[0]);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

app.get('/api/SolarValue/lastWeek', async (req, res) => {
	try {
		var start = new Date();
		var end = new Date();
		start.setDate(start.getDate() - 7);
		var states = await dbfunctions.getNAverage(dbfunctions.SolarValue, start, end, "value", 7);
		res.json(states);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

app.get('/api/SolarValue/lastHour', async (req, res) => {
	try {
		var start = new Date();
		var end = new Date();
		start.setHours(start.getHours() - 1);
		var states = await dbfunctions.getNAverage(dbfunctions.SolarValue, start, end, "value", 12);
		res.json(states);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

app.get('/api/SolarValue/lastMonth', async (req, res) => {
	try {
		var start = new Date();
		var end = new Date();
		start.setDate(start.getDate() - 30);
		var states = await dbfunctions.getNAverage(dbfunctions.SolarValue, start, end, "value", 5);
		res.json(states);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

app.get('/api/turbines/all', async (req, res) => {
	try {
		var states = await functions.getTurbineStatus();
		res.json(states);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

app.put('/api/turbines/all', (req, res) => {
	try {
		functions.setAllTurbines(req.body.capacity);
		res.send();
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

app.get('/api/turbine/:id', async (req, res) => {
	try {
		var states = await functions.getSingleTurbineStatus(req.params.id);
		res.json(states);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

app.put('/api/turbine/:id', (req, res) => {
	try {
		functions.setTurbineStatus(req.params.id, req.body.capacity);
		res.send();
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

// Only log values if not in test mode (it will keep the test alive forever)
if (process.env.NODE_ENV != "test") {
	// Log values every minute
	cron.schedule('0 * * * * *', async () => {
		dbfunctions.logWaterInflux();
		dbfunctions.logSolarValue();
		dbfunctions.logPowerPrice();
	});

	// Log group state every 10 seconds
	cron.schedule('0,10,20,30,40,50 * * * * *', async () => {
		await dbfunctions.logGroupState();
		var waterLevel = (await dbfunctions.getN(dbfunctions.GroupState, 1))[0];
		var powerPrice = (await dbfunctions.getN(dbfunctions.PowerPrice, 1))[0];
		var powerPriceMedian = await dbfunctions.getMedian(dbfunctions.PowerPrice);

		// If water level is above 40 meters, turn on all turbines
		if (waterLevel.waterLevel > 40) {
			console.log("Turbines on! Level over 40 meters");
			functions.setAllTurbines(1);
		}
		// If water level is below 10 meters, turn off all turbines
		else if (waterLevel.waterLevel < 10) {
			functions.setAllTurbines(0);
			console.log("Turbines off! Level below 10 meters");
		}
		// If we're within the safe limits, execute the purchase strategy
		else {
			// Good price!
			if (powerPrice.value > powerPriceMedian * 1.3) {
				console.log("Turbines on! Niceprice!");
				functions.setAllTurbines(1);
			}
			// Bad price!
			else if (powerPrice.value < powerPriceMedian * 0.7) {
				console.log("Turbines off! Badprice!");
				functions.setAllTurbines(0);
			}
		}
	});
};

// Start server and log what port it listens on
const server = app.listen(port, () => {
	console.log(`Solvann listening on port ${port}`);
});


module.exports = server;