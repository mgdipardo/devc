(function () {
    angular
        .module("WeatherJournal")
        .controller("registerController", registerController);

    function registerController($location,
                                userService) {

        var model = this;

        model.register = register;

        function register(username,
                        password,
                        verifyPassword,
                        firstName,
                        lastName,
                        email) {

            // if username is null OR is empty string OR undefined
            if(username === null || username === ""
            || typeof username === "undefined"){
                model.error = "Username field cannot be empty.";
                return;
            }

            if(password === null || password === ""
            || typeof password === "undefined"){
                model.error = "Password field cannot be empty.";
                return;
            }

            if(verifyPassword === null || verifyPassword === ""
            || typeof verifyPassword === "undefined"){
                model.error = "Verify Password field cannot be empty.";
                return;
            }

            if (password !== verifyPassword) {
                model.error = "Passwords must match.";
                return;
            }

            if(firstName === null || firstName === ""
            || typeof firstName === "undefined") {
                model.error = "First Name field cannot be empty.";
                return;
            }

            if(lastName === null || lastName === ""
            || typeof lastName === "undefined") {
                model.error = "Last Name field cannot be empty.";
                return;
            }

            if(email === null || email === ""
            || typeof email === "undefined") {
                model.error = "Email field cannot be empty.";
                return;
            }

            userService
                .findUserByUsername(username)
                .then(foundCallback, notFoundCallback);
                    // Success means we found a user with that name,
                    // which means we cannot register this user.
                    // Polish notation.
                    function foundCallback(response) {
                        model.error = "Username not available. Please choose a different username.";
                    }
                    // Error means we did not find a user, so we can
                    // register this user. Again, Polish notation.
                    function notFoundCallback(response) {
                        var newUser = {
                            username: username,
                            password: password,
                            firstName: firstName,
                            lastName: lastName,
                            email: email
                        };
                        userService
                            .createUser(newUser)
                            .then(successCreateCallback, errorCreateCallback);
                            function successCreateCallback(res) {
                                userService
                                    .findUserByUsername(username)
                                    .then(successFindCallBack, errorFindCallback);
                                function successFindCallBack(user) {
                                    $location.url("/user/" + user._id);
                                }
                                function errorFindCallback(res) {
                                    model.error = "System error, user created but cannot be found.";
                                }
                            }
                            function errorCreateCallback(res) {
                                model.error = "System error, create user failed.";
                            }
                    }
        }
    }
})();
