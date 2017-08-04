var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
    username : {type : String, unique : true},
    password : String,
    firstName : String,
    lastName : String,
    email : String,
    phone : String,
    defaultLocation : String,
    defaultStation : String,
    defaultStartMethod : String,
    dateCreated : {type : Date, default: Date.now}
}, {collection : "user"});

module.exports = userSchema;
