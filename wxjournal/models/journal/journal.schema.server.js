var mongoose = require("mongoose");

var journalSchema = mongoose.Schema({
    _station: {type: mongoose.Schema.Types.ObjectId, ref: "stationModel"},
    topic: String,
    entry: String,
    dateCreated: {type: Date, default: Date.now}
}, {collection : "journal"});

module.exports = journalSchema;
