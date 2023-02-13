const mongoose = require("mongoose");
const request = require("supertest");
const server = require("../server");
require('dotenv').config();

let DB_USR = "";
let DB_PWD = "";

try {
    DB_USR = process.env.DATABASE_USERNAME;
    DB_PWD = process.env.DATABASE_PASSWORD;
} catch (err) {
    console.error(err);
}

/* Connecting to the database before each test. */
beforeEach(async () => {
    mongoose.set('strictQuery', true);
    await mongoose.connect('mongodb://' + DB_USR + ':' + DB_PWD + '@eksempler.no:37191/?authMechanism=DEFAULT');
});
  
/* Closing database connection after each test. */
afterEach(async () => {
    await mongoose.connection.close();
});


describe("GET /", () => {
    it("should return {working : true}", async () => {
        //fetch('https://solvann.azurewebsites.net/api/Solar/')
        //    .then(res => res.json())
        //    .then(data => console.log(data));
        const res = await request(server).get("/");
        expect(res.statusCode).toBe(200);
        expect(res.body).toStrictEqual({"working" : true});
    });
  });

server.close();