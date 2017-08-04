(function () {
    angular
        .module("WeatherJournal")
        .factory("stationService", stationService);

    function stationService($http) {

        var api = {
            createStation: createStation,
            deleteStation: deleteStation,
            findStationById:findStationById,
            findStationsByLocationId:findStationsByLocationId,
            updateStation: updateStation
        };
        return api;

        function createStation(locationId, newStation) {
            var url = "/wxj/api/location/" + locationId + "/station", newStation;
            return $http.post(url, newStation)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteStation(stationId) {
            var url = "/wxj/api/station/" + stationId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findStationById(stationId) {
            var url = "/wxj/api/station/" + stationId;
            return $http.get(url)
                .then(function (response) {
                   return response.data;
                });
        }

        function findStationsByLocationId(locationId) {
            var url = "/wxj/api/location/" + locationId + "/station";
            return $http.get(url)
                .then(function (response) {
                   return response.data;
                });
        }

        function updateStation(stationId, newStationValues) {
            var url = "/wxj/api/station/" + stationId, newStationValues;
            return $http.put(url, newStationValues)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();
