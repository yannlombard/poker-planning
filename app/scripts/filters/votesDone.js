'use strict';

angular.module('pokerPlanningApp').filter('votesDone', function () {
    return function (room) {
        var done = true;

        angular.forEach(room, function(user) {
            done = user.vote < 0 ? false : done;
        });

        return done;
    };
});
