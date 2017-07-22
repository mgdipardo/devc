(function () {
    angular
        .module('WeatherJournal')
        .controller('stationEditController', stationEditController);

    function stationEditController($routeParams,
                                    $location,
                                    stationService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.locationId = $routeParams['locationId'];
        model.stationId = $routeParams['stationId'];

        function init() {
            model.stations = stationService.findAllStationsForLocation(model.locationId);
            model.station = stationService.findStationById(model.stationId);
        }
        init();

        model.updateStation = updateStation;
        model.deleteStation = deleteStation;

        function updateStation() {
            stationService.updateStation(model.stationId, model.station);
            $location.url('/user/' + model.userId + '/location/' + model.locationId + '/station');
        }

        function deleteStation() {
            stationService.deleteStation(model.stationId);
            $location.url('/user/' + model.userId + '/location/' + model.locationId + '/station');
        }
    }
})();
