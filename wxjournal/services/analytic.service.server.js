module.exports = function(app) {

    var analytics = [
        { "_id": "9666", "stationId": "404", "atOrAbove": "100.0", "duration": "Greater than 1 day", "span": "August-September, 2017" }
    ];

    app.get("/api/station/:stationId/analytic", findAnalyticsByStationId);

    function findAnalyticsByStationId(req, res) {
        var stationId = req.params.stationId;
        var stationAnalytics = [];
        for(var a in analytics) {
            if(analytics[a].stationId === stationId) {
                stationAnalytics.push(analytics[a]);
            }
        }
        res.json(stationAnalytics);
    }
};
