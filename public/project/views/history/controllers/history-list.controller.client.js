(function () {
    angular
        .module("WeatherJournal")
        .controller("historyListController", historyListController);

    function historyListController($routeParams,
                                    historyService) {
        var model = this;

        model.userId = $routeParams["userId"];
        model.locationId = $routeParams["locationId"];
        model.stationId = $routeParams["stationId"];

        function init() {
            historyService
                .findHistoriesByStationId(model.stationId)
                .then(successCallback, errorCallback);
            function successCallback(histories) {
                model.histories = histories;
            }
            function errorCallback(err) {
                model.error = "System error, cannot retrieve station histories."
            }
        }
        init();
    }
})();
