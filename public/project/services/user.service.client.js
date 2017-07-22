(function () {
    angular
        .module('WeatherJournal')
        .factory('userService',userService)

    function userService() {
        var users = [
            {_id: "614", username: "anne", password: "anne", firstName: "Anne", lastName: "Carson", defaultLocation: "Temecula", defaultStation: "", startDate: ""},
            {_id: "613", username: "mike", password: "mike", firstName: "Mike", lastName: "DiPardo", defaultLocation: "El Paso", defaultStation: "SDTEC", startDate: "Current Date minus 1"},
            {_id: "1218", username: "ben", password: "ben", firstName: "Ben", lastName: "DiPardo", defaultLocation: "", defaultStation: "", startDate: ""},
        ];

        var api = {
            findUserByUserId:findUserByUserId,
            findUserByCredentials:findUserByCredentials,
            findUserByUsername:findUserByUsername,
            createUser:createUser,
            updateUser:updateUser
        };
        return api;

        function updateUser(userId, user){
            var index = null;
            for(var u in users) {
                if(users[u]._id === userId) {
                    index = u;
                    break;
                }
            }

            if(index !== null) {
                users.splice(index, 1);
                users.push(user);
                return true;
            }
            return false;
        }

        function createUser(user) {
            if(findUserByUserId(user._id) === null) {
                user._id = ""+Math.floor((Math.random() * 100) + 1);
                user.created = new Date();
                users.push(user);
                return user;
            }
            return null;
        }

        function findUserByUsername(username) {
            var user = users.find(function (user) {
                return user.username === username;
            });
            if(typeof user === 'undefined') {
                return null;
            }
            return user;
        }

        function findUserByUserId(userId) {
            for(var u in users){
                if(users[u]._id === userId){
                    return users[u];
                }
            }
            return null;
        }

        function findUserByCredentials(username,password) {
            for (u in users) {
                var user = users[u];
                if (user.username === username &&
                    user.password === password) {
                    return user;
                }
            }
            return null;
        }

        function deleteUser(userId) {
            var index = null;
            for(var u in users) {
                if(users[u]._id === userId) {
                    index = u;
                    break;
                }
            }

            if(index !== null) {
                users.splice(index, 1);
            }
        }
    }
})();
