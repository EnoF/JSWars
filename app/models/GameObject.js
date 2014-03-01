/*
 * Copyright (c) 2014. 
 *
 * @author Andy Tang
 */
(function GameObjectModel(angular, clazz) {
    'use strict';

    var app = angular.module('jsWars');

    app.factory('GameObject', function GameObjectFactory() {
        return clazz(function GameObject() {

            this.private = {
                active: {
                    isSet: true
                }
            };

            this.protected = {
                hp: {
                    get: 0
                },
                maxHp: {
                    get: 0
                },
                defence: {
                    get: 0
                },
                sizeX: {
                    get: 1
                },
                sizeY: {
                    get: 1
                },
                moves: {
                    get: []
                },
                setMoves: function setMoves(moves) {
                    this.protected.moves = moves;
                }
            };

            this.public = {
                setHp: function setHp(hp) {
                    if (hp < 0) {
                        hp = 0;
                    }
                    this.protected.hp = hp;
                },
                getHpPercentage: function getHpPercentage() {
                    return this.public.getHp() / this.public.getMaxHp() * 100;
                },
                hasMoves: function hasMoves() {
                    return this.protected.moves.length > 0;
                }
            };

            this.constructor = function constructor(hp, defence, sizeX, sizeY) {
                this.protected.hp = hp;
                this.protected.maxHp = hp;
                this.protected.defence = defence;
                this.protected.sizeX = sizeX;
                this.protected.sizeY = sizeY;
            };
        });
    });
}(window.angular, window.clazz));