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
    await mongoose.connection.close();
    mongoose.set('strictQuery', true);
    await mongoose.connect('mongodb://' + DB_USR + ':' + DB_PWD + '@eksempler.no:37191/?authMechanism=DEFAULT');
});

/* Closing database connection after each test. */
afterEach(async () => {
    await mongoose.connection.close();
});


describe("GET /", () => {
    it("should return {working : true}", async () => {
        const res = await request(server).get("/");
        expect(res.statusCode).toBe(200);
        expect(res.body).toStrictEqual({ "working": true });
    });
});

describe("GET /api/groupstates/last", () => {
    it("should return last value of groupstates", async () => {
        const res = await request(server).get("/api/groupstates/last");
        expect(res.statusCode).toBe(200);
    });
});


server.close();