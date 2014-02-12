'use strict';

angular.module('pokerPlanningApp').controller('RoomCtrl', function ($scope, User, $routeParams) {

    // get user infos
    //User.toScope($scope, 'userRef', 'user');

    User.get().then(function(user) {

        $scope.userRef = user;
        $scope.userRef.$bind($scope, "user");

    });

});
