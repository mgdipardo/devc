(function () {
    angular
        .module('WeatherJournal')
        .controller('historyListController', historyListController);

    function historyListController($routeParams,
                                    historyService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.locationId = $routeParams['locationId'];
        model.stationId = $routeParams['stationId'];

        function init() {
            model.histories = historyService.findAllHistoryForStation(model.stationId);
        }
        init();
    }
})();
