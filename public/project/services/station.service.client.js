(function () {
    angular
        .module('WeatherJournal')
        .factory('stationService', stationService);

    function stationService($http) {

        var api = {
            createStation: createStation,
            deleteStation: deleteStation,
            findStationById:findStationById,
            findStationsByLocationId:findStationsByLocationId,
            updateStation: updateStation
        };
        return api;

        function createStation(locationId, station) {
            return $http
                .post("/api/location/" + locationId + "/station", station)
                .then(
                    function (res) {
                        return res.data;
                    }
                );
        }

        function deleteStation(stationId) {
            return $http
                .delete("/api/station/" + stationId)
                .then(
                    function (res) {
                        return true;
                    },
                    function (err) {
                        return false;
                    }
                );
        }

        function findStationById(stationId) {
            return $http
                .get("/api/station/" + stationId)
                .then(
                    function (res) {
                        return res.data;
                    }
                );
        }

        function findStationsByLocationId(locationId) {
            return $http
                .get("/api/location/" + locationId + "/station")
                .then(
                    function (res) {
                        return res.data;
                    }
                );
        }

        function updateStation(stationId, station) {
            return $http
                .put("/api/station/" + stationId, station)
                .then(
                    function (res) {
                        return true;
                    },
                    function (err) {
                        return false;
                    }
                );
        }
    }
})();
