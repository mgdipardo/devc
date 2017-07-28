module.exports = function(app) {

    var users = [
        {_id: "614", username: "anne", password: "anne", firstName: "Anne", lastName: "Carlson", defaultLocation: "Temecula", defaultStation: "", startDate: ""},
        {_id: "613", username: "mike", password: "mike", firstName: "Mike", lastName: "DiPardo", defaultLocation: "El Paso", defaultStation: "SDTEC", startDate: "Current Date minus 1"},
        {_id: "1231", username: "lindsey", password: "lindsey", firstName: "Lindsey", lastName: "Johnson", defaultLocation: "", defaultStation: "", startDate: ""},
        {_id: "1218", username: "ben", password: "ben", firstName: "Ben", lastName: "DiPardo", defaultLocation: "", defaultStation: "", startDate: ""},
    ];

    app.delete("/api/user/:userId", deleteUser);
    app.get("/api/user", findUserByUsernameOrCredentials);
    app.get("/api/user/:userId", findUserById);
    app.post("/api/user", createUser);
    app.put("/api/user/:userId", updateUser);

    function deleteUser(req, res) {
        var userId = req.params.userId;
        var index = -1;
        for(var u in users) {
            if(users[u]._id === userId) {
                index = u;
                break;
            }
        }
        if(index > -1) {
            users.splice(index, 1);
            res.sendStatus(200);
            return;
        }
        res.sendStatus(404);
    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        var user = users.find(
            function (user) {
                return user.password === password && user.username === username;
            }
        );
        if(user) {
            res.json(user);
        } else {
            res.sendStatus(404);
        }
    }

    function findUserById(req, res) {
        var userId = req.params.userId;
        var user = users.find(
            function (user) {
                return user._id === userId;
            }
        );
        if(user) {
            res.json(user);
        } else {
            res.sendStatus(404);
        }
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;
        var user = users.find(
            function (user) {
               return user.username === username;
            }
        );
        if(user) {
            res.json(user);
        } else {
            res.sendStatus(404);
        }
    }

    function findUserByUsernameOrCredentials(req, res){
        var username = req.query.username;
        var password = req.query.password;
        if(username && password) {
            findUserByCredentials(req, res);
        } else if(username) {
            findUserByUsername(req, res);

        } else {
            findAllUsers(req, res);
        }
    }

    function createUser(req, res) {
        var user = req.body;
        user._id = ""+Math.floor((Math.random() * 100) + 1);
        users.unshift(user); // adds user to the beginning of the array
        res.json(user);
    }

    function updateUser(req, res) {
        var userId = req.params.userId;
        var newUserValues = req.body;
        var index = -1;
        for(var u in users) {
            if( users[u]._id === userId ) {
                index = u;
                break;
            }
        }

        if(index > -1) {
            newUserValues._id = users[index]._id;
            users.splice(index,1);
            users.push(newUserValues);
            res.sendStatus(200);
            return;
        }
        res.sendStatus(404);
    }

    // Helper functions
    function findAllUsers(req, res) {
        res.send(users);
    }
};
