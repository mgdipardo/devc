(function () {
    angular
        .module("WeatherJournal")
        .controller("stationEditController", stationEditController);

    function stationEditController($routeParams,
                                    $location,
                                    stationService) {
        var model = this;

        model.userId = $routeParams["userId"];
        model.locationId = $routeParams["locationId"];
        model.stationId = $routeParams["stationId"];

        function init() {
            stationService
                .findStationsByLocationId(model.locationId)
                .then(successCallbackList, errorCallbackList);
            function successCallbackList(stations) {
                model.stations = stations;
            }
            function errorCallbackList(err) {
                model.error = "System error, cannot retrieve location stations."
            }
            stationService
                .findStationById(model.stationId)
                .then(successCallbackOne, errorCallbackOne);
            function successCallbackOne(station) {
                model.station = station;
            }
            function errorCallbackOne(err) {
                model.error = "System error, cannot retrieve station."
            }
        }
        init();

        model.deleteStation = deleteStation;
        model.updateStation = updateStation;

        function deleteStation() {
            stationService
                .deleteStation(model.stationId)
                .then(successCallback, errorCallback);
            function successCallback(deleted) {
                $location.url("/user/" + model.userId + "/location/" + model.locationId + "/station");
            }
            function errorCallback(err) {
                model.error = "System error, cannot delete station."
            }
        }

        function updateStation() {
            stationService
                .updateStation(model.stationId, model.station)
                .then(successCallback, errorCallback);
            function successCallback(updated) {
                $location.url("/user/" + model.userId + "/location/" + model.locationId + "/station");
            }
            function errorCallback(err) {
                model.error = "System error, cannot update station."
            }
        }
    }
})();
