'use strict';

angular.module('pokerPlanningApp').controller('RoomCtrl', function($scope, User, Room, $routeParams, config, $location, votesDoneFilter, Page) {

    /**
     * set page title
     */
    Page.setTitle($routeParams.roomID);

    /**
     * bind votesDone filter
     */
    $scope.votesDone = votesDoneFilter;

    /**
     * set roomID to scope
     */
    $scope.roomID = $routeParams.roomID;

    /**
     * set factory roomID
     */
    Room.setID($routeParams.roomID);

    /**
     * get room data
     */
    $scope.roomObj = Room.getRoom();

    /**
     * get user names
     */
    $scope.names = Room.getNames();

    /**
     * bind votes list for UI
     */
    $scope.votes = config.votes;

    /**
     * auto login user
     */
    User.login().then(function(uid) {
        $scope.uid = uid;

        // set user roomID
        User.setRoom($routeParams.roomID);

        // if noname user, set user room, redirect to homepage
        User.hasName().then(function(hasName) {
            if(!hasName) {

                $location.path('/');

            } else {

                // set user data to room
                Room.setUser();

            }
        });

    });

    /**
     * vote for
     */
    $scope.voteFor = function(vote) {
        Room.voteFor(vote);
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
