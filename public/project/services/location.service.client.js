(function () {
    angular
        .module('WeatherJournal')
        .factory('locationService', locationService);

    function locationService($http) {

        var api = {
            createLocation:createLocation,
            deleteLocation:deleteLocation,
            findLocationById:findLocationById,
            findLocationsByUser:findLocationsByUser,
            updateLocation:updateLocation
        };
        return api;

        function createLocation(userId, location) {
            return $http
                .post("/api/user/" + userId + "/location", location)
                .then(
                    function (res) {
                        return res.data;
                    }
                );
        }

        function deleteLocation(locationId) {
            return $http
                .delete("/api/location/" + locationId)
                .then(
                    function (res) {
                        return true;
                    },
                    function (err) {
                        return false;
                    }
                );
        }

        function findLocationById(locationId) {
            return $http
                .get("/api/location/" + locationId)
                .then(
                    function (res) {
                        return res.data;
                    }
                );
        }

        function findLocationsByUser(userId) {
            return $http
                .get("/api/user/" + userId + "/location")
                .then(
                    function (res) {
                        return res.data;
                    }
                );
        }

        function updateLocation(locationId, location) {
            return $http
                .put("/api/location/" + locationId, location)
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
