module.exports = function(app) {

    var stations = [
        { "_id": "400", "stationName": "CULV1", "locationId": "129", "coordinate": "Lat: 33.57453°N Lon: 117.12804°W", "elevation": "400ft." },
        { "_id": "401", "stationName": "CULV2", "locationId": "129", "coordinate": "Lat: 33.57612°N Lon: 117.12789°W", "elevation": "401ft." },
        { "_id": "402", "stationName": "SDTEC", "locationId": "125", "coordinate": "Lat: 33.614402°N Lon: 117.614402°W", "elevation": "1402ft." },
        { "_id": "403", "stationName": "EUG1", "locationId": "125", "coordinate": "Lat: 33.614403°N Lon: 117.614403°W", "elevation": "1403ft." },
        { "_id": "404", "stationName": "SDTEC", "locationId": "123", "coordinate": "Lat: 33.613404°N Lon: 117.613404°W", "elevation": "1404ft." },
        { "_id": "405", "stationName": "EP", "locationId": "124", "coordinate": "Lat: 33.613405°N Lon: 117.613405°W", "elevation": "1405ft." }
    ];

    app.post("/api/location/:locationId/station", createStation);
    app.delete("/api/station/:stationId", deleteStation);
    app.get("/api/station/:stationId", findStationById);
    app.get("/api/location/:locationId/station", findStationsByLocationId);
    app.put("/api/station/:stationId", updateStation);

    function createStation(req, res) {
        var station = req.body;
        station.locationId = req.params.locationId;
        station._id = ""+Math.floor((Math.random() * 100) + 1);
        stations.unshift(station);
        res.json(station);
    }

    function deleteStation(req, res) {
        var stationId = req.params.stationId;
        var index = -1;
        for(var s in stations){
            if(stations[s]._id === stationId){
                index = s;
                break;
            }
        }
        if (index > -1) {
            stations.splice(index, s);
            res.sendStatus(200);
            return;
        }
        res.sendStatus(404);
    }

    function findStationById(req, res) {
        var stationId = req.params.stationId;
        for(var s in stations) {
            if(stations[s]._id === stationId) {
                res.json(stations[s]);
                return;
            }
        }
    }

    function findStationsByLocationId(req, res) {
        var locationId = req.params.locationId;
        var locationStations = [];
        for(var s in stations) {
            if(stations[s].locationId === locationId) {
                locationStations.push(stations[s]);
            }
        }
        res.json(locationStations);
    }

    function updateStation(req, res) {
        var stationId = req.params.stationId;
        var newStationValues = req.body;
        var index = -1;
        for(var s in stations){
            if(stations[s]._id === stationId){
                index = s;
                break;
            }
        }
        if (index > -1) {
            newStationValues._id = stations[index]._id;
            stations.splice(index,s);
            stations.push(newStationValues);
            res.sendStatus(200);
            return;
        }
        res.sendStatus(404);
    }
};
