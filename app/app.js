(function (angular) {
    'use strict';

    angular.module('jsWars', ['ngRoute'])
        .config(function ($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'pages/main.html'
                })
                .otherwise({
                    redirectTo: '/'
                });
        });
}(window.angular));