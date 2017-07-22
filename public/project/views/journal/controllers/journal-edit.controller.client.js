(function () {
    angular
        .module('WeatherJournal')
        .controller('journalEditController', journalEditController);

    function journalEditController($routeParams,
                                    $location,
                                    journalService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.locationId = $routeParams['locationId'];
        model.stationId = $routeParams['stationId'];
        model.journalId = $routeParams['journalId'];

        function init() {
            model.journals = journalService.findAllJournalsForStation(model.stationId);
            model.journal = journalService.findJournalById(model.journalId);
        }
        init();

        model.updateJournal = updateJournal;
        model.deleteJournal = deleteJournal;

        function updateJournal() {
            journalService.updateJournal(model.journalId, model.journal);
            $location.url('/user/' + model.userId + '/location/' + model.locationId + '/station/' + model.stationId + '/journal');
        }

        function deleteJournal() {
            journalService.deleteJournal(model.journalId);
            $location.url('/user/' + model.userId + '/location/' + model.locationId + '/station/' + model.stationId + '/journal');
        }
    }
})();
