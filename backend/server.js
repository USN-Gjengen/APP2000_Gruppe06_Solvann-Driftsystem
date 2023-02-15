const functions = require('./functions.js');
const dbfunctions = require('./dbfunctions.js');
const express = require('express');
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

app.put('/api/turbines/all', (req, res) => {
  console.log(req.body);
})

const server = app.listen(port, () => {
  console.log("Heisann");
  console.log(`Example app listening on port ${port}`);
});


module.exports = server;