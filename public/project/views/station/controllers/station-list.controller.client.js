(function () {
    angular
        .module('WeatherJournal')
        .controller('stationListController', stationListController);

    function stationListController($routeParams,
                                    stationService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.locationId = $routeParams['locationId'];

        function init() {
            model.stations = stationService.findAllStationsForLocation(model.locationId);
        }
        init();
    }
})();
