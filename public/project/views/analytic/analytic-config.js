(function () {
    angular
        .module('WeatherJournal')
        .config(analyticConfiguration);

    function analyticConfiguration($routeProvider) {
        $routeProvider
        .when('/user/:userId/location/:locationId/station/:stationId/analytic',{
            templateUrl:'views/analytic/templates/analytic-list.view.client.html',
            controller:'analyticListController',
            controllerAs:'model'
        })
    }
})();
