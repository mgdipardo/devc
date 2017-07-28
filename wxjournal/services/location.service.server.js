module.exports = function(app) {

    var locations = [
        { "_id": "123", "locationName": "El Paso",     "userId": "613",  "state": "Texas", "zipcode": "79925" },
        { "_id": "124", "locationName": "Temecula",    "userId": "613",  "state": "California", "zipcode": "92592" },
        { "_id": "125", "locationName": "Eugene",      "userId": "614",  "state": "Oregon", "zipcode": "97401" },
        { "_id": "126", "locationName": "Temecula",    "userId": "614",  "state": "California", "zipcode": "92592" },
        { "_id": "127", "locationName": "Petaluma",    "userId": "1218", "state": "California", "zipcode": "94954" },
        { "_id": "128", "locationName": "Iowa City",   "userId": "1218", "state": "Iowa", "zipcode": "52240" },
        { "_id": "129", "locationName": "Culver City", "userId": "1218", "state": "California", "zipcode": "90230" }
    ];

    app.post("/api/user/:userId/location", createLocation);
    app.delete("/api/location/:locationId", deleteLocation);
    app.get("/api/location/:locationId", findLocationById);
    app.get("/api/user/:userId/location", findLocationsByUser);
    app.put("/api/location/:locationId", updateLocation);

    function createLocation(req, res) {
        var location = req.body;
        location.userId = req.params.userId;
        location._id = ""+Math.floor((Math.random() * 100) + 1);
        locations.unshift(location);
        res.json(location);
    }

    function deleteLocation(req, res) {
        var locationId = req.params.locationId;
        var index = -1;
        for(var l in locations){
            if(locations[l]._id === locationId){
                index = l;
                break;
            }
        }
        if (index > -1) {
            locations.splice(index, 1);
            res.sendStatus(200);
            return;
        }
        res.sendStatus(404);
    }

    function findLocationById(req, res) {
        var locationId = req.params.locationId;
        for(var l in locations) {
            if(locations[l]._id === locationId) {
                res.json(locations[l]);
                return;
            }
        }
    }

    function findLocationsByUser(req, res) {
        var userId = req.params.userId;
        var userLocations = [];
        for(var l in locations) {
            if(locations[l].userId === userId) {
                userLocations.push(locations[l]);
            }
        }
        res.json(userLocations);
    }

    function updateLocation(req, res) {
        var locationId = req.params.locationId;
        var newLocationValues = req.body;
        var index = -1;
        for(var l in locations){
            if(locations[l]._id === locationId){
                index = l;
                break;
            }
        }
        if (index > -1) {
            newLocationValues._id = locations[index]._id;
            locations.splice(index,1);
            locations.push(newLocationValues);
            res.sendStatus(200);
            return;
        }
        res.sendStatus(404);
    }
};
