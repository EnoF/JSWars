/*
 * Copyright (c) 2014. 
 *
 * @author Andy Tang
 */
(function gameSquareWidget(angular) {
    'use strict';

    var app = angular.module('jsWars');

    app.directive('gameSquare', function gameSquareDirective() {
        return {
            restrict: 'A',
            templateUrl: 'gameSquare',
            scope: {
                gameSquare: '=gameSquare'
            },
            controller: 'GameSquareViewModel'
        };
    });

}(window.angular));