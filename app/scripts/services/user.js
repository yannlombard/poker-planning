'use strict';

angular.module('pokerPlanningApp').factory('User', function ($q, $firebase, $firebaseSimpleLogin, $rootScope) {
    // Service logic

    var userRef;
    var deferred = $q.defer();

    // Auth
    var loginObj = $firebaseSimpleLogin(new Firebase("https://poker-planning.firebaseio.com/"));

    // if user already auth
    loginObj.$getCurrentUser().then(function(user) {

        console.log(user);

        if(user == null) {

            anonLogin();

        } else {

            // get user infos
            getUserInfo();
        }
    });

    // finaly get infos
    var getUserInfo = function() {

        // get user data
        userRef = $firebase(new Firebase("https://poker-planning.firebaseio.com/users/" + loginObj.user.uid));

        // resolve defered object
        deferred.resolve(userRef);

    };

    /**
     * anonymous login
     */
    var anonLogin = function() {
        loginObj.$login('anonymous', {

            rememberMe: true

        }).then(function (user) {

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
        get: function() {
            return deferred.promise;
        }
    };
});
