'use strict';

angular.module('pokerPlanningApp').controller('MainCtrl', function ($scope, User, $location) {

    // get user infos
    User.get().then(function(user) {@

        $scope.userRef = user;
        $scope.userRef.$bind($scope, "user");

    });

    // submit function
    $scope.submit = function() {

        $location.path('/' + $scope.roomId);

    };

});
