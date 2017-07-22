(function () {
    angular
        .module('WeatherJournal')
        .factory('analyticService', analyticService);

    function analyticService() {

        var analytics = [
            { "_id": "9666", "stationId": "404", "atOrAbove": "100.0", "duration": "Greater than 1 day", "span": "August-September, 2017" }
        ];

        var api = {
            findAllAnalyticsForStation:findAllAnalyticsForStation
            //findAllHistoryForDate:findAllHistoryForDate
        };
        return api;

        function findAllAnalyticsForStation(stationId) {
            var stationAnalytics = [];
            for(var j in analytics) {
                if(analytics[j].stationId === stationId) {
                    stationAnalytics.push(analytics[j]);
                }
            }
            return stationAnalytics;
        }
    }
})();
