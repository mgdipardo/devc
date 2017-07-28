(function () {
    angular
        .module('WeatherJournal')
        .factory('historyService', historyService);

    function historyService($http) {

        var api = {
            findHistoriesByStationId:findHistoriesByStationId
        };
        return api;

        function findHistoriesByStationId(stationId) {
            return $http
                .get("/api/station/" + stationId + "/history")
                .then(
                    function (res) {
                        return res.data;
                    }
                );
        }
    }
})();
