(function () {
    angular
        .module('WeatherJournal')
        .factory('analyticService', analyticService);

    function analyticService($http) {

        var api = {
            findAnalyticsByStationId:findAnalyticsByStationId
        };
        return api;

        function findAnalyticsByStationId(stationId) {
            return $http
                .get("/api/station/" + stationId + "/analytic")
                .then(
                    function (res) {
                        return res.data;
                    }
                );
        }
    }
})();
