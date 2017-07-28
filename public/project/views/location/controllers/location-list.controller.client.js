(function () {
    angular
        .module('WeatherJournal')
        .controller('locationListController', locationListController);

    function locationListController($routeParams,
                                    locationService) {
        var model = this;

        model.userId = $routeParams['userId'];

        function init() {
            locationService
                .findLocationsByUser(model.userId)
                .then(
                    function successCallback(locations) {
                        model.locations = locations;
                    },
                    function errorCallback(err) {
                        model.error = "System error, cannot fetch locations for user."
                    }
                );
        }
        init();
    }
})();
