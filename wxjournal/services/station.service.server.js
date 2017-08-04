var app = require("../../express.js");
var stationModel = require("../models/station/station.model.server.js");

// var stations = [
//     { "_id": "400", "stationName": "CULV1", "locationId": "129", "coordinate": "Lat: 33.57453°N Lon: 117.12804°W", "elevation": "400ft." },
//     { "_id": "401", "stationName": "CULV2", "locationId": "129", "coordinate": "Lat: 33.57612°N Lon: 117.12789°W", "elevation": "401ft." },
//     { "_id": "402", "stationName": "SDTEC", "locationId": "125", "coordinate": "Lat: 33.614402°N Lon: 117.614402°W", "elevation": "1402ft." },
//     { "_id": "403", "stationName": "EUG1", "locationId": "125", "coordinate": "Lat: 33.614403°N Lon: 117.614403°W", "elevation": "1403ft." },
//     { "_id": "404", "stationName": "SDTEC", "locationId": "123", "coordinate": "Lat: 33.613404°N Lon: 117.613404°W", "elevation": "1404ft." },
//     { "_id": "405", "stationName": "EP", "locationId": "124", "coordinate": "Lat: 33.613405°N Lon: 117.613405°W", "elevation": "1405ft." }
// ];

app.post("/wxj/api/location/:locationId/station", createStation);
app.delete("/wxj/api/station/:stationId", deleteStation);
app.get("/wxj/api/station/:stationId", findStationById);
app.get("/wxj/api/location/:locationId/station", findStationsByLocationId);
app.put("/wxj/api/station/:stationId", updateStation);

function createStation(req, res) {
    var locationId = req.params.locationId;
    var newStation = req.body;
    stationModel
        .createStation(locationId, newStation)
        // What is returned from createStation by mongoose
        // is a "doc" containing the newly created station.
        .then(function (newlyCreatedStation) {
            res.json(newlyCreatedStation);
        }, function (err) {
            res.sendStatus(404);
        });
}

function deleteStation(req, res) {
    var stationId = req.params.stationId;
    stationModel
        .deleteStation(stationId)
        // There is no "doc" returned by mongoose,
        // only a status for a delete.
        .then(function (status) {
            res.send(status)
        });
}

function findStationById(req, res) {
    var stationId = req.params.stationId;
    stationModel
        .findStationById(stationId)
        .then(function (station) {
            res.json(station);
        });
}

function findStationsByLocationId(req, res) {
    var locationId = req.params.locationId;
    stationModel
        .findStationsByLocationId(locationId)
        // station is the "doc" returned by mongoose
        .then(function (station) {
            res.json(station);
        });
}

function updateStation(req, res) {
    var stationId = req.params.stationId;
    var newStationValues = req.body;
    stationModel
        .updateStation(stationId, newStationValues)
        // There is no "doc" returned by mongoose,
        // only a status for a delete.
        .then(function (status) {
           res.send(status);
        });
}
