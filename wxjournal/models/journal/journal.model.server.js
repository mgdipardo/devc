var mongoose = require("mongoose");
var journalSchema = require("./journal.schema.server");
var journalModel = mongoose.model("journalModel", journalSchema);

journalModel.createJournal = createJournal;
journalModel.deleteJournal = deleteJournal;
journalModel.findJournalById = findJournalById;
journalModel.findJournalsByStationId = findJournalsByStationId;
journalModel.updateJournal = updateJournal;

module.exports = journalModel;

function createJournal(stationId, newJournal) {
    // Populate foreign key
    newJournal._station = stationId;
    return journalModel
        .create(newJournal)
}

function deleteJournal(journalId) {
    return journalModel
        .remove({_id : journalId})
}

function findJournalById(journalId) {
    return journalModel
        .findById(journalId);
}

function findJournalsByStationId(stationId) {
    return journalModel
        .find({_station : stationId})
        // Populate is a mongoose finder transformation.
        // It is not a native mongo feature.
        //
        // This is very expensive. Do not do it alot.
        .populate("_station","stationName")
        // You can have multiple transformations. At the
        // end of them, you tell mongoose to execute all
        // of them...with exec().
        //
        // PS: The Weather Journal app does not display
        // the username on any of its renderings. This
        // is here to show us how to do a "join" if we
        // need to.
        .exec();
}

function updateJournal(journalId, newJournalValues) {
    return journalModel
        .update({_id: journalId},
            {$set: newJournalValues});
}
