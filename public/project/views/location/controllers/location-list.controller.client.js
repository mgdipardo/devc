(function () {
    angular
        .module('WeatherJournal')
        .controller('locationListController', locationListController);

    function locationListController($routeParams,
                                    locationService) {
        var model = this;

        model.userId = $routeParams['userId'];

        function init() {
            model.locations = locationService.findAllLocationsForUser(model.userId);
        }
        init();
    }
})();
