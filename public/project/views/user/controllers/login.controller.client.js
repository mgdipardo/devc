(function () {
    angular
        .module('WeatherJournal')
        .controller('loginController', loginController);

    function loginController($location,
                            userService) {

        var model = this; //current instance of the controller

        model.login = login;

        function login(username, password) {
            userService
                .findUserByCredentials(username, password)
                .then(
                    function successCallback(user) {
                        $location.url('/user/' + user._id);
                    },
                    function errorCallback(res) {
                        model.error = "The username and password are not found. Please try again.";
                    }
                );
        }
    }
})();
