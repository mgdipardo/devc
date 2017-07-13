(function () {
    angular
        .module('WeatherJournal')
        .controller('registerController', registerController);

    function registerController($location,userService) {

        var model = this;
        model.register = register;

        function register(username, password, verifyPassword) {

            if(username === null || username === '' || typeof username === 'undefined'){
                model.error = "Username field cannot be empty.";
                return;
            }

            if(password === null || typeof password === 'undefined'){
                model.error = "Password field cannot be empty.";
                return;
            }

            if(verifyPassword === null || typeof verifyPassword === 'undefined'){
                model.error = "Verify Password field cannot be empty.";
                return;
            }

            if(password!==verifyPassword){
                register.error = "Passwords must match.";
                return;
            }

            var found = userService.findUserByUsername(username);

            if (found!==null) {
                //model.message = "Welcome " + username;
                model.error = "Username not available. Please choose a different username.";
            }
            else {
                var newUser = {
                    username : username,
                    password : password
                };
                newUser = userService.createUser(newUser);
                $location.url('/');  // + newUser._id
            }
        }
    }
})();
