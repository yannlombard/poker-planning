'use strict';

angular.module('pokerPlanningApp').factory('Room', function($q, $firebase, User, config) {
    // Service logic
    var roomID;

    /**
     * get room
     */
    var getRoom = function(id) {
        var rid = id || roomID;
        return $firebase(new Firebase(config.server + "/rooms/" + rid));
    };

    /**
     * set user / add user
     */
    var setUser = function(uid) {
        var room = getRoom();

        var userID = uid || User.getUID();

        room.$on('loaded', function() {
            if(angular.isUndefined(room[userID])) {
                room[userID] = {
                    vote: -1
                }

                room.$save(userID);
            }
        });

        return userID;
    };

    /**
     * remove user
     */
    var removeUser = function(uid) {
        var room = getRoom();

        room.$remove(uid);
    };

    /**
     * vote for
     */
    var voteFor = function(vote) {
        var room = getRoom();

        var userID = User.getUID();

        room[userID] = {
            vote: vote
        }

        room.$save(userID);

        return userID;
    };

    /**
     * reset vote
     */
    var resetVote = function() {
        var room = getRoom();

        room.$on('loaded', function() {

            var keys = room.$getIndex();
            keys.forEach(function(key, i) {
                room[key].vote = -1;
            });

            room.$save();
        });
    };


    // Public API here
    return {

        setID: function(id) {
            roomID = id;
        },
        getID: function() {
            return roomID;
        },
        getRoom: function(id) {
            return getRoom(id);
        },
        setUser: function(uid) {
            return setUser(uid);
        },
        removeUser: function(uid) {
            removeUser(uid);
        },
        voteFor: function(vote) {
            voteFor(vote);
        },
        resetVote: function() {
            resetVote();
        }
    };
});
