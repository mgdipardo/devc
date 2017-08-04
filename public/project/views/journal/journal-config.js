(function () {
    angular
        .module("WeatherJournal")
        .config(journalConfiguration);

    function journalConfiguration($routeProvider) {
        $routeProvider
        .when("/user/:userId/location/:locationId/station/:stationId/journal",{
            templateUrl:"views/journal/templates/journal-list.view.client.html",
            controller:"journalListController",
            controllerAs:"model"
        })
        .when("/user/:userId/location/:locationId/station/:stationId/journal/new",{
            templateUrl:"views/journal/templates/journal-new.view.client.html",
            controller:"journalNewController",
            controllerAs:"model"
        })
        .when("/user/:userId/location/:locationId/station/:stationId/journal/:journalId",{
            templateUrl:"views/journal/templates/journal-edit.view.client.html",
            controller:"journalEditController",
            controllerAs:"model"
        })
    }
})();
