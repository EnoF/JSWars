/*
 * Copyright (c) 2014. 
 *
 * @author Andy Tang
 */
(function TutorialVM(angular) {
    'use strict';

    var app = angular.module('jsWars');

    app.viewModel('TutorialViewModel',
        function TutorialViewModel($scope, FirstAttackScene) {
            $scope.scene = new FirstAttackScene(3, 2, 5, 2);
        });
}(window.angular));