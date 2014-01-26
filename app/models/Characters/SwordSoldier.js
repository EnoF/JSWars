/*
 * Copyright (c) 2014. 
 *
 * @author Andy Tang
 */
(function SwordSoldier(angular, clazz) {
    'use strict';

    var app = angular.module('jsWars');

    app.factory('SwordSoldier', ['CleanCut', 'Character', function SwordSoldierFactory(CleanCut) {
        return clazz(function SwordSoldier() {
            this.extend = 'Character';

            this.constructor = function constructor() {
                this.super.constructor(500, 150, 80, 2, 1);
                this.protected.setMoves([new CleanCut()]);
                this.public.setBoardImage('sword-soldier');
            };
        });
    }]);

}(window.angular, window.clazz));