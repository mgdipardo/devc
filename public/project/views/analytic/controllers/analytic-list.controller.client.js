(function () {
    angular
        .module("WeatherJournal")
        .controller("analyticListController", analyticListController);

    function analyticListController($routeParams,
                                    analyticService) {
        var model = this;

        model.userId = $routeParams["userId"];
        model.locationId = $routeParams["locationId"];
        model.stationId = $routeParams["stationId"];

        function init() {
            analyticService
                .findAnalyticsByStationId(model.stationId)
                .then(successCallback, errorCallback);
            function successCallback(analytics) {
                model.analytics = analytics;
            }
            function errorCallback(err) {
                model.error = "System error, cannot retrieve station analytics."
            }
        }
        init();
    }
})();
