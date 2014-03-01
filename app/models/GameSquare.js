/*
 * Copyright (c) 2014. 
 *
 * @author Andy Tang
 */
(function GameSquareModel(angular, clazz) {
    'use strict';

    var app = angular.module('jsWars');

    app.factory('GameSquare', function GameSquareFactory(Character) {
        return clazz(function GameSquare() {

            this.private = {
                x: {
                    getSet: null
                },
                y: {
                    getSet: null
                },
                gameObject: {
                    getSet: null
                },
                isOpened: false,
                selectingAttack: {
                    is: false
                },
                inMoveMode: {
                    is: false
                },
                inAttackMode: {
                    is: false
                },
                selectedSkill: {
                    get: null
                },
                getAttackList: function getAttackList() {
                    var list = [];
                    var gameObject = this.private.gameObject;
                    if (!this.private.selectingAttack) {
                        return list;
                    }
                    if (gameObject.hasMoves()) {
                        list = gameObject.getMoves();
                    }
                    return list;
                }
            };

            this.public = {
                isOccupied: function isOccupied() {
                    return this.private.gameObject !== null;
                },
                isOpened: function isOpened() {
                    return this.private.isOpened;
                },
                canPerformActions: function canPerformActions() {
                    var player;
                    if (this.public.isOccupied() &&
                        (player = this.private.gameObject.getPlayer()) !== null) {
                        return player.isAllowedToPerformActions();
                    } else {
                        return false;
                    }
                },
                canAttack: function canAttack() {
                    if (this.public.isOccupied()) {
                        return this.private.gameObject.canAttack();
                    } else {
                        return false;
                    }
                },
                hasAttacked: function hasAttacked() {
                    var gameObject = this.private.gameObject;
                    if (gameObject instanceof Character) {
                        return gameObject.hasAttacked();
                    }
                    return false;
                },
                canMove: function canMove() {
                    if (this.public.isOccupied()) {
                        return this.private.gameObject.canMove();
                    } else {
                        return false;
                    }
                },
                hasMoved: function hasMoved() {
                    var gameObject = this.private.gameObject;
                    if (gameObject instanceof  Character) {
                        return gameObject.hasMoved();
                    }
                    return false;
                },
                openActionPanel: function openActionPanel() {
                    this.private.isOpened = true;
                },
                closeActionPanel: function closeActionPanel() {
                    this.private.isOpened = false;
                    this.public.stopMoveMode();
                    this.public.stopAttackMode();
                    this.public.stopSelectingAttack();
                },
                startMoveMode: function startMoveMode() {
                    var gameObject = this.private.gameObject;
                    if (gameObject instanceof Character && !gameObject.hasMoved()) {
                        this.private.inMoveMode = true;
                    } else {
                        this.private.inMoveMode = false;
                    }
                },
                stopMoveMode: function stopMoveMode() {
                    this.private.inMoveMode = false;
                },
                startAttackMode: function startAttackMode() {
                    this.private.inAttackMode = true;
                },
                stopAttackMode: function stopAttackMode() {
                    this.private.inAttackMode = false;
                },
                startSelectingAttack: function startSelectingAttack() {
                    var gameObject = this.private.gameObject;
                    if (gameObject instanceof Character && !gameObject.hasAttacked()) {
                        this.private.selectingAttack = true;
                    } else {
                        this.private.selectingAttack = false;
                    }
                },
                stopSelectingAttack: function stopSelectingAttack() {
                    this.private.selectingAttack = false;
                },
                getAttackList: function getAttackList() {
                    return this.private.getAttackList();
                },
                selectSkill: function selectSkill(skillIndex) {
                    this.private.selectedSkill = this.private.getAttackList()[skillIndex] || null;
                    this.private.inAttackMode = true;
                    this.private.selectingAttack = false;
                }
            };

            this.constructor = function constructor(x, y, gameObject) {
                this.private.x = x;
                this.private.y = y;
                this.private.gameObject = gameObject || null;
            };
        });
    });
}(window.angular, window.clazz));