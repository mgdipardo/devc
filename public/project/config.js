(function () {
    angular
        .module('WeatherJournal')
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when('/',{
                templateUrl:'home.html'
            })
    }

})();
