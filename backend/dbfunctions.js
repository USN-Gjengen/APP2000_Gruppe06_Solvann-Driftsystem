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


const powerSchema = new mongoose.Schema({
  price: Number,
  date: Date,
});
const PowerPrice = mongoose.model('PowerPrice', powerSchema);

const logPowerPrice = async () => {
  mongoose.set('strictQuery', true);
  await mongoose.connect('mongodb://' + DB_USR + ':' + DB_PWD + '@eksempler.no:37191/?authMechanism=DEFAULT');
  
  await functions.getPowerPrice().then(price => {console.log(price);
    const power = new PowerPrice({ price: price, date: Date.now()});
    power.save();
    });
  //mongoose.connection.close();
}

const solarSchema = new mongoose.Schema({
  value: Number,
  date: Date,
});
const SolarValue = mongoose.model('SolarValue', solarSchema);

const logSolarValue = async () => {
  mongoose.set('strictQuery', true);
  await mongoose.connect('mongodb://' + DB_USR + ':' + DB_PWD + '@eksempler.no:37191/?authMechanism=DEFAULT');
  
  await functions.getSolarValue().then(value => {console.log(value);
    const solar = new SolarValue({ value: value, date: Date.now()});
    solar.save();
    });
  //mongoose.connection.close();
}

const waterInfluxSchema = new mongoose.Schema({
  waterInflux: Number,
  date: Date,
});
const WaterInflux = mongoose.model('WaterInflux', waterInfluxSchema);

const logWaterInflux = async () => {
  mongoose.set('strictQuery', true);
  await mongoose.connect('mongodb://' + DB_USR + ':' + DB_PWD + '@eksempler.no:37191/?authMechanism=DEFAULT');
  
  await functions.getWaterInflux().then(waterInflux => {console.log(waterInflux);
    const influx = new WaterInflux({ waterInflux: waterInflux, date: Date.now()});
    influx.save();
    });
  //mongoose.connection.close();
}

const groupStateSchema = new mongoose.Schema({
  money: Number,
  date: Date,
  waterLevel: Number,
  environmentCost: Number
});
const GroupState = mongoose.model('GroupState', groupStateSchema);

const logGroupState = async () => {
  mongoose.set('strictQuery', true);
  await mongoose.connect('mongodb://' + DB_USR + ':' + DB_PWD + '@eksempler.no:37191/?authMechanism=DEFAULT');
  
  await functions.getGroupState().then(gs => {
    const state = new GroupState({ money: gs.money, date: Date.now(), waterLevel: gs.waterLevel, environmentCost: gs.environmentCost});
    state.save();
    });
  //mongoose.connection.close();
}

/*const getAllGroupStates = async () => {
  mongoose.set('strictQuery', true);
  await mongoose.connect('mongodb://' + DB_USR + ':' + DB_PWD + '@eksempler.no:37191/?authMechanism=DEFAULT');
  const cursor = GroupState.find({  }).cursor();
  var rv = [];
  for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
    rv.push(doc);
  }
  return rv;
}*/

const getAll = async (document) => {
  mongoose.set('strictQuery', true);
  await mongoose.connect('mongodb://' + DB_USR + ':' + DB_PWD + '@eksempler.no:37191/?authMechanism=DEFAULT');
  const cursor = document.find({  }).cursor();
  var rv = [];
  for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
    rv.push(doc);
  }
  return rv;
}


exports.logPowerPrice = logPowerPrice;
exports.logSolarValue = logSolarValue;
exports.logWaterInflux = logWaterInflux;
exports.logGroupState = logGroupState;
exports.getAll = getAll;
exports.GroupState = GroupState;
exports.PowerPrice = PowerPrice;
exports.WaterInflux = WaterInflux;
exports.SolarValue = SolarValue;