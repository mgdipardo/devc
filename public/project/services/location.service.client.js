(function () {
    angular
        .module("WeatherJournal")
        .factory("locationService", locationService);

    function locationService($http) {

        var api = {
            createLocation:createLocation,
            deleteLocation:deleteLocation,
            findLocationById:findLocationById,
            findLocationsByUser:findLocationsByUser,
            updateLocation:updateLocation
        };
        return api;

        function createLocation(userId, newLocation) {
            var url = "/wxj/api/user/" + userId + "/location";
            return $http.post(url, newLocation)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteLocation(locationId) {
            var url = "/wxj/api/location/" + locationId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findLocationById(locationId) {
            var url = "/wxj/api/location/" + locationId;
            return $http.get(url)
                .then(function (response) {
                   return response.data;
                });
        }

        function findLocationsByUser(userId) {
            var url = "/wxj/api/user/" + userId + "/location";
            return $http.get(url)
                .then(function (response) {
                   return response.data;
                });
        }

        function updateLocation(locationId, newLocationValues) {
            var url = "/wxj/api/location/" + locationId;
            return $http.put(url, newLocationValues)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();
