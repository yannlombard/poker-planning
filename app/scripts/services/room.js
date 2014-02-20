'use strict';

angular.module('pokerPlanningApp').factory('Room', function($q, $firebase, User, config) {
    // Service logic
    var roomID,
        names = {};

    /**
     * get room
     */
    var getRoom = function(id) {
        var rid = id || roomID;
        return $firebase(new Firebase(config.server + "/rooms/" + rid));
    };

    var namesCache = {};

    /**
     * update names
     */
    var updateNames = function() {
        var deferred = $q.defer();

        var room = getRoom();

        room.$on('child_added', function(child) {

            var userid = child.snapshot.name;

            namesCache[userid] = User.getName(userid);
            var userName = namesCache[userid];

            console.log('child_added', namesCache[userid]);

            userName.$on('change', function() {
                console.log('CHANGE');

                names[userid] = userName.$value;

                deferred.resolve(names);

            });

        });

        room.$on('child_removed', function(child) {

            var userName = User.getName(child.snapshot.name);

            userName.$off('change');
        });

        return deferred.promise;
    };

    /**
     * set user / add user
     */
    var setUser = function(uid) {
        var deferred = $q.defer();

        var room = getRoom();

        var userID = uid || User.getUID();

        console.log();

        room.$on('loaded', function() {
            if(angular.isUndefined(room[userID])) {
                room[userID] = {
                    vote: -1
                }

                room.$save(userID);
                deferred.resolve(userID);
            }
        });

        return deferred.promise;
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

        room.$on('loaded', function() {

            var target = room[userID].vote == vote ? -1 : vote;

            room[userID] = {
                vote: target
            };

            room.$save(userID);
        });

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

    /**
     * watch names
     */
    var watchNames = function() {
        var deferred = $q.defer();
        var room = getRoom();

        room.$on('child_added', function(child) {

            var userid = child.snapshot.name;
            var userName = User.getName(userid);

            userName.$on('change', function() {

                names[userid] = userName.$value;
                deferred.notify(names);

            });

        });

        room.$on('child_removed', function(child) {

            var userName = User.getName(child.snapshot.name);

            userName.$off('change');
        });

        return deferred.promise;
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
        },
        getNames: function() {
            watchNames();
            return names;
        }
    };
});
