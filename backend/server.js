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

app.get('/api/groupstates/last', async (req, res) => {
  var states = await dbfunctions.getAllGroupStates();
  res.json(states[states.length - 1]);
  console.log("Request received");
})
app.put('/api/turbines/all', (req, res) => {
  if(req.body.isTurbineOn){
    functions.setAllTurbinesOn();
  }else{
    functions.setAllTurbinesOff();
  }
})

if(process.env.NODE_ENV != "test"){
  cron.schedule('0 * * * * *', async () => {
    console.log("Logging 1-min interval values");
    dbfunctions.logWaterInflux();
    dbfunctions.logSolarValue();
    dbfunctions.logPowerPrice();
  });

  cron.schedule('0,10,20,30,40,50 * * * * *', async () => {
    console.log("Logging 10-sec interval values");
    dbfunctions.logGroupState();
  });
}

const server = app.listen(port, () => {
  console.log("Heisann");
  console.log(`Example app listening on port ${port}`);
});


module.exports = server;