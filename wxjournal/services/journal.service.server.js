var app = require("../../express.js");
var journalModel = require("../models/journal/journal.model.server.js");

// var journals = [
//     { "_id": "1000", "journalTimeStamp": "2017-04-23T18:25:43.511Z", "stationId": "404", "topic": "Forecast was high", "entry": "It did not get near as hot as the forecast predicted." },
//     { "_id": "1001", "journalTimeStamp": "2017-04-24T18:25:43.511Z", "stationId": "404", "topic": "my was high", "entry": "It did not get near as hot as the forecast predicted." },
//     { "_id": "1002", "journalTimeStamp": "2017-04-25T18:25:43.511Z", "stationId": "404", "topic": "theirs was high", "entry": "It did not get near as hot as the forecast predicted." }
// ];

app.post("/wxj/api/station/:stationId/journal", createJournal);
app.delete("/wxj/api/journal/:journalId", deleteJournal);
app.get("/wxj/api/journal/:journalId", findJournalById);
app.get("/wxj/api/station/:stationId/journal", findJournalsByStationId);
app.put("/wxj/api/journal/:journalId", updateJournal);

function createJournal(req, res) {
    var stationId = req.params.stationId;
    var newJournal = req.body;
    journalModel
        .createJournal(stationId, newJournal)
        // What is returned from createStation by mongoose
        // is a "doc" containing the newly created journal.
        .then(function (newlyCreatedJournal) {
            res.json(newlyCreatedJournal);
        }, function (err) {
            res.sendStatus(404);
        });
}

function deleteJournal(req, res) {
    var journalId = req.params.journalId;
    journalModel
        .deleteJournal(journalId)
        // There is no "doc" returned by mongoose,
        // only a status for a delete.
        .then(function (status) {
            res.send(status)
        });
}

function findJournalById(req, res) {
    var journalId = req.params.journalId;
    journalModel
        .findJournalById(journalId)
        .then(function (journal) {
            res.json(journal);
        });
}

function findJournalsByStationId(req, res) {
    var stationId = req.params.stationId;
    journalModel
        .findJournalsByStationId(stationId)
        // station is the "doc" returned by mongoose
        .then(function (journal) {
            res.json(journal);
        });
}

function updateJournal(req, res) {
    var journalId = req.params.journalId;
    var newJournalValues = req.body;
    journalModel
        .updateJournal(journalId, newJournalValues)
        // There is no "doc" returned by mongoose,
        // only a status for a delete.
        .then(function (status) {
           res.send(status);
        });
}
