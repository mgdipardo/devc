var mongoose = require("mongoose");
var analyticSchema = require("./analytic.schema.server");
var analyticModel = mongoose.model("analyticModel", analyticSchema);

analyticModel.findAnalyticsByStationId = findAnalyticsByStationId;

module.exports = analyticModel;

function findAnalyticsByStationId(stationId) {
    return analyticModel
        .find({_station : stationId})
        // Populate is a mongoose finder transformation.
        // It is not a native mongo feature.
        //
        // This is very expensive. Do not do it alot.
        .populate("_station","stationName")
        // You can have multiple transformations. At the
        // end of them, you tell mongoose to execute all
        // of them...with exec().
        .exec();
}
