'use strict';

angular.module('pokerPlanningApp').controller('RoomCtrl', function($scope, User, Room, $routeParams, config, $location, votesDoneFilter, Page) {

    $scope.votesDone = votesDoneFilter;

    // set roomID to scope
    $scope.roomID = $routeParams.roomID;

    // set factory roomID
    Room.setID($routeParams.roomID);

    // get room data
    $scope.roomObj = Room.getRoom();

    // get user names
    $scope.names = Room.getNames();

    // bind votes list for ui
    $scope.votes = config.votes;

    /**
     * auto login user
     */
    User.login().then(function(uid) {
        $scope.uid = uid;

        // set user data to room
        Room.setUser().then(function() {

            // set user roomID
            User.setRoom($routeParams.roomID);

            // if noname user, set user room, redirect to homepage
            User.hasName().then(function(hasName) {
                if(!hasName) {
                    $location.path('/');
                }
            });

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

    // set page title
    Page.setTitle($routeParams.roomID);
});