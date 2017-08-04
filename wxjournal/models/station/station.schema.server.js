var mongoose = require("mongoose");

var stationSchema = mongoose.Schema({
    _location: {type: mongoose.Schema.Types.ObjectId, ref: "locationModel"},
    stationName: String,
    coordinate: String,
    elevation : String,
    dateCreated: {type: Date, default: Date.now}
}, {collection : "station"});

module.exports = stationSchema;
