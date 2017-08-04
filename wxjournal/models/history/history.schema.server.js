var mongoose = require("mongoose");

var historySchema = mongoose.Schema({
    _station: {type: mongoose.Schema.Types.ObjectId, ref: "stationModel"},
    highTemp: String,
    lowTemp: String,
    precipitation: String,
    highWind: String,
    dateCreated: {type: Date, default: Date.now}
}, {collection : "history"});

module.exports = historySchema;
