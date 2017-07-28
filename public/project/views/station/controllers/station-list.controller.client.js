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
            stationService
                .findStationsByLocationId(model.locationId)
                .then(
                    function successCallback(stations) {
                        model.stations = stations;
                    },
                    function errorCallback(err) {
                        model.error = "System error, cannot retrieve location stations."
                    }
                );
        }
        init();
    }
})();
