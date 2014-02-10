'use strict';

angular.module('pokerPlanningApp').controller('RoomCtrl', function ($scope, User, $routeParams) {

    User.get().then(function(user) {

        $scope.userRef = user;
        $scope.userRef.$bind($scope, "user");

    });

});
