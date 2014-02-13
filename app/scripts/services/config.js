'use strict';

angular.module('pokerPlanningApp').constant('config', {
    server: 'https://poker-planning.firebaseio.com/',
    votes: [
        '?',
        '0',
        '1/2',
        '1',
        '2',
        '3',
        '5',
        '8',
        '13',
        '20',
        '40',
        '100'
    ]
});
