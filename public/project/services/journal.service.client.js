(function () {
    angular
        .module('WeatherJournal')
        .factory('journalService', journalService);

    function journalService($http) {

        var api = {
            createJournal:createJournal,
            deleteJournal:deleteJournal,
            findJournalById:findJournalById,
            findJournalsByStationId:findJournalsByStationId,
            updateJournal:updateJournal
        };
        return api;

        function createJournal(stationId, journal) {
            return $http
                .post("/api/station/" + stationId + "/journal", journal)
                .then(
                    function (res) {
                        return res.data;
                    }
                );
        }

        function deleteJournal(journalId) {
            return $http
                .delete("/api/journal/" + journalId)
                .then(
                    function (res) {
                        return true;
                    },
                    function (err) {
                        return false;
                    }
                );
        }

        function findJournalById(journalId) {
            return $http
                .get("/api/journal/" + journalId)
                .then(
                    function (res) {
                        return res.data;
                    }
                );
        }

        function findJournalsByStationId(stationId) {
            return $http
                .get("/api/station/" + stationId + "/journal")
                .then(
                    function (res) {
                        return res.data;
                    }
                );
        }

        function updateJournal(journalId, journal) {
            return $http
                .put("/api/journal/" + journalId, journal)
                .then(
                    function (res) {
                        return true;
                    },
                    function (err) {
                        return false;
                    }
                );
        }

        // var stationJournals = [];
        // for(var j in journals) {
        //     if(journals[j].stationId === stationId) {
        //         stationJournals.push(journals[j]);
        //     }
        // }
        // return stationJournals;

        // function findJournalById(journalId) {
        //     for(var j in journals) {
        //         if(journals[j]._id === journalId)
        //             return journals[j];
        //     }
        //     return null;
        // }
        //
        // function createJournal(stationId, journal) {
        //     if(findJournalById(journal._id) === null) {
        //         journal._id = ""+Math.floor((Math.random() * 100) + 1);
        //         journal.stationId = stationId;
        //         journals.push(journal);
        //     }
        // }
        //
        // function deleteJournal(journalId) {
        //     var journal = findJournalById(journalId);
        //     var index = journals.indexOf(journal);
        //     if(index !== null || typeof index !== 'undefined') {
        //         journals.splice(index, 1);
        //     }
        // }
        //
        // function updateJournal(journalId, journal) {
        //     var index = null;
        //     for(var j in journals){
        //         if(journals[j]._id === journalId){
        //             index = j;
        //             break;
        //         }
        //     }
        //     if (index !== null) {
        //         journals.splice(index, 1);
        //         journals.push(journal);
        //     }
        // }
    }
})();
