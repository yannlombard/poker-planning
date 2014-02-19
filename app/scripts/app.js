'use strict';

angular.module('pokerPlanningApp', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngRoute',
        'firebase'
    ])
    .config(function($routeProvider) {

        $routeProvider.when('/', {

            templateUrl: 'views/main.html',
            controller : 'MainCtrl'

        }).when('/info', {

                templateUrl: 'views/info.html',
                controller : 'InfoCtrl'

            }).when('/:roomID', {

                templateUrl: 'views/room.html',
                controller : 'RoomCtrl'

            });

    }
);
