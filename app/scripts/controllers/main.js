'use strict';

angular.module('pokerPlanningApp').controller('MainCtrl', function($scope, User, $location) {

    // get user infos
    User.getName().then(function(user) {
        $scope.userNameRef = user;
        $scope.userNameRef.$bind($scope, "name");

    });

    // store room id
    User.getRoom().then(function(room) {
        $scope.room = room;
        $scope.room.$bind($scope, "roomId");
    });

    // submit function
    $scope.submit = function() {
        $location.path('/' + $scope.roomId);
    };

});
