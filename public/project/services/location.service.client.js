(function () {
    angular
        .module('WeatherJournal')
        .factory('locationService', locationService);

    function locationService() {

        var locations = [
            { "_id": "123", "locationName": "El Paso",     "userId": "613",  "state": "Texas", "zipcode": "79925" },
            { "_id": "124", "locationName": "Temecula",    "userId": "613",  "state": "California", "zipcode": "92592" },
            { "_id": "125", "locationName": "Eugene",      "userId": "614",  "state": "Oregon", "zipcode": "97401" },
            { "_id": "126", "locationName": "Temecula",    "userId": "614",  "state": "California", "zipcode": "92592" },
            { "_id": "127", "locationName": "Petaluma",    "userId": "1218", "state": "California", "zipcode": "94954" },
            { "_id": "128", "locationName": "Iowa City",   "userId": "1218", "state": "Iowa", "zipcode": "52240" },
            { "_id": "129", "locationName": "Culver City", "userId": "1218", "state": "California", "zipcode": "90230" }
        ];

        var api = {
            findAllLocationsForUser:findAllLocationsForUser,
            findLocationById:findLocationById,
            deleteLocation:deleteLocation,
            createLocation:createLocation,
            updateLocation:updateLocation
        };
        return api;

        function updateLocation(locationId, location) {
            var index = null;
            for(var l in locations){
                if(locations[l]._id === locationId){
                    index = l;
                    break;
                }
            }
            if (index !== null) {
                locations.splice(index, 1);
                locations.push(location);
            }
        }

        function createLocation(userId, location) {
            if(findLocationById(location._id) === null) {
                location.userId = userId;
                location._id = ""+Math.floor((Math.random() * 100) + 1);
                locations.push(location);
            }
        }

        function deleteLocation(locationId) {
            var location = findLocationById(locationId);
            var index = locations.indexOf(location);
            if(index !== null || typeof index !== 'undefined') {
                locations.splice(index, 1);
            }
        }

        function findLocationById(locationId) {
            for(var l in locations) {
                if(locations[l]._id === locationId)
                    return locations[l];
            }
            return null;
        }

        function findAllLocationsForUser(userId) {
            var userLocations = [];
            for(var l in locations) {
                if(locations[l].userId === userId) {
                    userLocations.push(locations[l]);
                }
            }
            return userLocations;
        }
    }
})();
