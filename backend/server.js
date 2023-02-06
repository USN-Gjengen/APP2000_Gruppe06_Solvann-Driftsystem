
import * as functions from './functions.js' ;
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
const port = 21613;
app.use(cors());

app.get('/', (req, res) => {
  res.json({"working": true});
  console.log("Request received");
})

app.listen(port, () => {
  console.log("Heisann");
  console.log(`Example app listening on port ${port}`);
})




main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://myUserAdmin:Pg4sd9pwUqVR@eksempler.no:37191/?authMechanism=DEFAULT');
  const kittySchema = new mongoose.Schema({
    name: String
  });
  const Kitten = mongoose.model('Kitten', kittySchema);
  const fluffy = new Kitten({ name: 'berit' });
  await fluffy.save();
  
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}


