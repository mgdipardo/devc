(function () {
    angular
        .module('WeatherJournal')
        .controller('locationEditController', locationEditController);

    function locationEditController($routeParams,
                                    $location,
                                    locationService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.locationId = $routeParams['locationId'];

        function init() {
            locationService
                .findLocationsByUser(model.userId)
                .then(
                    function successCallback(locations) {
                        model.locations = locations;
                    },
                    function errorCallback(err) {
                        model.error = "System error, cannot retrieve user locations."
                    }
                );
            locationService
                .findLocationById(model.locationId)
                .then(
                    function successCallback(location) {
                        model.location = location;
                    },
                    function errorCallback(err) {
                        model.error = "System error, cannot retrieve location."
                    }
                );
        }
        init();

        model.deleteLocation = deleteLocation;
        model.updateLocation = updateLocation;

        function deleteLocation() {
            locationService
                .deleteLocation(model.locationId)
                .then(
                    function successCallback(deleted) {
                        $location.url('/user/' + model.userId + '/location');
                    },
                    function errorCallback(err) {
                        model.error = "System error, cannot delete location."
                    }
                );
        }

        function updateLocation() {
            locationService
                .updateLocation(model.locationId, model.location)
                .then(
                    function successCallback(updated) {
                        $location.url('/user/' + model.userId + '/location');
                    },
                    function errorCallback(err) {
                        model.error = "System error, cannot update location."
                    }
                );
        }
    }
})();
