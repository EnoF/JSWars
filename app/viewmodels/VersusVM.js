/*
 * Copyright (c) 2014. 
 *
 * @author Andy Tang
 */
(function VersusVM(angular) {
    'use strict';

    var app = angular.module('jsWars');

    app.viewModel('VersusViewModel',
        function versusViewModel($scope, VersusScene) {
            $scope.scene = new VersusScene();
        });

}(window.angular));