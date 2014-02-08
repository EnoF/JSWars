/*
 * Copyright (c) 2014. 
 *
 * @author Andy Tang
 */
(function gameBoardWidget(angular) {
    'use strict';

    var app = angular.module('jsWars');

    app.controller('gameBoardViewModel',
        function gameBoardViewModel($scope) {
            var scene = $scope.scene;

            $scope.getCurrentPlayer = scene.getCurrentPlayer;

            $scope.map = scene.getMap();
            $scope.isInMoveMode = scene.isInMoveMode;
            $scope.isInAttackMode = scene.isInAttackMode;

            $scope.action = scene.action;

            $scope.isInMoveRange = scene.isInMoveRange;

            $scope.isInAttackRange = scene.isInAttackRange;

            $scope.endTurn = scene.endTurn;

            $scope.isEndingTurn = scene.isEndingTurn;

            function hideEndTurn() {
                $scope.$apply();
            }

            scene.setNotify(hideEndTurn);
        });

    app.directive('gameBoard', function gameBoardDirective() {
        return {
            restrict: 'A',
            templateUrl: 'gameBoard',
            scope: {
                scene: '=gameBoard'
            },
            controller: 'gameBoardViewModel'
        };
    });

}(window.angular));