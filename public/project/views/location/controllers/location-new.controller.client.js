(function () {
    angular
        .module("WeatherJournal")
        .controller("locationNewController", locationNewController);

    function locationNewController($routeParams,
                                    $location,
                                    locationService) {
        var model = this;

        model.userId = $routeParams["userId"];

        function init() {
            locationService
                .findLocationsByUser(model.userId)
                .then(successCallback, errorCallback);
            function successCallback(locations) {
                model.locations = locations;
            }
            function errorCallback(err) {
                model.error = "System error, cannot retrieve user locations."
            }
        }
        init();

        model.createLocation = createLocation;

        function createLocation(location) {
            locationService
                .createLocation(model.userId, location)
                .then(successCallback, errorCallback);
            function successCallback(location) {
                $location.url("/user/" + model.userId + "/location");
            }
            function errorCallback(err) {
                model.error = "System error, cannot create location."
            }
        }
    }
})();
