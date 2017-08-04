var app = require("../../express.js");
var userModel = require("../models/user/user.model.server.js");

// var users = [
//     {_id: "614", username: "anne", password: "anne", firstName: "Anne", lastName: "Carlson", email: "a@gmail.com", defaultLocation: "Temecula", defaultStation: "", startDate: ""},
//     {_id: "613", username: "mike", password: "mike", firstName: "Mike", lastName: "DiPardo", email: "m@gmail.com", defaultLocation: "El Paso", defaultStation: "SDTEC", startDate: "Current Date minus 1"},
//     {_id: "1231", username: "lindsey", password: "lindsey", firstName: "Lindsey", lastName: "Johnson", email: "l@gmail.com", defaultLocation: "", defaultStation: "", startDate: ""},
//     {_id: "1218", username: "ben", password: "ben", firstName: "Ben", lastName: "DiPardo", email: "b@gmail.com", defaultLocation: "", defaultStation: "", startDate: ""},
// ];

app.post("/wxj/api/user", createUser);
app.delete("/wxj/api/user/:userId", deleteUser);
app.get("/wxj/api/user", findAllUsers);
app.get("/wxj/api/user/:userId", findUserById);
app.put("/wxj/api/user/:userId", updateUser);

function createUser(req, res) {
    var newUser = req.body;
    userModel
        .createUser(newUser)
        .then(function (newUser) {
           res.json(newUser);
        }, function (err) {
            res.sendStatus(404);
        });
}

function deleteUser(req, res) {
    var userId = req.params.userId;
    userModel
        .deleteUser(userId)
        .then(function (status) {
            res.send(status);
        });
}

function findAllUsers (req, res) {
    var username = req.query.username;
    var password = req.query.password;
    // Both username and password are provided
    if(username && password) {
        userModel
            .findUserByCredentials(username, password)
            .then(function (user) {
               if(user) {
                   res.json(user);
               } else {
                   res.sendStatus(404);
               }
            });
    }
    // Only username is provided
    else if (username){
        userModel
            .findUserByUsername(username)
            .then(function (user) {
               if(user) {
                   res.json(user);
               } else
                   res.sendStatus(404);
            });
    }
    // Neither username nor password are provided
    else {
        userModel
            .findAllUsers()
            .then(function (users) {
                res.json(users);
            })
    }
}

function findUserById(req, res) {
    var userId = req.params.userId;
    userModel
        .findUserById(userId)
        .then(function (user) {
           res.json(user);
        });
}

function updateUser(req, res) {
    var userId = req.params.userId;
    var newUserValues = req.body;
    userModel
        .updateUser(userId, newUserValues)
        .then(function (status) {
           res.send(status);
        });
}
