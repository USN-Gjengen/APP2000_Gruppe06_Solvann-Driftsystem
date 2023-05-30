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

/**
 * Establishes a connection with the database
 * @returns "Mongoose connection"
 */
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
	value: Number,
	date: Date,
});
const PowerPrice = mongoose.model('PowerPrice', powerSchema);

/**
 * Logs the current power price to the database
 */
const logPowerPrice = async () => {
	await functions.getPowerPrice().then(value => {
		const power = new PowerPrice({ value: value, date: Date.now() });
		power.save();
	});
}

const solarSchema = new mongoose.Schema({
	value: Number,
	date: Date,
});
const SolarValue = mongoose.model('SolarValue', solarSchema);

/**
 * Logs the current solar value to the database
 */
const logSolarValue = async () => {
	await functions.getSolarValue().then(value => {
		const solar = new SolarValue({ value: value, date: Date.now() });
		solar.save();
	});
}

const waterInfluxSchema = new mongoose.Schema({
	value: Number,
	date: Date,
});
const WaterInflux = mongoose.model('WaterInflux', waterInfluxSchema);

/**
 * Logs the current water influx to the database
 */
const logWaterInflux = async () => {
	await functions.getWaterInflux().then(value => {
		const influx = new WaterInflux({ value: value, date: Date.now() });
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

/**
 * Logs the current group state (money, water level, and environment cost) to the database
 */
const logGroupState = async () => {
	await functions.getGroupState().then(gs => {
		const state = new GroupState({ money: gs.money, date: Date.now(), waterLevel: gs.waterLevel, environmentCost: gs.environmentCost });
		state.save();
	});
}

/**
 * 
 * @param {Schema} schema What schema to search in
 * @param {number} n Amount of documents to get
 * @returns The n latest values
 */
const getN = async (schema, n) => {
	const cursor = schema.find({}).
		limit(n).
		sort({ date: -1 }).
		cursor();
	var rv = [];
	for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
		rv.push(doc);
	}

	return rv;
}

/**
 * 
 * @param {Schema} schema What schema to search in
 * @param {Date} date A datetime inside the month you want to get
 * @returns All values in the month
 */
const getMonth = async (schema, date) => {
	const date1 = new Date(date.getFullYear(), date.getMonth(), 1);
	const date2 = new Date(date.getFullYear(), date.getMonth() + 1, 0);

	return getPeriod(schema, date1, date2);
}

/**
 * 
 * @param {Schema} schema What schema to search in
 * @param {Date} date A datetime inside the day you want to get
 * @returns All values in the day
 */
const getDay = async (schema, date) => {
	const date1 = new Date(date.getFullYear(), date.getMonth(), date.getDate());
	const date2 = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);

	return getPeriod(schema, date1, date2);
}

/**
 * Gets all values between two dates
 * @param {Schema} schema What schema to search in
 * @param {Date} date1 Start of period
 * @param {Date} date2 End of period
 * @returns All values in the period
 */
const getPeriod = async (schema, date1, date2) => {
	const cursor = schema.find({}).
		where('date').gte(date1).lte(date2).
		sort({ date: -1 }).
		cursor();
	var rv = [];
	for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
		rv.push(doc);
	}
	return rv;
}

/**
 * Gets all values in the schema
 * @param {Schema} schema What schema to search in
 * @returns All values in the schema
 */
const getAll = async (schema) => {
	const cursor = schema.find({}).cursor();
	var rv = [];
	for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
		rv.push(doc);
	}
	return rv;
}

/**
 * Gets the average value of a particular field, within the specified period
 * @param {*} schema 
 * @param {Date} date1 Start of period 
 * @param {Date} date2 End of period 
 * @param {string} value Specific value to get
 * @returns Average value of the specified field
 */
const getPeriodAvg = async (schema, date1, date2, value) => {
	const average = await schema.aggregate([
		{
			$match: {
				date: {
					$gte: date1,
					$lte: date2
				}
			}
		},
		{ $group: { _id: null, average: { $avg: "$" + value } } },
	]).exec();

	if (average.length == 0) {
		return 0;
	}

	return average[0].average;
}

/**
 * Gets the average value of a particular field, within a specified period, for each day in the period
 * @param {Schema} schema What schema to search in
 * @param {Date} date1 Start of period 
 * @param {Date} date2 End of period 
 * @param {string} value Specific value to get 
 * @returns Average value of the specified field
 */
const getDayAverage = async (schema, date1, date2, value) => {
	var dayValue = [];
	for (var i = 0; i < days(date2, date1); i++) {
		var start = new Date(date1);
		start.setDate(start.getDate() + i);
		let end = new Date(start);
		end.setDate(end.getDate() + 1);
		dayValue.push(await getPeriodAvg(schema, start, end, value));
	}

	return dayValue;
}

/**
 * Gets the average value of a particular field, within a specified period, divided into a specified number of increments
 * @param {Schema} schema What schema to search in
 * @param {Date} date1 Start of period 
 * @param {Date} date2 End of period 
 * @param {string} value Specific value to get 
 * @param {number} increment 
 * @returns Average value of the specified field, separated into increments
 */
const getNAverage = async (schema, date1, date2, value, increment) => {
	const averages = await schema.aggregate([
		{
			$match: {
				date: {
					$gte: date1,
					$lte: date2
				}
			}
		},
		{
			$bucketAuto: {
				groupBy: "$date",
				buckets: increment,
				output: {
					average: {
						$avg: "$" + value
					}
				}
			}
		}
	]).exec();

	if (averages.length == 0) {
		return 0;
	}

	return averages;
}

/**
 * Counts the number of days between two dates
 * @param {Date} date1 Start of period 
 * @param {Date} date2 End of period 
 * @returns Amount of days
 */
const days = (date1, date2) => {
	let difference = date1.getTime() - date2.getTime();
	let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
	return TotalDays;
}

/**
 * Gets the median value of a particular field, within the schema
 * @param {Schema} schema What schema to search in
 * @returns The median value
 */
const getMedian = async (schema) => {
	const median = await schema.find({}).
		sort({ value: 1 }).
		skip(await schema.countDocuments() / 2).
		limit(1);
	return median[0].value;
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
exports.getPeriodAvg = getPeriodAvg;
exports.getDayAverage = getDayAverage;
exports.getNAverage = getNAverage;
exports.getMedian = getMedian;
exports.GroupState = GroupState;
exports.PowerPrice = PowerPrice;
exports.WaterInflux = WaterInflux;
exports.SolarValue = SolarValue;