const functions = require('./functions.js');
const dbfunctions = require('./dbfunctions.js');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 21613;
app.use(cors());

app.get('/', (req, res) => {
  res.json({"working": true});
  console.log("Request received");
})

const server = app.listen(port, () => {
  console.log("Heisann");
  console.log(`Example app listening on port ${port}`);
});


module.exports = server;