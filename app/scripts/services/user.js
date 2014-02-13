'use strict';

angular.module('pokerPlanningApp').factory('User', function($q, $firebase, $firebaseSimpleLogin, config, Room) {
    // Service logic
    /*var deferred     = $q.defer(),
        deferredName = $q.defer(),
        deferredRoom = $q.defer();
    var userRef, userNameRef, userRoomRef, uid;*/

    // Auth
    //var loginObj = $firebaseSimpleLogin(new Firebase("https://poker-planning.firebaseio.com/"));

    // if user already auth
    /*loginObj.$getCurrentUser().then(function(user) {

        if(user == null) {

            anonLogin();

        } else {

            // get user infos
            getUserInfo();
        }
    });*/

    /**
     * store login object
     */
    var loginObj = $firebaseSimpleLogin(new Firebase(config.server));

    /**
     * get user object
     */
    var getUserObj = function() {
        return $firebase(new Firebase(config.server + "users/" + loginObj.user.uid));
    };

    /**
     * get user name object
     */
    var getUserNameObj = function() {
        return $firebase(new Firebase(config.server + "users/" + loginObj.user.uid + '/name'));
    };

    /**
     * get user room object
     */
    var getUserRoomObj = function() {
        return $firebase(new Firebase(config.server + "users/" + loginObj.user.uid + '/room'));
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
     * get current user
     */
    var getCurrentUser = function() {
        var deferred = $q.defer();

        loginObj.$getCurrentUser().then(function(user) {

            deferred.resolve(user);

        });

        return deferred.promise;
    };

    /**
     * logout user
     */
    var logout = function() {
        var deferred = $q.defer();

        loginObj.$logout();

        deferred.resolve('logout');

        return deferred.promise;
    };

    /**
     * login user
     */
    var login = function() {
        var deferred = $q.defer();

        anonLogin().then(function(login) {
            deferred.resolve(login);
        });

        return deferred.promise;
    };

    /**
     * get user data
     */
    var getUser = function(cb) {
        var deferred = $q.defer();

        var localGetUserInfo = function() {

            // get user infos
            cb().then(function(data) {
                deferred.resolve(data);
            });

        };

        getCurrentUser().then(function(user) {

            if(user == null) {

                anonLogin().then(function(user) {
                    localGetUserInfo();
                });

            } else {
                localGetUserInfo();
            }

        });

        return deferred.promise;
    };

    /**
     * get stored user data
     */
    var getUserInfo = function() {
        var deferred = $q.defer();

        deferred.resolve(getUserObj());

        return deferred.promise;
    };

    /**
     * get user name
     */
    var getName = function() {
        var deferred = $q.defer();

        deferred.resolve(getUserNameObj());

        return deferred.promise;
    };

    /**
     * get user room
     */
    var getRoom = function() {
        var deferred = $q.defer();

        deferred.resolve(getUserRoomObj());

        return deferred.promise;
    };

    /**
     * enter in a room
     */
    var enterRoom = function(id) {
        var deferred = $q.defer();

        getUser(function() {
            var deferred2 = $q.defer();

            var roomObj = getUserRoomObj();
            roomObj.$set(id);

            deferred2.resolve(getUserObj());

            return deferred2.promise;
        }).then(function(user) {

            user.$on('loaded', function() {
                // call Room method
                Room.join(loginObj.user.uid, user);

                deferred.resolve(user);
            });
        });

        return deferred.promise;
    };

    // finaly get infos
    /*var getUserInfo = function() {

        // store uid
        uid = loginObj.user.uid;

        // get user data
        userRef = $firebase(new Firebase("https://poker-planning.firebaseio.com/users/" + loginObj.user.uid));

        // get user name
        userNameRef = $firebase(new Firebase("https://poker-planning.firebaseio.com/users/" + loginObj.user.uid + "/name"));

        // get room
        userRoomRef = $firebase(new Firebase("https://poker-planning.firebaseio.com/users/" + loginObj.user.uid + "/room"));

        // resolve defered object
        deferred.resolve(userRef);
        deferredName.resolve(userNameRef);
        deferredRoom.resolve(userRoomRef);

    };*/

    /**
     * Github LOGIN
     */
    /*$scope.login = function () {

     loginObj.$login('github', {

     rememberMe: true

     }).then(function (user) {

     // get user infos
     getUserInfo();

     });

     };*/


    // Public API here
    return {
        getCurrentUser: function() {
            return getCurrentUser();
        },

        getUser: function() {
            return getUser(getUserInfo);
        },

        getName: function() {
            return getUser(getName);
        },

        getRoom: function() {
            return getUser(getRoom);
        },

        login: function() {
            return login();
        },

        logout: function() {
            return logout();
        },

        enterRoom: function(id) {
            return enterRoom(id);
        }
        /*getName: function() {

            // get from cache
            if(userNameRef) {
                deferredName = $q.defer();
                deferredName.resolve(userNameRef);
            }

            return deferredName.promise;

        },

        getRoom: function() {

            // get from cache
            if(userRoomRef) {
                deferredRoom = $q.defer();
                deferredRoom.resolve(userRoomRef);
            }

            return deferredRoom.promise;

        },

        get    : function() {

            // get from cache
            if(userRef) {
                deferred = $q.defer();
                deferred.resolve(userRef);
            }

            return deferred.promise;
        },
        getUID : function() {
            return uid;
        }*/
    };
});
