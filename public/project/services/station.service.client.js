(function () {
    angular
        .module('WeatherJournal')
        .factory('stationService', stationService);

    function stationService() {

        var stations = [
            { "_id": "400", "stationName": "CULV1", "locationId": "129", "coordinate": "Lat: 33.57453°N Lon: 117.12804°W", "elevation": "400ft." },
            { "_id": "401", "stationName": "CULV2", "locationId": "129", "coordinate": "Lat: 33.57612°N Lon: 117.12789°W", "elevation": "401ft." },
            { "_id": "402", "stationName": "SDTEC", "locationId": "125", "coordinate": "Lat: 33.614402°N Lon: 117.614402°W", "elevation": "1402ft." },
            { "_id": "403", "stationName": "EUG1", "locationId": "125", "coordinate": "Lat: 33.614403°N Lon: 117.614403°W", "elevation": "1403ft." },
            { "_id": "404", "stationName": "SDTEC", "locationId": "123", "coordinate": "Lat: 33.613404°N Lon: 117.613404°W", "elevation": "1404ft." },
            { "_id": "405", "stationName": "EP", "locationId": "124", "coordinate": "Lat: 33.613405°N Lon: 117.613405°W", "elevation": "1405ft." }
        ];

        var api = {
            findAllStationsForLocation:findAllStationsForLocation,
            findStationById:findStationById,
            updateStation: updateStation,
            createStation: createStation,
            deleteStation: deleteStation
        };
        return api;

        function updateStation(stationId, station) {
            var index = null;
            for(var s in stations){
                if(stations[s]._id === stationId){
                    index = s;
                    break;
                }
            }
            if (index !== null) {
                stations.splice(index, 1);
                stations.push(station);
            }
        }

        function createStation(locationId, station) {
            if(findStationById(station._id) === null) {
                station._id = ""+Math.floor((Math.random() * 100) + 1);
                station.locationId = locationId;
                stations.push(station);
            }
        }

        function deleteStation(stationId) {
            var station = findStationById(stationId);
            var index = stations.indexOf(station);
            if(index !== null || typeof index !== 'undefined') {
                stations.splice(index, 1);
            }
        }

        function findStationById(stationId) {
            for(var s in stations) {
                if(stations[s]._id === stationId)
                    return stations[s];
            }
            return null;
        }

        function findAllStationsForLocation(locationId) {
            var locationStations = [];
            for(var s in stations) {
                if(stations[s].locationId === locationId) {
                    locationStations.push(stations[s]);
                }
            }
            return locationStations;
        }
    }
})();
