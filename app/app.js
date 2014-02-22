(function (angular) {
    'use strict';


    var app = angular.module('jsWars', ['ngRoute']);
    app.config(function ($routeProvider) {
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

    app.viewModel = app.controller;
}(window.angular));