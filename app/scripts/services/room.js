'use strict';

angular.module('pokerPlanningApp').factory('Room', function($q, $firebase) {
    // Service logic
    var deferred = $q.defer();

    var roomRef;

    var id = '';

    // finaly get infos
    var getUsers = function() {

        // get user data
        roomRef = $firebase(new Firebase("https://poker-planning.firebaseio.com/rooms/" + id));

        // resolve defered object
        deferred.resolve(roomRef);

    };

    // Public API here
    return {
        setId: function(setId) {
            id = setId;
            roomRef = null;
        },

        getUsers: function() {

            // get from cache
            if(roomRef) {
                deferred = $q.defer();
                deferred.resolve(roomRef);
            } else {
                getUsers();
            }

            return deferred.promise;

        }
    };
});
