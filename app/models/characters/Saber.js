/*
 * Copyright (c) 2014. 
 *
 * @author Andy Tang
 */
(function SaberModel(angular, clazz) {
    'use strict';

    var app = angular.module('jsWars');

    app.factory('Saber', ['CleanCut', 'Excalibur', 'Character',
        function SaberFactory(CleanCut, Excalibur) {
            return clazz(function Saber() {

                this.extend = 'Character';

                this.constructor = function constructor(id, player) {
                    this.super.constructor(id, player, 1000, 200, 100, 3, 1);
                    this.protected.setMoves([new CleanCut(), new Excalibur()]);
                    this.public.setBoardImage('saber');
                };
            });
        }]);
}(window.angular, window.clazz));