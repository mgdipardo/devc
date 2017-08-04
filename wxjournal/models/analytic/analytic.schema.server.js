var mongoose = require("mongoose");

var analyticSchema = mongoose.Schema({
    _station: {type: mongoose.Schema.Types.ObjectId, ref: "stationModel"},
    atOrAbove: String,
    duration: String,
    span: String,
    dateCreated: {type: Date, default: Date.now}
}, {collection : "analytic"});

module.exports = analyticSchema;
