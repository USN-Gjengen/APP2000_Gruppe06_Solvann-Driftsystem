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
  id: String
});

const logPowerPrice = async (n) => {
  mongoose.set('strictQuery', true);
  await mongoose.connect('mongodb://' + DB_USR + ':' + DB_PWD + '@eksempler.no:37191/?authMechanism=DEFAULT');
  
  await functions.getPowerPrice().then(price => {console.log(price);
    const PowerPrice = mongoose.model('PowerPrice', powerSchema);
    const power = new PowerPrice({ price: price, date: Date.now(), id: n });
    power.save();
    });
  //mongoose.connection.close();
}

const solarSchema = new mongoose.Schema({
  value: String,
  date: String,
  id: String
});

const logSolarValue = async (n) => {
  mongoose.set('strictQuery', true);
  await mongoose.connect('mongodb://' + DB_USR + ':' + DB_PWD + '@eksempler.no:37191/?authMechanism=DEFAULT');
  
  await functions.getSolarValue().then(value => {console.log(value);
    const SolarValue = mongoose.model('SolarValue', solarSchema);
    const solar = new SolarValue({ value: value, date: Date.now(), id: n });
    solar.save();
    });
  //mongoose.connection.close();
}

const waterInfluxSchema = new mongoose.Schema({
  waterInflux: String,
  date: String,
  id: String
});

const logWaterInflux = async (n) => {
  mongoose.set('strictQuery', true);
  await mongoose.connect('mongodb://' + DB_USR + ':' + DB_PWD + '@eksempler.no:37191/?authMechanism=DEFAULT');
  
  await functions.getWaterInflux().then(waterInflux => {console.log(waterInflux);
    const WaterInflux = mongoose.model('WaterInflux', waterInfluxSchema);
    const influx = new WaterInflux({ waterInflux: waterInflux, date: Date.now(), id: n });
    influx.save();
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