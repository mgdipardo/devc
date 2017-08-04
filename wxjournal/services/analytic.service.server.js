var app = require("../../express.js");
var analyticModel = require("../models/analytic/analytic.model.server.js");

// var analytics = [
//     { "_id": "9666", "stationId": "404", "atOrAbove": "100.0", "duration": "Greater than 1 day", "span": "August-September, 2017" }
// ];

app.get("/wxj/api/station/:stationId/analytic", findAnalyticsByStationId);

function findAnalyticsByStationId(req, res) {
    var stationId = req.params.stationId;
    analyticModel
        .findAnalyticsByStationId(stationId)
        // analytic is the "doc" returned by mongoose
        .then(function (analytic) {
            res.json(analytic);
        });
}
