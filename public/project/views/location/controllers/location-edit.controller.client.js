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
            model.locations = locationService.findAllLocationsForUser(model.userId);
            model.location = locationService.findLocationById(model.locationId);
        }
        init();

        model.updateLocation = updateLocation;
        model.deleteLocation = deleteLocation;

        function updateLocation() {
            locationService.updateLocation(model.locationId, model.location);
            $location.url('/user/' + model.userId + '/location');
        }

        function deleteLocation() {
            locationService.deleteLocation(model.locationId);
            $location.url('/user/' + model.userId + '/location');
        }
    }
})();
