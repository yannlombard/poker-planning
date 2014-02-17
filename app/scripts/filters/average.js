'use strict';

angular.module('pokerPlanningApp').filter('average', function (config) {
    return function (room) {
        var average = -1;
        var table = {};
        var max = -1;

        var keys = room.$getIndex();
        keys.forEach(function(key, i) {
            var user = room[key];

            if(user && user.vote > -1) {
                var votes = table[user.vote];
                table[user.vote] = votes ? votes + 1 : 1;

                var value = table[user.vote];

                if(value > max || value == max && user.vote > average) {
                    max = value;
                    average = user.vote
                }
            }
        });

        return config.votes[average];
    };
});
