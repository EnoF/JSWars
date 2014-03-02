/*
 * Copyright (c) 2014. 
 *
 * @author Andy Tang
 */
(function versusWidget(angular) {
    'use strict';

    var app = angular.module('jsWars');

    app.directive('versus', function versusDirective() {
        return {
            restrict: 'A',
            templateUrl: 'versus',
            scope: {
            },
            controller: 'VersusViewModel'
        };
    });
}(window.angular));