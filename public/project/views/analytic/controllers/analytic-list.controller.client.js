(function () {
    angular
        .module('WeatherJournal')
        .controller('analyticListController', analyticListController);

    function analyticListController($routeParams,
                                    analyticService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.locationId = $routeParams['locationId'];
        model.stationId = $routeParams['stationId'];

        function init() {
            model.analytics = analyticService.findAllAnalyticsForStation(model.stationId);
        }
        init();
    }
})();
