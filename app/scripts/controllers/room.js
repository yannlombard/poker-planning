'use strict';

angular.module('pokerPlanningApp').controller('RoomCtrl', function($scope, User, Room, $routeParams, config) {

    // set room to scope
    $scope.id = $routeParams.room;

    // set room id
    Room.setId($routeParams.room);

    User.enterRoom($routeParams.room).then(function(roomUser) {

        console.log('roomUser', roomUser);

    });

    // show users in room
    $scope.roomObj = Room.get();

    $scope.votes = config.votes;

    //var user;

    // set user room
    // get user infos
    /*User.getUser().then(function(user) {

        $scope.remoteUser = user;

        // save room
        $scope.remoteUser.room = $routeParams.room;
        $scope.remoteUser.$save('room');

        $scope.remoteUser.$on('loaded', function() {
            registerUser();
        });
    });*/


    /*var registerUser = function() {

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
    };*/

});
