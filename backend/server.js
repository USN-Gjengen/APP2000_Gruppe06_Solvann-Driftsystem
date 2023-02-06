
import * as functions from './functions.js' ;
import express from 'express';
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





