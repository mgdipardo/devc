var app = require("../../express.js");
var locationModel = require("../models/location/location.model.server.js");

// var locations = [
//     { "_id": "123", "locationName": "El Paso",     "userId": "613",  "state": "Texas", "zipcode": "79925" },
//     { "_id": "124", "locationName": "Temecula",    "userId": "613",  "state": "California", "zipcode": "92592" },
//     { "_id": "125", "locationName": "Eugene",      "userId": "614",  "state": "Oregon", "zipcode": "97401" },
//     { "_id": "126", "locationName": "Temecula",    "userId": "614",  "state": "California", "zipcode": "92592" },
//     { "_id": "127", "locationName": "Petaluma",    "userId": "1218", "state": "California", "zipcode": "94954" },
//     { "_id": "128", "locationName": "Iowa City",   "userId": "1218", "state": "Iowa", "zipcode": "52240" },
//     { "_id": "129", "locationName": "Culver City", "userId": "1218", "state": "California", "zipcode": "90230" }
// ];

app.post("/wxj/api/user/:userId/location", createLocation);
app.delete("/wxj/api/location/:locationId", deleteLocation);
app.get("/wxj/api/location/:locationId", findLocationById);
app.get("/wxj/api/user/:userId/location", findLocationsByUser);
app.put("/wxj/api/location/:locationId", updateLocation);

function createLocation(req, res) {
    var userId = req.params.userId;
    var newLocation = req.body;
    locationModel
        .createLocation(userId, newLocation)
        // What is returned from createLocation by mongoose
        // is a "doc" containing the newly created location.
        .then(function (newlyCreatedLocation) {
            res.json(newlyCreatedLocation);
        }, function (err) {
            res.sendStatus(404);
        });
}

function deleteLocation(req, res) {
    var locationId = req.params.locationId;
    locationModel
        .deleteLocation(locationId)
        // There is no "doc" returned by mongoose,
        // only a status for a delete.
        .then(function (status) {
            res.send(status)
        });
}

function findLocationById(req, res) {
    var locationId = req.params.locationId;
    locationModel
        .findLocationById(locationId)
        // location is the "doc" returned by mongoose
        .then(function (location) {
            res.json(location);
        });
}

function findLocationsByUser(req, res) {
    var userId = req.params.userId;
    locationModel
        .findLocationsByUser(userId)
        .then(function (location) {
           res.json(location);
        });
}

function updateLocation(req, res) {
    var locationId = req.params.locationId;
    var newLocationValues = req.body;
    locationModel
        .updateLocation(locationId, newLocationValues)
        // There is no "doc" returned by mongoose,
        // only a status for a delete.
        .then(function (status) {
           res.send(status);
        });
}
