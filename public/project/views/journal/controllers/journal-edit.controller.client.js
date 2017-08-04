(function () {
    angular
        .module("WeatherJournal")
        .controller("journalEditController", journalEditController);

    function journalEditController($routeParams,
                                    $location,
                                    journalService) {
        var model = this;

        model.userId = $routeParams["userId"];
        model.locationId = $routeParams["locationId"];
        model.stationId = $routeParams["stationId"];
        model.journalId = $routeParams["journalId"];

        function init() {
            journalService
                .findJournalsByStationId(model.stationId)
                .then(successCallbackList, errorCallbackList);
            function successCallbackList(journals) {
                model.journals = journals;
            }
            function errorCallbackList(err) {
                model.error = "System error, cannot retrieve station journals."
            }
            journalService
                .findJournalById(model.journalId)
                .then(successCallbackOne, errorCallbackOne);
            function successCallbackOne(journal) {
                model.journal = journal;
            }
            function errorCallbackOne(err) {
                model.error = "System error, cannot retrieve journal."
            }
        }
        init();

        model.deleteJournal = deleteJournal;
        model.updateJournal = updateJournal;

        function deleteJournal() {
            journalService
                .deleteJournal(model.journalId)
                .then(successCallback, errorCallback);
            function successCallback(deleted) {
                $location.url("/user/" + model.userId + "/location/" + model.locationId + "/station/" + model.stationId + "/journal");
            }
            function errorCallback(err) {
                model.error = "System error, cannot delete journal."
            }
        }
        function updateJournal() {
            journalService
                .updateJournal(model.journalId, model.journal)
                .then(successCallback, errorCallback);
            function successCallback(updated) {
                $location.url("/user/" + model.userId + "/location/" + model.locationId + "/station/" + model.stationId + "/journal");
            }
            function errorCallback(err) {
                model.error = "System error, cannot update journal."
            }
        }
    }
})();
