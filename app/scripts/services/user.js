'use strict';

angular.module('pokerPlanningApp').factory('User', function($q, $firebase, $firebaseSimpleLogin, config) {
    // Service logic
    var userID;

    /**
     * store login object
     */
    var loginObj = $firebaseSimpleLogin(new Firebase(config.server));

    /**
     * get user object
     */
    var getUserObj = function(uid) {
        var userid = uid || loginObj.user.uid;
        return $firebase(new Firebase(config.server + "users/" + userid));
    };

    /**
     * get user name object
     */
    var getUserNameObj = function(uid) {
        var userid = uid || loginObj.user.uid;
        return $firebase(new Firebase(config.server + "users/" + userid + '/name'));
    };

    /**
     * get user room object
     */
    var getUserRoomObj = function(uid) {
        var userid = uid || loginObj.user.uid;
        return $firebase(new Firebase(config.server + "users/" + userid + '/room'));
    };

    /**
     * anonymous login
     */
    var anonLogin = function() {
        var deferred = $q.defer();

        loginObj.$login('anonymous', {

            rememberMe: true

        }).then(function(user) {

            deferred.resolve(user);

        });

        return deferred.promise;
    };

    /**
     * login user & return uid
     */
    var login = function() {
        var deferred = $q.defer();

        var cb = function(user) {
            userID = user.uid;
            deferred.resolve(user.uid);
        };

        loginObj.$getCurrentUser().then(function(user) {

            if(user == null) {

                anonLogin().then(function(user) {

                    cb(user);

                });

            } else {
                cb(user);
            }

        });

        return deferred.promise;
    };

    /**
     * logout user
     */
    var logout = function() {
        loginObj.$logout();
        return 'logout';
    };

    /**
     * get user name
     */
    var getName = function(uid) {
        return getUserNameObj(uid);
    };

    /**
     * get user room
     */
    var getRoom = function(uid) {
        return getUserRoomObj(uid);
    };

    /**
     * set room
     */
    var setRoom = function(rid) {
        getRoom().$set(rid);
    };

    /**
     * has name ?
     */
    var hasName = function() {
        var deferred = $q.defer();

        var nameObj = getName();
        nameObj.$on('loaded', function() {

            deferred.resolve(!!nameObj.$value);

        });

        return deferred.promise;
    };

    // Public API here
    return {
        login: function() {
            return login();
        },
        logout: function() {
            return logout();
        },
        getUID: function() {
            return userID;
        },
        getName: function(uid) {
            return getName(uid);
        },
        getRoom: function(uid) {
            return getRoom(uid);
        },
        setRoom: function(rid) {
            setRoom(rid);
        },
        hasName: function() {
            return hasName();
        }
    };
});
