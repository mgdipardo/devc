(function () {
    angular
        .module("WeatherJournal")
        .controller("locationEditController", locationEditController);

    function locationEditController($routeParams,
                                    $location,
                                    locationService) {
        var model = this;

        model.userId = $routeParams["userId"];
        model.locationId = $routeParams["locationId"];

        function init() {
            locationService
                .findLocationsByUser(model.userId)
                .then(successCallbackList, errorCallbackList);
            function successCallbackList(locations) {
                model.locations = locations;
            }
            function errorCallbackList(err) {
                model.error = "System error, cannot retrieve user locations."
            }
            locationService
                .findLocationById(model.locationId)
                .then(successCallbackOne, errorCallbackOne);
            function successCallbackOne(location) {
                model.location = location;
            }
            function errorCallbackOne(err) {
                model.error = "System error, cannot retrieve location."
            }
        }
        init();

        model.deleteLocation = deleteLocation;
        model.updateLocation = updateLocation;

        function deleteLocation() {
            locationService
                .deleteLocation(model.locationId)
                .then(successCallback, errorCallback);
            function successCallback(deleted) {
                $location.url("/user/" + model.userId + "/location");
            }
            function errorCallback(err) {
                model.error = "System error, cannot delete location."
            }
        }

        function updateLocation() {
            locationService
                .updateLocation(model.locationId, model.location)
                .then(successCallback, errorCallback);
            function successCallback(updated) {
                $location.url("/user/" + model.userId + "/location");
            }
            function errorCallback(err) {
                model.error = "System error, cannot update location."
            }
        }
    }
})();
