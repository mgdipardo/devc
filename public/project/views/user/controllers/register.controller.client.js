(function () {
    angular
        .module('WeatherJournal')
        .controller('registerController', registerController);

    function registerController($location,
                                userService) {

        var model = this;

        model.register = register;

        function register(username, password, verifyPassword) {

            // if username is null OR is empty string OR undefined
            if(username === null || username === ''
            || typeof username === 'undefined'){
                model.error = "Username field cannot be empty.";
                return;
            }

            if(password === null || password === ''
            || typeof password === 'undefined'){
                model.error = "Password field cannot be empty.";
                return;
            }

            if(verifyPassword === null || verifyPassword === ''
            || typeof verifyPassword === 'undefined'){
                model.error = "Verify Password field cannot be empty.";
                return;
            }

            if (password !== verifyPassword) {
                model.error = "Passwords must match.";
                return;
            }

            userService
                .findUserByUsername(username)
                .then(
                    // Success means we found a user with that name,
                    // which means we cannot register this user.
                    // Polish notation.
                    function successCallback(response) {
                        model.error = "Username not available. Please choose a different username.";
                    },
                    // Error means we did not find a user, so we can
                    // register this user. Again, Polish notation.
                    function errorCallback(response) {
                        var newUser = {username: username, password: password};
                        userService
                            .createUser(newUser)
                            .then(
                                function successCallback(res) {
                                    userService
                                        .findUserByUsername(username)
                                        .then(
                                            function success(user) {
                                                $location.url("/user/" + user._id);
                                            },
                                            function errorCallback(res) {
                                                vm.error = "System error, user created but cannot be found.";
                                            }
                                        );
                                },
                                function error(res) {
                                    vm.error = "System eroor, create user failed.";
                                }
                            );
                    }
                );
        }
    }
})();
