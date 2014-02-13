'use strict';

angular.module('pokerPlanningApp').controller('MainCtrl', function($scope, User, $location) {

    // get user infos
    /*User.getName().then(function(user) {
        $scope.userNameRef = user;
        $scope.userNameRef.$bind($scope, "name");

    });*/

    // store room id
    /*User.getRoom().then(function(room) {
        $scope.room = room;
        $scope.room.$bind($scope, "roomId");
    });*/

    User.getUser().then(function() {
        $scope.auth = true;

        User.getName().then(function(name) {

            $scope.remoteName = name;
            $scope.remoteName.$bind($scope, "name");

        });

        User.getRoom().then(function(room) {

            $scope.remoteRoom = room;
            $scope.remoteRoom.$bind($scope, "room");

        });
    });

    $scope.click = function() {
        User.login();
    };


    $scope.logout = function() {

        User.logout().then(function() {

            console.log('logged out');

        });

    };



    // submit function
    $scope.submit = function() {
        $location.path('/' + $scope.room);
    };

});
