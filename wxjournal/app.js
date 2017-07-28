module.exports = function(app) { // app is an instance of express

    require("./services/user.service.server.js")(app);
    require("./services/location.service.server.js")(app);
    require("./services/station.service.server.js")(app);
    require("./services/journal.service.server.js")(app);
    require("./services/history.service.server.js")(app);
    require("./services/analytic.service.server.js")(app);

};
