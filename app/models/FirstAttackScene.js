/*
 * Copyright (c) 2014. 
 *
 * @author Andy Tang
 */
(function FirstAttackSceneModel(angular, clazz) {
    'use strict';

    var app = angular.module('jsWars');

    app.factory('FirstAttackScene', ['Saber', 'SwordSoldier', 'Scene',
        function FirstAttackSceneFactory(Saber, SwordSoldier) {
            return clazz(function FirstAttackScene() {
                this.extend = 'Scene';

                this.constructor = function constructor(x, y, enemyX, enemyY) {
                    this.super.constructor(10, 5);
                    this.public.getPosition(x, y).setGameObject(new Saber());
                    this.public.getPosition(enemyX, enemyY).setGameObject(new SwordSoldier());
                };
            });
        }]);
}(window.angular, window.clazz));