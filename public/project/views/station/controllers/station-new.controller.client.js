(function () {
    angular
        .module('WeatherJournal')
        .controller('stationNewController', stationNewController);

    function stationNewController($routeParams,
                                    $location,
                                    stationService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.locationId = $routeParams['locationId'];

        function init() {
            model.stations = stationService.findAllStationsForLocation(model.locationId);
            model.station = stationService.findStationById(model.stationId);
        }
        init();

        model.createStation = createStation;

        function createStation(station) {
            stationService.createStation(model.locationId, station);
            $location.url('/user/' + model.userId + '/location/' + model.locationId + '/station');
        }
    }
})();
