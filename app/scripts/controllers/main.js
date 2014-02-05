'use strict';

angular.module('pokerPlanningApp').controller('MainCtrl', function ($scope, User) {

    $scope.user = User.user().name;
    //console.log($scope.user);
    //$scope.user.$bind($scope, "remoteUser");
    //$scope.remoteUser.name

});
