/*
 * Copyright (c) 2014. 
 *
 * @author Andy Tang
 */
(function tutorialWidget(angular) {
    'use strict';

    var app = angular.module('jsWars');

    app.viewModel('tutorialViewModel',
        function tutorialViewModel($scope, FirstAttackScene) {
            $scope.scene = new FirstAttackScene(3, 2, 5, 2);
        });

    app.directive('tutorial', function tutorialDirective() {
        return {
            restrict: 'A',
            templateUrl: 'tutorial',
            scope: {
            },
            controller: 'tutorialViewModel'
        };
    });
}(window.angular));