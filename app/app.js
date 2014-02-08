(function (angular) {
    'use strict';

    angular.module('jsWars', ['ngRoute'])
        .config(function ($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'pages/startmenu.html'
                })
                .when('/tutorial', {
                    templateUrl: 'pages/tutorial.html'
                })
                .when('/versus', {
                    templateUrl: 'pages/versus.html'
                })
                .otherwise({
                    redirectTo: '/'
                });
        });
}(window.angular));