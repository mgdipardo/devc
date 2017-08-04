module.exports = function(app)
{
    app.get("/api/test", findAllMessages);
    app.post("/api/test", createMessage);
    app.delete("/api/test/:id", deleteMessage);

    var connectionString = "mongodb://127.0.0.1:27017/wxj"; // for local
    if(process.env.MLAB_USERNAME_MEANDEVC) { // check if running remotely
        var username = process.env.MLAB_USERNAME_MEANDEVC; // get from environment
        var password = process.env.MLAB_PASSWORD_MEANDEVC;
        connectionString = "mongodb://" + username + ":" + password;
        connectionString += "@ds139262.mlab.com:39262/heroku_ck4p4d0q"; // user yours
    }

    var mongoose = require("mongoose");
    mongoose.connect(connectionString);
    mongoose.Promise = require("q").Promise;

    var TestSchema = mongoose.Schema({
        message: String
    });

    var TestModel = mongoose.model("TestModel", TestSchema);

    function findAllMessages(req, res) {
        TestModel
            .find()
            .then(
                function(tests) {
                    res.json(tests);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function createMessage(req, res) {
        TestModel
            .create(req.body)
            .then(
                function(test) {
                    res.json(test);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteMessage(req, res) {
        TestModel
            .remove({_id: req.params.id})
            .then(
                function(result) {
                    res.json(result);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }
};
