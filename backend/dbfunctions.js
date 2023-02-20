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

//addCat().catch(err => console.log(err));

const powerSchema = new mongoose.Schema({
  price: String,
  date: String,
});

const logPowerPrice = async () => {
  mongoose.set('strictQuery', true);
  await mongoose.connect('mongodb://' + DB_USR + ':' + DB_PWD + '@eksempler.no:37191/?authMechanism=DEFAULT');
  
  await functions.getPowerPrice().then(price => {console.log(price);
    const PowerPrice = mongoose.model('PowerPrice', powerSchema);
    const power = new PowerPrice({ price: price, date: Date.now()});
    power.save();
    });
  //mongoose.connection.close();
}

const solarSchema = new mongoose.Schema({
  value: String,
  date: String,
});

const logSolarValue = async () => {
  mongoose.set('strictQuery', true);
  await mongoose.connect('mongodb://' + DB_USR + ':' + DB_PWD + '@eksempler.no:37191/?authMechanism=DEFAULT');
  
  await functions.getSolarValue().then(value => {console.log(value);
    const SolarValue = mongoose.model('SolarValue', solarSchema);
    const solar = new SolarValue({ value: value, date: Date.now()});
    solar.save();
    });
  //mongoose.connection.close();
}

const waterInfluxSchema = new mongoose.Schema({
  waterInflux: String,
  date: String,
});

const logWaterInflux = async () => {
  mongoose.set('strictQuery', true);
  await mongoose.connect('mongodb://' + DB_USR + ':' + DB_PWD + '@eksempler.no:37191/?authMechanism=DEFAULT');
  
  await functions.getWaterInflux().then(waterInflux => {console.log(waterInflux);
    const WaterInflux = mongoose.model('WaterInflux', waterInfluxSchema);
    const influx = new WaterInflux({ waterInflux: waterInflux, date: Date.now()});
    influx.save();
    });
  //mongoose.connection.close();
}

const groupStateSchema = new mongoose.Schema({
  money: String,
  date: String,
  waterLevel: String,
  environmentCost: String
});
const logGroupState = async () => {
  mongoose.set('strictQuery', true);
  await mongoose.connect('mongodb://' + DB_USR + ':' + DB_PWD + '@eksempler.no:37191/?authMechanism=DEFAULT');
  
  await functions.getGroupState().then(gs => {console.log(gs);
    const GroupState = mongoose.model('GroupState', groupStateSchema);
    const state = new GroupState({ money: gs.money, date: Date.now(), waterLevel: gs.waterLevel, environmentCost: gs.environmentCost});
    state.save();
    });
  //mongoose.connection.close();
}

const addCat = async (cat) => {
  mongoose.set('strictQuery', true);
  await mongoose.connect('mongodb://' + DB_USR + ':' + DB_PWD + '@eksempler.no:37191/?authMechanism=DEFAULT');
  const kittySchema = new mongoose.Schema({
    name: String
  });
  const Kitten = mongoose.model('Kitten', kittySchema);
  const fluffy = new Kitten({ name: cat });
  await fluffy.save();
}

exports.addCat = addCat;
exports.logPowerPrice = logPowerPrice;
exports.logSolarValue = logSolarValue;
exports.logWaterInflux = logWaterInflux;
exports.logGroupState = logGroupState;