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
                boardImage: null,
                hasAttackedInThisTurn: false,
                hasMovedInThisTurn: false,
                lastAppliedDmg: 0,
                notify: null
            };

            this.protected = {
                attack: 0,
                mobility: 0,
                moves: []
            };

            this.public = {
                applyDmg: function applyDmg(dmg) {
                    var hp = this.public.getHp() - dmg;
                    this.public.setHp(hp);
                    this.private.lastAppliedDmg = dmg;
                    setTimeout(this.public.resetLastAppliedDmg, 1500);
                },
                getLastAppliedDmg: function getLastAppliedDmg() {
                    return this.private.lastAppliedDmg;
                },
                resetLastAppliedDmg: function resetLastAppliedDmg() {
                    this.private.lastAppliedDmg = 0;
                    this.private.notify();
                },
                setNotify: function setNotify(notify) {
                    this.private.notify = notify;
                },
                getAttack: function getAttack() {
                    return this.protected.attack;
                },
                getBoardImage: function getBoardImage() {
                    return this.private.boardImage;
                },
                setBoardImage: function setBoardImage(image) {
                    this.private.boardImage = image;
                },
                getMobility: function getMobility() {
                    return this.protected.mobility;
                },
                canAttack: function canAttack() {
                    return true;
                },
                canMove: function canMove() {
                    return true;
                },
                hasAttacked: function hasAttacked() {
                    return this.private.hasAttackedInThisTurn;
                },
                setHasAttacked: function setHasAttacked(hasAttacked) {
                    this.private.hasAttackedInThisTurn = hasAttacked;
                },
                hasMoved: function hasMoved() {
                    return this.private.hasMovedInThisTurn;
                },
                setHasMoved: function setHasMoved(hasMoved) {
                    this.private.hasMovedInThisTurn = hasMoved;
                }
            };

            this.constructor = function constructor(hp, attack, defence, mobility, sizeX, sizeY) {
                this.super.constructor(hp, defence, sizeX, sizeY);
                this.protected.attack = attack;
                this.protected.mobility = mobility;
            };
        });
    }]);
}(window.angular, window.clazz));