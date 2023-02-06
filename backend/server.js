const functions = require('./functions.js');
const express = require('express');
const cors = require('cors');

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


module.exports = app.listen(3000);


