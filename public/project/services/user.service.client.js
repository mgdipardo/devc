(function () {
    angular
        .module('WeatherJournal')
        .factory('userService',userService)

    function userService($http) {

        var api = {
            findUserByCredentials:findUserByCredentials,
            findUserById:findUserById,
            findUserByUsername:findUserByUsername,
            createUser:createUser,
            deleteUser:deleteUser,
            updateUser:updateUser
        };
        return api;

        function findUserByCredentials(username, password) {
            return $http
                .get("/api/user?username=" + username + "&password=" + password)
                .then(
                    function (res) {
                        return res.data;
                    }
                );
        }

        function findUserById(userId) {
            return $http
                .get("/api/user/" + userId)
                .then(
                    function (res) {
                        return res.data;
                    }
                );
        }

        function findUserByUsername(username) {
            return $http
                .get("/api/user?username=" + username)
                .then(
                    function (res) {
                        return res.data;
                    }
                )
        }

        function createUser(user) {
            return $http
                .post("/api/user", user)
                .then(
                    function (res) {
                        return res.data;
                    }
                );
        }

        function deleteUser(userId) {
            return $http
                .delete("/api/user/" + userId)
                .then(
                    function (res) {
                        return true;
                    },
                    function (err) {
                        return false;
                    }
                );
        }

        function updateUser(userId, user) {
            return $http
                .put("/api/user/" + userId, user)
                .then(
                    function (res) {
                        return true;
                    },
                    function (err) {
                        return false;
                    }
                );
        }
    }
})();
