/*
 * Copyright (c) 2014. 
 *
 * @author Andy Tang
 */
(function GameSquareVM(angular) {
    'use strict';

    var app = angular.module('jsWars');

    app.viewModel('GameSquareViewModel',
        function GameSquareViewModel($scope) {
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

            $scope.shouldDisable = function shouldDisable(action) {
                if (action === 'attack') {
                    return square.hasAttacked();
                } else if (action === 'move') {
                    return square.hasMoved();
                }
                return false;
            };

            $scope.canAttack = square.canAttack;

            $scope.canMove = square.canMove;

            $scope.canPerformActions = square.canPerformActions;

            $scope.stopPropagation = function stopPropagation($event) {
                $event.cancelBubble = true;
            };
        });
}(window.angular));