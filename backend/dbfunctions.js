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