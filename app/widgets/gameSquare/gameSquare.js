/*
 * Copyright (c) 2014. 
 *
 * @author Andy Tang
 */
(function gameSquareWidget(angular) {
    'use strict';

    var app = angular.module('jsWars');

    app.viewModel('gameSquareViewModel',
        function gameSquareViewModel($scope) {
            var square = $scope.gameSquare;

            $scope.isOccupied = square.isOccupied;

            $scope.getCharacter = square.getGameObject;

            $scope.isOpened = square.isOpened;

            $scope.isSelectingAttack = square.isSelectingAttack;

            $scope.getAttackList = square.getAttackList;

            $scope.startMoveMode = square.startMoveMode;
            $scope.startSelectingAttack = square.startSelectingAttack;
            $scope.closeActionPanel = square.closeActionPanel;

            $scope.selectSkill = square.selectSkill;

            $scope.hasAttacked = square.hasAttacked;

            $scope.shouldDisable = square.shouldDisable;

            $scope.canAttack = square.canAttack;

            $scope.canMove = square.canMove;

            $scope.canPerformActions = square.canPerformActions;

            $scope.stopPropagation = function stopPropagation($event) {
                $event.cancelBubble = true;
            };
        });

    app.directive('gameSquare', function gameSquareDirective() {
        return {
            restrict: 'A',
            templateUrl: 'gameSquare',
            scope: {
                gameSquare: '=gameSquare'
            },
            controller: 'gameSquareViewModel'
        };
    });

}(window.angular));