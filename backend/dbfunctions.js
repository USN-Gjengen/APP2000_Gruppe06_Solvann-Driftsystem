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