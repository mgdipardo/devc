(function () {
    angular
        .module("WeatherJournal")
        .factory("journalService", journalService);

    function journalService($http) {

        var api = {
            createJournal:createJournal,
            deleteJournal:deleteJournal,
            findJournalById:findJournalById,
            findJournalsByStationId:findJournalsByStationId,
            updateJournal:updateJournal
        };
        return api;

        function createJournal(stationId, newJournal) {
            var url = "/wxj/api/station/" + stationId + "/journal", newJournal;
            return $http.post(url, newJournal)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteJournal(journalId) {
            var url = "/wxj/api/journal/" + journalId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findJournalById(journalId) {
            var url = "/wxj/api/journal/" + journalId;
            return $http.get(url)
                .then(function (response) {
                   return response.data;
                });
        }

        function findJournalsByStationId(stationId) {
            var url = "/wxj/api/station/" + stationId + "/journal";
            return $http.get(url)
                .then(function (response) {
                   return response.data;
                });
        }

        function updateJournal(journalId, newJournalValues) {
            var url = "/wxj/api/journal/" + journalId, newJournalValues;
            return $http.put(url, newJournalValues)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();
