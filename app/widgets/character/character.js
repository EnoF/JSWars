/*
 * Copyright (c) 2014. 
 *
 * @author Andy Tang
 */
(function characterWidget(angular) {
    'use strict';

    var app = angular.module('jsWars');

    app.directive('character', function characterDirective() {
        return {
            restrict: 'A',
            templateUrl: 'character',
            scope: {
                character: '='
            },
            controller: 'CharacterViewModel'
        };
    });

}(window.angular));