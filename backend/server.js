const functions = require('./functions.js');
const dbfunctions = require('./dbfunctions.js');
const express = require('express');
const cron = require('node-cron');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 21613;
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({"working": true});
  console.log("Request received");
})

app.get('/api/groupstates/last', (req, res) => {
  res.json(dbfunctions.getAllGroupStates().slice(-1));
  console.log("Request received");
})
app.put('/api/turbines/all', (req, res) => {
  if(req.body.isTurbineOn){
    functions.setAllTurbinesOn();
  }else{
    functions.setAllTurbinesOff();
  }
  console.log(req.body);
})

if(process.env.NODE_ENV != "test"){
  cron.schedule('0 * * * * *', async () => {
    console.log("Logging Minute-Updated Values");
    dbfunctions.logWaterInflux();
    dbfunctions.logSolarValue();
    dbfunctions.logPowerPrice();
  });
}

const server = app.listen(port, () => {
  console.log("Heisann");
  console.log(`Example app listening on port ${port}`);
});


module.exports = server;