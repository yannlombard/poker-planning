'use strict';

angular.module('pokerPlanningApp').factory('Room', function($q, $firebase) {
    // Service logic
    var deferred = $q.defer();

    //var roomRef;

    var id = '';

    // finaly get infos
    /*var getUsers = function() {

        // get user data
        roomRef = $firebase(new Firebase("https://poker-planning.firebaseio.com/rooms/" + id));

        // resolve defered object
        deferred.resolve(roomRef);

    };*/

    /**
     * get room
     */
    var getRoom = function() {
        return $firebase(new Firebase("https://poker-planning.firebaseio.com/rooms/" + id));
    };

    /**
     * vote for
     */
    var voteFor = function(uid, vote) {
        var room = getRoom();

        console.log(room);
        room[uid].vote = vote;

        room.$save(uid);
    };

    /**
     * user join the room
     */
    var join = function(id, user) {
        var deferred = $q.defer();

        var room = getRoom();

        room[id] = {
            name: user.name,
            vote: -1
        }

        room.$save(id);

        //deferred.resolve(roomRef);
        return deferred.promise;
    };

    // Public API here
    return {
        setId: function(setId) {
            id = setId;
            //roomRef = null;
        },

        join: function(id, user) {
            return join(id, user);
        },

        voteFor: function(uid, vote) {
            voteFor(uid, vote);
        },

        get: function() {

            return getRoom();

            // get from cache
            /*if(roomRef) {
                deferred = $q.defer();
                deferred.resolve(roomRef);
            } else {
                getUsers();
            }*/

            //return deferred.promise;

        }
    };
});
