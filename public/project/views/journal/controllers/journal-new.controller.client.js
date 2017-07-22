(function () {
    angular
        .module('WeatherJournal')
        .controller('journalNewController', journalNewController);

    function journalNewController($routeParams,
                                    $location,
                                    journalService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.locationId = $routeParams['locationId'];
        model.stationId = $routeParams['stationId'];

        function init() {
            model.journals = journalService.findAllJournalsForStation(model.stationId);
            model.journal = journalService.findJournalById(model.journalId);
        }
        init();

        model.createJournal = createJournal;

        function createJournal(journal) {
            journalService.createJournal(model.stationId, journal);
            $location.url('/user/' + model.userId + '/location/' + model.locationId + '/station/' + model.stationId + '/journal');
        }
    }
})();
