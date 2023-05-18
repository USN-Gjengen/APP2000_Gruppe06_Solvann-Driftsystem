const functions = require('./functions.js');
const dbfunctions = require('./dbfunctions.js');
const mongoose = dbfunctions.connect();


//functions.getSolarValue();
//functions.getWaterInflux();
//functions.getPowerPrice();
//functions.setTurbineStatus("8d360792-d4ab-42df-927d-11a8a1c83edc", 0);
//functions.setTurbineStatus("f39090e5-22bf-406f-ab96-7cd8b89180aa", 0);
//functions.setTurbineStatus("ebe242ea-baea-4241-a158-763c429fd495", 0);
//functions.setTurbineStatus("6381c1d6-b347-4afb-9b16-ba17ed239a95", 0);

/*const gs = async () => {
    var state = await functions.getTurbineStatus();
    console.log(state);
}
const gt = async () => {
    var state = await functions.getGroupState();
    console.log(state);
}
gs();
gt();*/

//var gt = functions.getTurbineStatus();
//console.log(gt);
//dbfunctions.logPowerPrice();
//dbfunctions.logSolarValue();
//dbfunctions.logWaterInflux();
//dbfunctions.logGroupState();
//dbfunctions.getDay(dbfunctions.WaterInflux, new Date('2023-02-23'));
//dbfunctions.getDayAverage(dbfunctions.SolarValue, new Date('2023-02-20'), new Date('2023-02-27'));
//dbfunctions.getPeriodAvg(dbfunctions.WaterInflux, new Date('2023-02-20'), new Date('2023-02-27'));
//dbfunctions.getPeriod(dbfunctions.WaterInflux, new Date('2023-02-20'), new Date('2023-02-27'));
//functions.setAllTurbinesOn();
//functions.setAllTurbinesOff();
//var start = new Date();
//var end = new Date();
//start.setDate(start.getDate() - 7);
//start.setHours(start.getHours() - 200);

//console.log((new Date()).toISOString().replace("T", " ").split(".")[0]);
//dbfunctions.getDayAverage(dbfunctions.SolarValue, start, end);
//start.setDate(start.getDate() + i);
//dbfunctions.getPeriodAvg(dbfunctions.WaterInflux, start, end);
var start = new Date();
		var end = new Date();
		start.setHours(start.getHours() - 1);
		

        var states =  dbfunctions.getNAverageEnvironmentCost(dbfunctions.GroupState, start, end, 12);
//console.log(array[0].waterLevel)
        



