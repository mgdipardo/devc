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
            journalService
                .findJournalById(model.journalId)
                .then(
                    function successCallback(journal) {
                        model.journal = journal;
                    },
                    function errorCallback(err) {
                        model.error = "System error, cannot retrieve journal."
                    }
                );
        }
        init();

        model.deleteJournal = deleteJournal;
        model.updateJournal = updateJournal;

        function deleteJournal() {
            journalService
                .deleteJournal(model.journalId)
                .then(
                    function successCallback(deleted) {
                        $location.url('/user/' + model.userId + '/location/' + model.locationId + '/station/' + model.stationId + '/journal');
                    },
                    function errorCallback(err) {
                        model.error = "System error, cannot delete journal."
                    }
                );

        }
        function updateJournal() {
            journalService
                .updateJournal(model.journalId, model.journal)
                .then(
                    function successCallback(updated) {
                        $location.url('/user/' + model.userId + '/location/' + model.locationId + '/station/' + model.stationId + '/journal');
                    },
                    function errorCallback(err) {
                        model.error = "System error, cannot update journal."
                    }
                );
        }
    }
})();
