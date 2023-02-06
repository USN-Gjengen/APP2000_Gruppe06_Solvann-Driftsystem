import * as functions from './functions.js' ;
import fs from 'fs';
import mongoose from 'mongoose';

let username = "";
let password = "";

try {
    const data = JSON.parse(fs.readFileSync('credentials.json', 'utf8'));
    username = data.database.username;
    password = data.database.password;
  } catch (err) {
    console.error(err);
  }

//addCat().catch(err => console.log(err));

async function addCat(cat) {
  mongoose.set('strictQuery', true);
  await mongoose.connect('mongodb://' + username + ':' + password + '@eksempler.no:37191/?authMechanism=DEFAULT');
  const kittySchema = new mongoose.Schema({
    name: String
  });
  const Kitten = mongoose.model('Kitten', kittySchema);
  const fluffy = new Kitten({ name: cat });
  await fluffy.save();
  
}

export { addCat };