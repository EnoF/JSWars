/*
 * Copyright (c) 2014. 
 *
 * @author Andy Tang
 */
(function FirstAttackSceneModel(angular, clazz) {
    'use strict';

    var app = angular.module('jsWars');

    app.factory('FirstAttackScene', ['Saber', 'SwordSoldier', 'Player', 'Scene',
        function FirstAttackSceneFactory(Saber, SwordSoldier, Player) {
            return clazz(function FirstAttackScene() {
                this.extend = 'Scene';

                this.constructor = function constructor(x, y, enemyX, enemyY) {
                    this.super.constructor(10, 5);
                    var list = this.public.getPlayers();
                    var player = new Player('Player 1');
                    var player2 = new Player('Player 2');
                    var saber = new Saber();
                    var enemy = new SwordSoldier();
                    player.getUnits().add(0, saber);
                    player2.getUnits().add(0, enemy);
                    this.public.getPosition(x, y).setGameObject(saber);
                    this.public.getPosition(enemyX, enemyY).setGameObject(enemy);
                    list.add(0, player);
                    list.add(1, player2);
                    this.protected.setCurrentPlayer(list.getFirst());
                    this.protected.setAllCharacterStates(player2.getUnits(), false);
                };
            });
        }]);
}(window.angular, window.clazz));