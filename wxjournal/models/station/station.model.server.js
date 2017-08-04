var mongoose = require("mongoose");
var stationSchema = require("./station.schema.server");
var stationModel = mongoose.model("stationModel", stationSchema);

stationModel.createStation = createStation;
stationModel.deleteStation = deleteStation;
stationModel.findStationById = findStationById;
stationModel.findStationsByLocationId = findStationsByLocationId;
stationModel.updateStation = updateStation;

module.exports = stationModel;

function createStation(locationId, newStation) {
    // Populate foreign key
    newStation._location = locationId;
    return stationModel
        .create(newStation)
}

function deleteStation(stationId) {
    return stationModel
        .remove({_id : stationId})
}

function findStationById(stationId) {
    return stationModel
        .findById(stationId);
}

function findStationsByLocationId(locationId) {
    return stationModel
        .find({_location : locationId})
        // Populate is a mongoose finder transformation.
        // It is not a native mongo feature.
        //
        // This is very expensive. Do not do it alot.
        .populate("_location","locationName")
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

function updateStation(stationId, newStationValues) {
    return stationModel
        .update({_id: stationId},
            {$set: newStationValues});
}
