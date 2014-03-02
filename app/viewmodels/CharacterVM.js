/*
 * Copyright (c) 2014. 
 *
 * @author Andy Tang
 */
(function CharacterVM(angular) {
    'use strict';

    var app = angular.module('jsWars');

    app.viewModel('CharacterViewModel', function CharacterViewModel($scope) {
        $scope.hp = $scope.character.getHp();

        $scope.getHpPercentage = $scope.character.getHpPercentage;

        $scope.getBoardImage = $scope.character.getBoardImage();

        $scope.getLastAppliedDmg = $scope.character.getLastAppliedDmg;

        function hideDmg() {
            $scope.$apply();
        }

        $scope.character.setNotify(hideDmg);
    });

}(window.angular));