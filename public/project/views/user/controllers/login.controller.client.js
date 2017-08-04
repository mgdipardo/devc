(function () {
    angular
        .module("WeatherJournal")
        .controller("loginController", loginController);

    function loginController($location,
                            userService) {

        var model = this; //current instance of the controller
        model.login = login;

        function login(username, password) {

            if(username === null || username === "" || typeof username === "undefined") {
                model.error = "Username field cannot be empty.";
                return;
            }

            if(password === null || password ==="" || typeof password === "undefined") {
                model.error = "Password field cannot be empty.";
                return;
            }

            userService
                .findUserByCredentials(username, password)
                .then(successCallback, errorCallback);

            function successCallback(user) {
                $location.url("/user/" + user._id);
            }

            function errorCallback(res) {
                model.error = "The username and password are not found. Please try again.";
            }
        }
    }
})();
