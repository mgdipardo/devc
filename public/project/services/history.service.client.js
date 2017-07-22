(function () {
    angular
        .module('WeatherJournal')
        .factory('historyService', historyService);

    function historyService() {

        var histories = [
            { "_id": "6666", "historyDate": "2017-04-23", "stationId": "404", "highTemp": "80.4", "lowTemp": "55.3", "precipation": "0.3", "highWind": "22.8" },
            { "_id": "6667", "historyDate": "2017-04-24", "stationId": "404", "highTemp": "77.4", "lowTemp": "59.3", "precipation": "0.0", "highWind": "15.8" },
            { "_id": "6668", "historyDate": "2017-04-25", "stationId": "404", "highTemp": "80.4", "lowTemp": "55.3", "precipation": "0.3", "highWind": "22.8" },
            { "_id": "6669", "historyDate": "2017-04-26", "stationId": "404", "highTemp": "77.4", "lowTemp": "59.3", "precipation": "0.0", "highWind": "15.8" }
        ];

        var api = {
            findAllHistoryForStation:findAllHistoryForStation
            //findAllHistoryForDate:findAllHistoryForDate
        };
        return api;

        function findAllHistoryForStation(stationId) {
            var stationHistories = [];
            for(var j in histories) {
                if(histories[j].stationId === stationId) {
                    stationHistories.push(histories[j]);
                }
            }
            return stationHistories;
        }
    }
})();
