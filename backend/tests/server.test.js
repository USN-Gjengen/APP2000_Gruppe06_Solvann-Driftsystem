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

/* Set test timeout */
jest.setTimeout(15000);

/* Connecting to the database before each test. */
beforeAll(async () => {
    mongoose.set('strictQuery', true);
    await mongoose.connect('mongodb://' + DB_USR + ':' + DB_PWD + '@eksempler.no:37191/?authMechanism=DEFAULT');
});

/* Closing database connection after each test. */
afterAll(async () => {
    await mongoose.connection.close();
    console.log("Database connection closed!");
    await server.close();
    console.log("Server closed!");
});

let testnumber = 0;
beforeEach(async () => {
    testnumber++;
    console.log("Test number " + testnumber + " is running.");
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
describe("GET /api/WaterLevel/lastHour", () => {
    it("should return the average value of waterLevel in 12 increments", async () => {
        const res = await request(server).get("/api/WaterLevel/lastHour");
        expect(res.statusCode).toBe(200);
    });
});

describe("GET /api/WaterLevel/lastWeek", () => {
    it("should return the average value of waterLevel in 7 day increments", async () => {
        const res = await request(server).get("/api/WaterLevel/lastWeek");
        expect(res.statusCode).toBe(200);
    });
});

describe("GET /api/WaterLevel/lastMonth", () => {
    it("should return the average value of waterLevel in 5 increments", async () => {
        const res = await request(server).get("/api/WaterLevel/lastMonth");
        expect(res.statusCode).toBe(200);
    });
});

describe("GET /api/Money/lastHour", () => {
    it("should return the average value of money in 12 increments", async () => {
        const res = await request(server).get("/api/Money/lastHour");
        expect(res.statusCode).toBe(200);
    });
});
describe("GET /api/Money/lastWeek", () => {
    it("should return the average value of money in 7 day increments", async () => {
        const res = await request(server).get("/api/Money/lastWeek");
        expect(res.statusCode).toBe(200);
    });
});
describe("GET /api/Money/lastMonth", () => {
    it("should return the average value of money in 5 increments", async () => {
        const res = await request(server).get("/api/Money/lastMonth");
        expect(res.statusCode).toBe(200);
    });
});
describe("GET /api/EnvironmentCost/lastHour", () => {
    it("should return the average value of EnvironmentCost in 12 increments", async () => {
        const res = await request(server).get("/api/EnvironmentCost/lastHour");
        expect(res.statusCode).toBe(200);
    });
});
describe("GET /api/EnvironmentCost/lastWeek", () => {
    it("should return the average value of EnvironmentCost in 7 day increments", async () => {
        const res = await request(server).get("/api/EnvironmentCost/lastWeek");
        expect(res.statusCode).toBe(200);
    });
});
describe("GET /api/EnvironmentCost/lastMonth", () => {
    it("should return the average value of EnvironmentCost in 5 increments", async () => {
        const res = await request(server).get("/api/EnvironmentCost/lastMonth");
        expect(res.statusCode).toBe(200);
    });
});
describe("GET /api/PowerPrice/last", () => {
    it("should return the last value of powerPrice", async () => {
        const res = await request(server).get("/api/PowerPrice/last");
        expect(res.statusCode).toBe(200);
    });
});
describe("GET /api/PowerPrice/lastMonth", () => {
    it("should return the average value of PowerPrice in 5 increments", async () => {
        const res = await request(server).get("/api/PowerPrice/lastMonth");
        expect(res.statusCode).toBe(200);
    });
});
describe("GET /api/PowerPrice/lastWeek", () => {
    it("should return the average day value of powerPrice in 7 increments", async () => {
        const res = await request(server).get("/api/PowerPrice/lastWeek");
        expect(res.statusCode).toBe(200);
    });
});
describe("GET /api/PowerPrice/lastHour", () => {
    it("should return the average 5 minute values of powerPrice in 12 increments", async () => {
        const res = await request(server).get("/api/PowerPrice/lastHour");
        expect(res.statusCode).toBe(200);
    });
});

describe("GET /api/WaterInflux/last", () => {
    it("should return the last value of waterInflux", async () => {
        const res = await request(server).get("/api/WaterInflux/last");
        expect(res.statusCode).toBe(200);
    });
});
describe("GET /api/WaterInflux/lastMonth", () => {
    it("should return the average value of WaterInflux in 5 increments", async () => {
        const res = await request(server).get("/api/WaterInflux/lastMonth");
        expect(res.statusCode).toBe(200);
    });
});
describe("GET /api/WaterInflux/lastWeek", () => {
    it("should return the average day value of waterInflux in 7 increments", async () => {
        const res = await request(server).get("/api/WaterInflux/lastWeek");
        expect(res.statusCode).toBe(200);
    });
});
describe("GET /api/WaterInflux/lastHour", () => {
    it("should return the average 5 minute values of waterInflux in 12 increments", async () => {
        const res = await request(server).get("/api/WaterInflux/lastHour");
        expect(res.statusCode).toBe(200);
    });
});
describe("GET /api/SolarValue/last", () => {
    it("should return the last value of SolarValue", async () => {
        const res = await request(server).get("/api/SolarValue/last");
        expect(res.statusCode).toBe(200);
    });
});
describe("GET /api/SolarValue/lastMonth", () => {
    it("should return the average value of SolarValue in 5 increments", async () => {
        const res = await request(server).get("/api/SolarValue/lastMonth");
        expect(res.statusCode).toBe(200);
    });
});
describe("GET /api/SolarValue/lastWeek", () => {
    it("should return the average day value of SolarValue in 7 increments", async () => {
        const res = await request(server).get("/api/SolarValue/lastWeek");
        expect(res.statusCode).toBe(200);
    });
});
describe("GET /api/SolarValue/lastHour", () => {
    it("should return the average 5 minute values of SolarValue in 12 increments", async () => {
        const res = await request(server).get("/api/SolarValue/lastHour");
        expect(res.statusCode).toBe(200);
    });
});

describe("GET /api/turbines/all", () => {
    it("should return the status of all turbines", async () => {
        const res = await request(server).get("/api/turbines/all");
        expect(res.statusCode).toBe(200);
    });
});

describe("GET /api/turbine/:id", () => {
    it("should return the status of one turbine", async () => {
        const turbines = await request(server).get("/api/turbines/all");
        const res = await request(server).get("/api/turbine/" + turbines.body[0]._id);
        expect(res.statusCode).toBe(200);
    });
});