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
            stationService
                .findStationById(model.stationId)
                .then(
                    function successCallback(station) {
                        model.station = station;
                    },
                    function errorCallback(err) {
                        model.error = "System error, cannot retrieve station."
                    }
                );
        }
        init();

        model.deleteStation = deleteStation;
        model.updateStation = updateStation;

        function deleteStation() {
            stationService
                .deleteStation(model.stationId)
                .then(
                    function successCallback(deleted) {
                        $location.url('/user/' + model.userId + '/location/' + model.locationId + '/station');
                    },
                    function errorCallback(err) {
                        model.error = "System error, cannot delete station."
                    }
                );
        }

        function updateStation() {
            stationService
                .updateStation(model.stationId, model.station)
                .then(
                    function successCallback(updated) {
                        $location.url('/user/' + model.userId + '/location/' + model.locationId + '/station');
                    },
                    function errorCallback(err) {
                        model.error = "System error, cannot update station."
                    }
                );
        }
    }
})();
