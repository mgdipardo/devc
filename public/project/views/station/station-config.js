(function () {
    angular
        .module("WeatherJournal")
        .config(stationConfiguration);

    function stationConfiguration($routeProvider) {
        $routeProvider
            .when("/user/:userId/location/:locationId/station",{
                templateUrl:"views/station/templates/station-list.view.client.html",
                controller:"stationListController",
                controllerAs:"model"
            })
            .when("/user/:userId/location/:locationId/station/new",{
                templateUrl:"views/station/templates/station-new.view.client.html",
                controller:"stationNewController",
                controllerAs:"model"
            })
            .when("/user/:userId/location/:locationId/station/:stationId",{
                templateUrl:"views/station/templates/station-edit.view.client.html",
                controller:"stationEditController",
                controllerAs:"model"
            })
    }
})();
