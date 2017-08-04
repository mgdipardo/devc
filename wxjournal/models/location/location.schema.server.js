var mongoose = require("mongoose");

var locationSchema = mongoose.Schema({
    _user: {type: mongoose.Schema.Types.ObjectId, ref: "userModel"},
    locationName: String,
    state: String,
    zipcode : String,
    dateCreated: {type: Date, default: Date.now}
}, {collection : "location"});

module.exports = locationSchema;
