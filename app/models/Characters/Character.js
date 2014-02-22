/*
 * Copyright (c) 2014. 
 *
 * @author Andy Tang
 */
(function CharacterModel(angular, clazz) {
    'use strict';

    var app = angular.module('jsWars');

    app.factory('Character', ['GameObject', function CharacterFactory() {
        return clazz(function Character() {

            this.extend = 'GameObject';

            this.private = {
                id: {
                    get: 0
                },
                player: {
                    get: null
                },
                boardImage: {
                    getSet: null
                },
                hasAttacked: {
                    set: false
                },
                hasMoved: {
                    set: false
                },
                lastAppliedDmg: {
                    get: 0
                },
                notify: {
                    set: null
                }
            };

            this.protected = {
                attack: {
                    get: 0
                },
                mobility: {
                    get: 0
                }
            };

            this.public = {
                applyDmg: function applyDmg(dmg) {
                    var hp = this.public.getHp() - dmg;
                    this.public.setHp(hp);
                    this.private.lastAppliedDmg = dmg;
                    setTimeout(this.public.resetLastAppliedDmg, 1500);
                },
                resetLastAppliedDmg: function resetLastAppliedDmg() {
                    this.private.lastAppliedDmg = 0;
                    this.private.notify();
                },
                canAttack: function canAttack() {
                    return true;
                },
                canMove: function canMove() {
                    return true;
                },
                hasAttacked: function hasAttacked() {
                    return this.private.hasAttacked;
                },
                hasMoved: function hasMoved() {
                    return this.private.hasMoved;
                }
            };

            this.constructor = function constructor(id, player, hp, attack, defence, mobility, sizeX, sizeY) {
                this.super.constructor(hp, defence, sizeX, sizeY);
                this.protected.attack = attack;
                this.protected.mobility = mobility;
                this.private.player = player;
                this.private.id = id;
            };
        });
    }]);
}(window.angular, window.clazz));