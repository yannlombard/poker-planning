'use strict';

angular.module('pokerPlanningApp').controller('MainCtrl', function($scope, User, $location, $route) {

    /**
     * set 3 way data binding when user logged in
     */
    var bindData = function() {

        $scope.nameObj = User.getName();
        $scope.nameObj.$bind($scope, 'name');


        $scope.roomObj = User.getRoom();
        $scope.roomObj.$bind($scope, 'room');

    };

    /**
     * auto login user
     */
    User.login().then(function(uid) {
        console.log('logged in', uid);
        $scope.uid = uid;

        bindData();
    });

    /**
     * logout user
     */
    $scope.logout = function() {

        User.logout();
        console.log('logged out');
        $route.reload();

    };

    /**
     * enter in room
     */
    // submit function
    $scope.submit = function() {
        $location.path('/' + $scope.room);
    };

});
