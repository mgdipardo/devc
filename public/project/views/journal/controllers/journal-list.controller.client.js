(function () {
    angular
        .module('WeatherJournal')
        .controller('journalListController', journalListController);

    function journalListController($routeParams,
                                    journalService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.locationId = $routeParams['locationId'];
        model.stationId = $routeParams['stationId'];

        function init() {
            model.journals = journalService.findAllJournalsForStation(model.stationId);
        }
        init();
    }
})();
