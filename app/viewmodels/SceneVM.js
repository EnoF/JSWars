/*
 * Copyright (c) 2014. 
 *
 * @author Andy Tang
 */
(function SceneVM(angular) {
    'use strict';

    var app = angular.module('jsWars');

    app.viewModel('SceneViewModel',
        function SceneViewModel($scope) {
            var scene = $scope.scene;

            $scope.getCurrentPlayer = scene.getCurrentPlayer;

            $scope.map = scene.getMap();
            $scope.isInMoveMode = scene.isInMoveMode;
            $scope.isInAttackMode = scene.isInAttackMode;

            $scope.action = function action(x, y) {
                if (!scene.hasActionPanelOpen()) {
                    scene.openActionPanel(x, y);
                } else if (scene.isInMoveRange(x, y)) {
                    scene.move(x, y);
                } else if (scene.isInAttackRange(x, y)) {
                    scene.attack(x, y);
                } else {
                    scene.closeActionPanel();
                }
            };

            $scope.isInMoveRange = scene.isInMoveRange;

            $scope.isInAttackRange = scene.isInAttackRange;

            $scope.endTurn = scene.endTurn;

            $scope.isEndingTurn = scene.isEndingTurn;

            $scope.hasGameEnded = scene.hasGameEnded;

            $scope.getWinner = scene.getWinner;

            function hideEndTurn() {
                $scope.$apply();
            }

            scene.setNotify(hideEndTurn);
        });

}(window.angular));