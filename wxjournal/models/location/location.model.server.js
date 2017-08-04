var mongoose = require("mongoose");
var locationSchema = require("./location.schema.server");
var locationModel = mongoose.model("locationModel", locationSchema);

locationModel.createLocation = createLocation;
locationModel.deleteLocation = deleteLocation;
locationModel.findLocationById = findLocationById;
locationModel.findLocationsByUser = findLocationsByUser;
locationModel.updateLocation = updateLocation;

module.exports = locationModel;

function createLocation(userId, newLocation) {
    // Populate foreign key
    newLocation._user = userId;
    return locationModel
        .create(newLocation)
}

function deleteLocation(locationId) {
    return locationModel
        .remove({_id : locationId})
}

function findLocationById(locationId) {
    return locationModel
        .findById(locationId);
}

function findLocationsByUser(userId) {
    return locationModel
        .find({_user : userId})
        // Populate is a mongoose finder transformation.
        // It is not a native mongo feature.
        //
        // This is very expensive. Do not do it alot.
        .populate("_user","username")
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

function updateLocation(locationId, newLocationValues) {
    return locationModel
        .update({_id: locationId},
            {$set: newLocationValues});
}
