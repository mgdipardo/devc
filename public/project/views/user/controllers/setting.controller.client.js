(function () {
    angular
        .module('WeatherJournal')
        .controller('settingController', settingController);

    function settingController($location,$routeParams,userService) {
        var model = this;
        model.userId = $routeParams['userId'];

        model.updateUser = updateUser;

        model.user = userService.findUserByUserId(model.userId);

        function updateUser(userId, user) {
            userService.updateUser(userId, user);
        }
    }
})();
