/*
 * Copyright (c) 2014. 
 *
 * @author Andy Tang
 */
(function gameSquareWidget(angular) {
    'use strict';

    var app = angular.module('jsWars');

    app.controller('gameSquareViewModel',
        function gameSquareViewModel($scope) {
            var square = $scope.gameSquare;

            $scope.isOccupied = square.isOccupied;

            $scope.getCharacter = square.getGameObject;

            $scope.isOpened = square.isOpened;

            $scope.isSelectingAttack = square.isSelectingAttack;

            $scope.getActionList = square.getActionList;

            $scope.getAttackList = square.getAttackList;

            $scope.resolveAction = square.resolveAction;

            $scope.selectSkill = square.selectSkill;

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