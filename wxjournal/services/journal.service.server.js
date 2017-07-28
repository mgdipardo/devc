module.exports = function(app) {

    var journals = [
        { "_id": "1000", "journalTimeStamp": "2017-04-23T18:25:43.511Z", "stationId": "404", "topic": "Forecast was high", "entry": "It did not get near as hot as the forecast predicted." },
        { "_id": "1001", "journalTimeStamp": "2017-04-24T18:25:43.511Z", "stationId": "404", "topic": "my was high", "entry": "It did not get near as hot as the forecast predicted." },
        { "_id": "1002", "journalTimeStamp": "2017-04-25T18:25:43.511Z", "stationId": "404", "topic": "theirs was high", "entry": "It did not get near as hot as the forecast predicted." }
    ];

    app.post("/api/station/:stationId/journal", createJournal);
    app.delete("/api/journal/:journalId", deleteJournal);
    app.get("/api/journal/:journalId", findJournalById);
    app.get("/api/station/:stationId/journal", findJournalsByStationId);
    app.put("/api/journal/:journalId", updateJournal);

    function createJournal(req, res) {
        var journal = req.body;
        journal.stationId = req.params.stationId;
        journal._id = ""+Math.floor((Math.random() * 100) + 1);
        journals.unshift(journal);
        res.json(journal);
    }

    function deleteJournal(req, res) {
        var journalId = req.params.journalId;
        var index = -1;
        for(var j in journals){
            if(journals[j]._id === journalId){
                index = j;
                break;
            }
        }
        if (index > -1) {
            journals.splice(index, j);
            res.sendStatus(200);
            return;
        }
        res.sendStatus(404);
    }

    function findJournalById(req, res) {
        var journalId = req.params.journalId;
        for(var j in journals) {
            if(journals[j]._id === journalId) {
                res.json(journals[j]);
                return;
            }
        }
    }

    function findJournalsByStationId(req, res) {
        var stationId = req.params.stationId;
        var stationJournals = [];
        for(var j in journals) {
            if(journals[j].stationId === stationId) {
                stationJournals.push(journals[j]);
            }
        }
        res.json(stationJournals);
    }

    function updateJournal(req, res) {
        var journalId = req.params.journalId;
        var newJournalValues = req.body;
        var index = -1;
        for(var j in journals){
            if(journals[j]._id === journalId){
                index = j;
                break;
            }
        }
        if (index > -1) {
            newJournalValues._id = journals[index]._id;
            journals.splice(index,j);
            journals.push(newJournalValues);
            res.sendStatus(200);
            return;
        }
        res.sendStatus(404);
    }
};
