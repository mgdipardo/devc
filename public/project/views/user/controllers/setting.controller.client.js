(function () {
    angular
        .module("WeatherJournal")
        .controller("settingController", settingController);

    function settingController($location,
                                $routeParams,
                                userService) {

        var model = this;

        model.userId = $routeParams["userId"];
        model.deleteUser = deleteUser;
        model.updateUser = updateUser;

        function init() {
            userService
                .findUserById(model.userId)
                .then(successCallback, errorCallback);
            function successCallback(user) {
                model.user = user;
            }
            function errorCallback(err) {
                model.error = "System error, unknown user request."
            }
        }
        init();

        function deleteUser() {
            userService
                .deleteUser(model.userId)
                .then(successCallback, errorCallback);
            function successCallback(success){
                $location.url("/");
            }
            function errorCallback(err){
                model.error = "System error, the user cannot be removed."
            }
        }

        function updateUser() {
            userService
                .updateUser(model.userId, model.user)
                .then(successCallback, errorCallback);
            function successCallback(success){
                model.message = "Settings have been updated successfully."
            }
            function errorCallback(err){
                model.error = "System error, the settings cannot be updated."
            }
        }
    }
})();
