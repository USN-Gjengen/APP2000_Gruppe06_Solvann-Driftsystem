const functions = require('./functions.js');
const mongoose = require('mongoose');
require('dotenv').config();

let DB_USR = "";
let DB_PWD = "";

try {
	DB_USR = process.env.DATABASE_USERNAME;
	DB_PWD = process.env.DATABASE_PASSWORD;
} catch (err) {
	console.error(err);
}

const connect = async () => {
	console.log("Connecting to database...");
	mongoose.set('strictQuery', true);
	await mongoose.connect('mongodb://' + DB_USR + ':' + DB_PWD + '@eksempler.no:37191/?authMechanism=DEFAULT');
	switch (mongoose.connection.readyState) {
		case 0:
			console.log("Error! Database is disconnected");
			break;
		case 1:
			console.log("Database successfully connected!");
			break;
		case 2:
			if (process.env.NODE_ENV != "test") {
				console.log("Error! Database is still connecting");
			}
			break;
		case 3:
			if (process.env.NODE_ENV != "test") {
				console.log("Error! Database is trying to disconnect");
			}
			break;
	}

	return mongoose;
}

const powerSchema = new mongoose.Schema({
	price: Number,
	date: Date,
});
const PowerPrice = mongoose.model('PowerPrice', powerSchema);

const logPowerPrice = async () => {
	await functions.getPowerPrice().then(price => {
		console.log(price);
		const power = new PowerPrice({ price: price, date: Date.now() });
		power.save();
	});
}

const solarSchema = new mongoose.Schema({
	value: Number,
	date: Date,
});
const SolarValue = mongoose.model('SolarValue', solarSchema);

const logSolarValue = async () => {
	await functions.getSolarValue().then(value => {
		console.log(value);
		const solar = new SolarValue({ value: value, date: Date.now() });
		solar.save();
	});
}

const waterInfluxSchema = new mongoose.Schema({
	waterInflux: Number,
	date: Date,
});
const WaterInflux = mongoose.model('WaterInflux', waterInfluxSchema);

const logWaterInflux = async () => {
	await functions.getWaterInflux().then(waterInflux => {
		console.log(waterInflux);
		const influx = new WaterInflux({ waterInflux: waterInflux, date: Date.now() });
		influx.save();
	});
}

const groupStateSchema = new mongoose.Schema({
	money: Number,
	date: Date,
	waterLevel: Number,
	environmentCost: Number
});
const GroupState = mongoose.model('GroupState', groupStateSchema);

const logGroupState = async () => {
	await functions.getGroupState().then(gs => {
		const state = new GroupState({ money: gs.money, date: Date.now(), waterLevel: gs.waterLevel, environmentCost: gs.environmentCost });
		state.save();
	});
	//mongoose.connection.close();
}

const getN = async (document, n) => {
	const cursor = document.find({}).
	limit(n).
  	sort({ date: -1 }).
  	cursor();
	var rv = [];
	for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
		rv.push(doc);
		console.log(doc);
	}
	return rv;
}
const getMonth = async (document,date) => {
    const date1 = new Date(date.getFullYear(), date.getMonth(), 1);
    const date2 = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return getPeriod(document, date1, date2);
}
const getDay = async (document,date) => {
    const date1 = new Date(date.getFullYear(), date.getMonth(), date.getDate());
	const date2 = new Date(date.getFullYear(), date.getMonth(), date.getDate()+1);
   /* getPeriod(document, date1, date2).then(result => {console.log(result[result.length-1]);
		console.log(result[0]);
	});*/
	return getPeriod(document, date1, date2);
} 
const getPeriod = async (document,date1, date2) => {
	const cursor = document.find({}).
	where('date').gte(date1).lte(date2).
  	sort({ date: -1 }).
  	cursor();
	var rv = [];
	for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
		//console.log(doc);
		rv.push(doc);
	}
	return rv;
}
const getAll = async (document) => {
	const cursor = document.find({}).cursor();
	var rv = [];
	for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
		rv.push(doc);
	}
	return rv;
}
const getAvgDay = async (document,date1, date2) => {
  const average = await document.aggregate([
    { $match: { date: {
		$gte: date1, 
		$lte: date2
	} } },
    { $group: { _id: null, average: { $avg: '$value' } } },
  ]).exec();
	console.log(average);
  return average;
}

exports.connect = connect;
exports.logPowerPrice = logPowerPrice;
exports.logSolarValue = logSolarValue;
exports.logWaterInflux = logWaterInflux;
exports.logGroupState = logGroupState;
exports.getAll = getAll;
exports.getN = getN;
exports.getMonth = getMonth;
exports.getDay = getDay;
exports.getPeriod = getPeriod;
exports.getAvgDay = getAvgDay;
exports.GroupState = GroupState;
exports.PowerPrice = PowerPrice;
exports.WaterInflux = WaterInflux;
exports.SolarValue = SolarValue;