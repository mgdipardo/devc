(function () {
    angular
        .module("WeatherJournal")
        .factory("userService",userService)

    function userService($http) {

        var api = {
            createUser:createUser,
            deleteUser:deleteUser,
            findUserByCredentials:findUserByCredentials,
            findUserById:findUserById,
            findUserByUsername:findUserByUsername,
            updateUser:updateUser
        };
        return api;

        function createUser(newUser) {
            var url = "/wxj/api/user";
            return $http.post(url, newUser)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteUser(userId) {
            var url = "/wxj/api/user/"+userId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserByCredentials(username, password) {
            var url = "/wxj/api/user?username=" +username+ "&password=" +password;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });

        }

        function findUserById(userId) {
            var url = "/wxj/api/user/"+userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserByUsername(username) {
            var url = "/wxj/api/user?username=" +username;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateUser(userId, user) {
            return $http
                .put("/wxj/api/user/" + userId, user)
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
