/*
 * Copyright (c) 2014. 
 *
 * @author Andy Tang
 */
(function tutorialWidget(angular) {
    'use strict';

    var app = angular.module('jsWars');

    app.directive('tutorial', function tutorialDirective() {
        return {
            restrict: 'A',
            templateUrl: 'tutorial',
            scope: {
            },
            controller: 'TutorialViewModel'
        };
    });
}(window.angular));