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

        function updateUser(userId,user){
            for (var u in users){
                if(users[u]._id===userId){
                    users[u].username = user.username;
                    users[u].password = user.password;
                    users[u].firstName = user.firstName;
                    users[u].lastName = user.lastName;
                    users[u].defaultLocation = user.defaultLocation;
                    users[u].defaultStation = user.defaultStation;
                    users[u].startDate = user.startDate;
                }
            }
        }

        function createUser(user) {
            user._id = (new Date()).getTime() + "";
            user.created = new Date();
            users.push(user);
            return user;
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
                if(users[u]._id==userId){
                    return users[u];
                }
            }
            return null;
        }

        function findUserByCredentials(username,password) {
            var found = null;
            for (u in users) {
                var user = users[u];
                if (user.username === username
                    && user.password === password) {
                    found = user;
                    return found;
                }
            }
            return found;
        }
    }
})();
