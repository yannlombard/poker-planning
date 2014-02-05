'use strict';

angular.module('pokerPlanningApp', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngRoute',
        'firebase'
    ])
    .config(function ($routeProvider) {

        $routeProvider.when('/', {

            templateUrl: 'views/main.html',
            controller : 'MainCtrl'

        }).otherwise({

            redirectTo: '/'
        });
    }
);
