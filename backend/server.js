const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose');
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
  await mongoose.connect('mongodb://eksempler.no:37191/abc');
  const kittySchema = new mongoose.Schema({
    name: String
  });
  const Kitten = mongoose.model('Kitten', kittySchema);
  const fluffy = new Kitten({ name: 'bernard' });
  await fluffy.save();
  
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}


