/*
 * Copyright (c) 2014. 
 *
 * @author Andy Tang
 */
(function firstAttackSceneWidget(angular) {
    'use strict';

    var app = angular.module('jsWars');

    app.controller('firstAttackSceneViewModel',
        function firstAttackSceneViewModel($scope, FirstAttackScene) {
            var scene = new FirstAttackScene(3, 2, 5, 2);

            $scope.getCurrentPlayer = scene.getCurrentPlayer;

            $scope.map = scene.getMap();
            $scope.isInMoveMode = scene.isInMoveMode;
            $scope.isInAttackMode = scene.isInAttackMode;

            $scope.action = scene.action;

            $scope.isInMoveRange = scene.isInMoveRange;

            $scope.isInAttackRange = scene.isInAttackRange;

            $scope.endTurn = scene.endTurn;
        });

    app.directive('firstAttackScene', function firstAttackSceneDirective() {
        return {
            restrict: 'A',
            templateUrl: 'firstAttackScene',
            scope: {
            },
            controller: 'firstAttackSceneViewModel'
        };
    });

}(window.angular));