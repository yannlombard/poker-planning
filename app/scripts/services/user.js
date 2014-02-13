'use strict';

angular.module('pokerPlanningApp').factory('User', function($q, $firebase, $firebaseSimpleLogin) {
    // Service logic
    var deferred     = $q.defer(),
        deferredName = $q.defer(),
        deferredRoom = $q.defer();
    var userRef, userNameRef, userRoomRef, uid;

    // Auth
    var loginObj = $firebaseSimpleLogin(new Firebase("https://poker-planning.firebaseio.com/"));

    // if user already auth
    loginObj.$getCurrentUser().then(function(user) {

        if(user == null) {

            anonLogin();

        } else {

            // get user infos
            getUserInfo();
        }
    });

    // finaly get infos
    var getUserInfo = function() {

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

    };

    /**
     * anonymous login
     */
    var anonLogin = function() {
        loginObj.$login('anonymous', {

            rememberMe: true

        }).then(function(user) {

                // get user infos
                getUserInfo();

            });
    };

    /**
     * LOGOUT
     */
    /*$scope.logout = function () {
     loginObj.$logout();
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
        getName: function() {

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
        }
    };
});
