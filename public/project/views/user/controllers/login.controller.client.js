(function () {
    angular
        .module('WeatherJournal')
        .controller('loginController', loginController);

    function loginController($location,userService) {

        var model = this; //current instance of the controller

        model.login = login;

        function login(username, password) {
            var found = userService.findUserByCredentials(username,password);

            if (found!==null) {
                $location.url('/'); //  + found._id
            }
            else {
                model.message = "The username or password does not match. Please try again.";
            }
        }
    }
})();
