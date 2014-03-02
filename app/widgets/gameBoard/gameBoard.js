/*
 * Copyright (c) 2014. 
 *
 * @author Andy Tang
 */
(function gameBoardWidget(angular) {
    'use strict';

    var app = angular.module('jsWars');

    app.directive('gameBoard', function gameBoardDirective() {
        return {
            restrict: 'A',
            templateUrl: 'gameBoard',
            scope: {
                scene: '=gameBoard'
            },
            controller: 'SceneViewModel'
        };
    });

}(window.angular));