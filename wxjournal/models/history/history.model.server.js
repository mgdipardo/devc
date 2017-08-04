var mongoose = require("mongoose");
var historySchema = require("./history.schema.server");
var historyModel = mongoose.model("historyModel", historySchema);

historyModel.findHistoriesByStationId = findHistoriesByStationId;

module.exports = historyModel;

function findHistoriesByStationId(stationId) {
    return historyModel
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
