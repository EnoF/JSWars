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
                isActive: true
            };

            this.protected = {
                hp: 0,
                maxHp: 0,
                defence: 0,
                sizeX: 1,
                sizeY: 1,
                moves: [],
                setMoves: function setMoves(moves) {
                    this.protected.moves = moves;
                }
            };

            this.public = {
                getHp: function getHp() {
                    return this.protected.hp;
                },
                setHp: function setHp(hp) {
                    if (hp < 0) {
                        hp = 0;
                    }
                    this.protected.hp = hp;
                },

                getMaxHp: function getMaxHp() {
                    return this.protected.maxHp;
                },
                getHpPercentage: function getHpPercentage() {
                    return this.public.getHp() / this.public.getMaxHp() * 100;
                },
                getDefence: function getDefence() {
                    return this.protected.defence;
                },
                getSizeX: function getSizeX() {
                    return this.protected.sizeX;
                },
                getSizeY: function getSizeY() {
                    return this.protected.sizeY;
                },
                canMove: function canMove() {
                    return false;
                },
                canAttack: function canAttack() {
                    return false;
                },
                hasMoves: function hasMoves() {
                    return this.protected.moves.length > 0;
                },
                getMoves: function getMoves() {
                    return this.protected.moves;
                },
                isActive: function isActive() {
                    return this.private.isActive;
                },
                setActive: function setActive(active) {
                    this.private.isActive = active;
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