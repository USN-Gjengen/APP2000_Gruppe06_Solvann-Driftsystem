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
	let time = (new Date()).toISOString().replace("T", " ").split(".")[0];
	console.log(time + " : Request received");
	next();
});

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
app.get('/api/groupstates/lastHourWaterLevel', async (req, res) => {
	var start = new Date();
	var end = new Date();
	start.setHours(start.getHours() - 1);
	var states = await dbfunctions.getNAverageWaterLevel(dbfunctions.GroupState, start, end, 12);
	res.json(states);
})
app.get('/api/groupstates/lastHourMoney', async (req, res) => {
	var start = new Date();
	var end = new Date();
	start.setHours(start.getHours() - 1);
	var states = await dbfunctions.getNAverageMoney(dbfunctions.GroupState, start, end, 12);
	res.json(states);
})
app.get('/api/groupstates/lastHourEnvironmentCost', async (req, res) => {
	var start = new Date();
	var end = new Date();
	start.setHours(start.getHours() - 1);
	var states = await dbfunctions.getNAverageEnvironmentCost(dbfunctions.GroupState, start, end, 12);
	res.json(states);
})
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
		var states = await dbfunctions.getDayAverage(dbfunctions.PowerPrice, start, end);
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
		var states = await dbfunctions.getNAverage(dbfunctions.PowerPrice, start, end, 12);
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
		var states = await dbfunctions.getDayAverage(dbfunctions.WaterInflux, start, end);
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
		var states = await dbfunctions.getNAverage(dbfunctions.WaterInflux, start, end, 12);
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
		var states = await dbfunctions.getDayAverage(dbfunctions.SolarValue, start, end);
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
		var states = await dbfunctions.getNAverage(dbfunctions.SolarValue, start, end, 12);
		res.json(states);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

app.put('/api/turbines/all', (req, res) => {
	try {
		if (req.body.isTurbineOn) {
			functions.setAllTurbinesOn();
		} else {
			functions.setAllTurbinesOff();
		}
		res.send();
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

if (process.env.NODE_ENV != "test") {
	cron.schedule('0 * * * * *', async () => {
		dbfunctions.logWaterInflux();
		dbfunctions.logSolarValue();
		dbfunctions.logPowerPrice();
	});

	cron.schedule('0,10,20,30,40,50 * * * * *', async () => {
		await dbfunctions.logGroupState();
		var last = (await dbfunctions.getN(dbfunctions.GroupState, 1))[0];
		//console.log(last.waterLevel);
		if (last.waterLevel > 40) {
			console.log("Turbines on! Level over 40 meters");
			functions.setAllTurbinesOn();
		}
		else if (last.waterLevel < 10) {
			functions.setAllTurbinesOff();
			console.log("Turbines off! Level below 10 meters");
		}
	});
};

const server = app.listen(port, () => {
	console.log(`Solvann listening on port ${port}`);
});


module.exports = server;