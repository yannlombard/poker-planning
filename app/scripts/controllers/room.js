'use strict';

angular.module('pokerPlanningApp').controller('RoomCtrl', function($scope, User, Room, $routeParams) {

    // set room to scope
    $scope.id = $routeParams.room;

    // set room id
    Room.setId($scope.id);

    var user;

    // set user room
    // get user infos
    User.get().then(function(userValue) {

        user = $scope.userRef = userValue;

        // save room
        $scope.userRef.room = $routeParams.room;
        $scope.userRef.$save('room');

        $scope.userRef.$on('loaded', function() {
            registerUser();
        });
    });


    var registerUser = function() {

        // get users collection
        Room.getUsers().then(function(users) {

            $scope.users = users;

            console.log(user);

            // set user infos
            var uid = User.getUID();
            $scope.users[uid] = {
                name: user.name,
                vote: -1
            };

            $scope.users.$save();

            // update view
            $scope.users.$on('change', function(value) {

                console.log($scope.users.$getIndex());

                //$scope.users = value.val();
            });
        });
    };

});
