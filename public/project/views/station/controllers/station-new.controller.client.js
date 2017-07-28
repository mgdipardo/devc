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

        model.createStation = createStation;

        function createStation(station) {
            stationService
                .createStation(model.locationId, station)
                .then(
                    function successCallback(station) {
                        $location.url('/user/' + model.userId + '/location/' + model.locationId + '/station');
                    },
                    function errorCallback(err) {
                        model.error = "System error, cannot create station."
                    }
                );
        }
    }
})();
