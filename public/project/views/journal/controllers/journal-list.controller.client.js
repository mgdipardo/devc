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
            journalService
                .findJournalsByStationId(model.stationId)
                .then(
                    function successCallback(journals) {
                        model.journals = journals;
                    },
                    function errorCallback(err) {
                        model.error = "System error, cannot retrieve station journals."
                    }
                );
        }
        init();
    }
})();
