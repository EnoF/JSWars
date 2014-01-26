/*
 * Copyright (c) 2014. 
 *
 * @author Andy Tang
 */
(function characterWidget(angular) {
    'use strict';

    var app = angular.module('jsWars');

    app.controller('CharacterViewModel', function CharacterViewModel($scope) {
        $scope.hp = $scope.character.getHp();

        $scope.getHpPercentage = $scope.character.getHpPercentage;

        $scope.getBoardImage = $scope.character.getBoardImage();
    });

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