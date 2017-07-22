(function () {
    angular
        .module('WeatherJournal')
        .controller('locationNewController', locationNewController);

    function locationNewController($routeParams,
                                    $location,
                                    locationService) {
        var model = this;

        model.userId = $routeParams['userId'];

        function init() {
            model.locations = locationService.findAllLocationsForUser(model.userId);
        }
        init();

        model.createLocation = createLocation;

        function createLocation(location) {
            locationService.createLocation(model.userId, location);
            $location.url('/user/' + model.userId + '/location');
        }
    }
})();
