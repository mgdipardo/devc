(function () {
    angular
        .module('WeatherJournal')
        .factory('journalService', journalService);

    function journalService() {

        var journals = [
            { "_id": "1000", "journalTimeStamp": "2017-04-23T18:25:43.511Z", "stationId": "404", "topic": "Forecast was high", "entry": "It did not get near as hot as the forecast predicted." }
        ];

        var api = {
            findAllJournalsForStation:findAllJournalsForStation,
            findJournalById:findJournalById,
            createJournal:createJournal,
            deleteJournal:deleteJournal,
            updateJournal:updateJournal
        };
        return api;

        function findAllJournalsForStation(stationId) {
            var stationJournals = [];
            for(var j in journals) {
                if(journals[j].stationId === stationId) {
                    stationJournals.push(journals[j]);
                }
            }
            return stationJournals;
        }

        function findJournalById(journalId) {
            for(var j in journals) {
                if(journals[j]._id === journalId)
                    return journals[j];
            }
            return null;
        }

        function createJournal(stationId, journal) {
            if(findJournalById(journal._id) === null) {
                journal._id = ""+Math.floor((Math.random() * 100) + 1);
                journal.stationId = stationId;
                journals.push(journal);
            }
        }

        function deleteJournal(journalId) {
            var journal = findJournalById(journalId);
            var index = journals.indexOf(journal);
            if(index !== null || typeof index !== 'undefined') {
                journals.splice(index, 1);
            }
        }

        function updateJournal(journalId, journal) {
            var index = null;
            for(var j in journals){
                if(journals[j]._id === journalId){
                    index = j;
                    break;
                }
            }
            if (index !== null) {
                journals.splice(index, 1);
                journals.push(journal);
            }
        }
    }
})();
