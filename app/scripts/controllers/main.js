'use strict';

angular.module('pokerPlanningApp').controller('MainCtrl', function($scope, User, $location, $route, Page) {

    // set page title
    Page.setDefault();

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
    if(!$scope.uid) {
        User.login().then(function(uid) {
            $scope.uid = uid;

            bindData();
        });
    }

    /**
     * logout user
     */
    $scope.logout = function() {

        User.logout();
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
