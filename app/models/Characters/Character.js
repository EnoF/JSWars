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