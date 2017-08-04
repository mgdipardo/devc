(function () {
    angular
        .module("WeatherJournal")
        .config(locationConfiguration);

    function locationConfiguration($routeProvider) {
        $routeProvider
            .when("/user/:userId/location",{
                templateUrl:"views/location/templates/location-list.view.client.html",
                controller:"locationListController",
                controllerAs:"model"
            })
            .when("/user/:userId/location/new",{
                templateUrl:"views/location/templates/location-new.view.client.html",
                controller:"locationNewController",
                controllerAs:"model"
            })
            .when("/user/:userId/location/:locationId",{
                templateUrl:"views/location/templates/location-edit.view.client.html",
                controller:"locationEditController",
                controllerAs:"model"
            })
    }
})();
