(function () {
    angular
        .module('WeatherJournal')
        .controller('settingController', settingController);

    function settingController($location,
                                $routeParams,
                                userService) {

        var model = this;

        model.userId = $routeParams['userId'];

        model.updateUser = updateUser;

        model.user = userService.findUserByUserId(model.userId);

        function updateUser() {
            var success = userService.updateUser(model.userId, model.user);
            if(success)
                $location.url('/');
            else
                model.message = "profile update error";
        }
    }
})();
