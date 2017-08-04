var app = require("../../express.js");
var historyModel = require("../models/history/history.model.server.js");

// var histories = [
//     { "_id": "6666", "historyDate": "2017-04-23", "stationId": "404", "highTemp": "80.4", "lowTemp": "55.3", "precipation": "0.3", "highWind": "22.8" },
//     { "_id": "6667", "historyDate": "2017-04-24", "stationId": "404", "highTemp": "77.4", "lowTemp": "59.3", "precipation": "0.0", "highWind": "15.8" },
//     { "_id": "6668", "historyDate": "2017-04-25", "stationId": "404", "highTemp": "80.4", "lowTemp": "55.3", "precipation": "0.3", "highWind": "22.8" },
//     { "_id": "6669", "historyDate": "2017-04-26", "stationId": "404", "highTemp": "77.4", "lowTemp": "59.3", "precipation": "0.0", "highWind": "15.8" }
// ];

app.get("/wxj/api/station/:stationId/history", findHistoriesByStationId);

function findHistoriesByStationId(req, res) {
    var stationId = req.params.stationId;
    historyModel
        .findHistoriesByStationId(stationId)
        // history is the "doc" returned by mongoose
        .then(function (history) {
            res.json(history);
        });
}
