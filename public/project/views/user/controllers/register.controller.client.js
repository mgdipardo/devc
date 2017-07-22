(function () {
    angular
        .module('WeatherJournal')
        .controller('registerController', registerController);

    function registerController($location, userService) {

        var model = this;

        model.register = register;

        function register(username, password, verifyPassword) {

            // if username is null OR is empty string OR undefined
            if(username === null || username === '' || typeof username === 'undefined'){
                model.message = "Username field cannot be empty.";
                return;
            }

            if(password === null || typeof password === 'undefined'){
                model.message = "Password field cannot be empty.";
                return;
            }

            if(verifyPassword === null || typeof verifyPassword === 'undefined'){
                model.message = "Verify Password field cannot be empty.";
                return;
            }

            if(password!==verifyPassword){
                register.message = "Passwords must match.";
                return;
            }

            var found = userService.findUserByUsername(username);
            if (found !== null) {
                model.message = "Username not available. Please choose a different username.";
            }
            else {
                var newUser = {
                    username : username,
                    password : password
                };
                newUser = userService.createUser(newUser);
                $location.url('/user/' + newUser._id);
            }
        }
    }
})();
