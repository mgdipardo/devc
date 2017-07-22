(function () {
    angular
        .module('WeatherJournal')
        .config(historyConfiguration);

    function historyConfiguration($routeProvider) {
        $routeProvider
        .when('/user/:userId/location/:locationId/station/:stationId/history',{
            templateUrl:'views/history/templates/history-list.view.client.html',
            controller:'historyListController',
            controllerAs:'model'
        })
    }
})();
