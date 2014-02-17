'use strict';

angular.module('pokerPlanningApp').controller('RoomCtrl', function($scope, User, Room, $routeParams, config, $location, votesDoneFilter) {

    $scope.votesDone = votesDoneFilter;

    // set roomID to scope
    $scope.roomID = $routeParams.roomID;

    // set factory roomID
    Room.setID($routeParams.roomID);

    // get room data
    $scope.roomData = {};

    $scope.roomObj = Room.getRoom();

    // bind votes list for ui
    $scope.votes = config.votes;

    /**
     * auto login user
     */
    User.login().then(function(uid) {
        console.log('logged in', uid);
        $scope.uid = uid;

        // set user data to room
        Room.setUser();

        // set user roomID
        User.setRoom($scope.roomID);

        // if noname user, set user room, redirect to homepage
        User.hasName().then(function(hasName) {
            if(!hasName) {
                $location.path('/');
            }
        });

    });

    /**
     * vote for
     */
    $scope.voteFor = function(vote) {
        var target = $scope.roomObj[User.getUID()].vote == vote ? -1 : vote;
        Room.voteFor(target);
    };

    /**
     * reset vote
     */
    $scope.resetVote = function() {
        Room.resetVote();
    };

    /**
     * remove user
     */
    $scope.removeUser = function(uid) {
        Room.removeUser(uid);
    };

});
