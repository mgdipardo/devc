(function () {
    angular
        .module("WeatherJournal")
        .controller("journalNewController", journalNewController);

    function journalNewController($routeParams,
                                    $location,
                                    journalService) {
        var model = this;

        model.userId = $routeParams["userId"];
        model.locationId = $routeParams["locationId"];
        model.stationId = $routeParams["stationId"];

        function init() {
            journalService
                .findJournalsByStationId(model.stationId)
                .then(successCallback, errorCallback);
            function successCallback(journals) {
                model.journals = journals;
            }
            function errorCallback(err) {
                model.error = "System error, cannot retrieve station journals."
            }
        }
        init();

        model.createJournal = createJournal;

        function createJournal(journal) {
            journalService
                .createJournal(model.stationId, journal)
                .then(successCallback, errorCallback);
            function successCallback(journal) {
                $location.url("/user/" + model.userId + "/location/" + model.locationId + "/station/" + model.stationId + "/journal");
            }
            function errorCallback(err) {
                model.error = "System error, cannot create journal."
            }
        }
    }
})();
