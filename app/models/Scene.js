/*
 * Copyright (c) 2014. 
 *
 * @author Andy Tang
 */
(function SceneModel(angular, clazz, undefined) {
    'use strict';

    var app = angular.module('jsWars');

    app.factory('Scene', function SceneFactory(GameSquare) {
        return clazz(function Scene() {

            this.private = {
                activeGameSquare: null,
                map: [],
                initializeMapCollumn: function initializeMapCollumn(column, amountOfSquares) {
                    this.private.map.push(this.private.initializeMapRow(column, amountOfSquares));
                },
                initializeMapRow: function initializeMapRow(column, amountOfSquares) {
                    var rowSquares = [];
                    for (var square = 0; square < amountOfSquares; square++) {
                        rowSquares.push(new GameSquare(column, square));
                    }
                    return rowSquares;
                },
                getDistance: function getDistance(x, y) {
                    if (x > y) {
                        return x - y;
                    } else {
                        return y - x;
                    }
                }
            };

            this.protected = {
                attack: function attack(x, y) {
                    var square = this.private.activeGameSquare;
                    var skill = square.getSelectedSkill();
                    var character = square.getGameObject();
                    skill.inflictDmg(character, this.private.map, x, y);
                    this.public.closeActionPanel();
                },
                initializeMap: function initializeMap(width, height) {
                    for (var column = 0; column < width; column++) {
                        this.private.initializeMapCollumn(column, height);
                    }
                },
                validatePositions: function validatePositions(newX, newY) {
                    var currentPosition = this.private.activeGameSquare;
                    var newPosition = this.public.getPosition(newX, newY);
                    return currentPosition.isOccupied() && !newPosition.isOccupied();
                },
                isInMoveRange: function isInMoveRange(newX, newY) {
                    var square = this.private.activeGameSquare;
                    if (square === null || !square.isOccupied()) {
                        return false;
                    }
                    var character = square.getGameObject();
                    var travel = this.private.getDistance(square.getX(), newX) +
                        this.private.getDistance(square.getY(), newY);
                    return travel <= character.getMobility();
                },
                isInAttackRange: function isInAttackRange(newX, newY) {
                    var square = this.private.activeGameSquare;
                    if (square === null || square.getSelectedSkill() === null) {
                        return false;
                    }
                    var travel = this.private.getDistance(square.getX(), newX) +
                        this.private.getDistance(square.getY(), newY);
                    return travel <= square.getSelectedSkill().getRange();
                },
                setActiveGameSquare: function setActiveGameSquare(gameSquare) {
                    this.private.activeGameSquare = gameSquare;
                    gameSquare.openActionPanel();
                    return true;
                }
            };

            this.public = {
                action: function action(x, y) {
                    var square = this.private.activeGameSquare;
                    if (square === null ||
                        (square.getX() === x && square.getY() === y)) {
                        this.public.openActionPanel(x, y);
                    } else if (this.public.isInMoveMode() &&
                        this.protected.isInMoveRange(x, y)) {
                        this.public.move(x, y);
                    } else if (this.public.isInAttackMode() &&
                        this.protected.isInAttackRange(x, y)) {
                        this.protected.attack(x, y);
                    } else {
                        this.public.closeActionPanel();
                    }
                },
                getActiveGameSquare: function getActiveGameSquare() {
                    return this.private.activeGameSquare;
                },
                getMap: function getMap() {
                    return this.private.map;
                },
                getPosition: function getPosition(x, y) {
                    if (this.private.map[x] === undefined) {
                        return null;
                    }
                    return this.private.map[x][y] || null;
                },
                openActionPanel: function openActionPanel(x, y) {
                    var activeSquare = this.public.getPosition(x, y);
                    if (activeSquare !== null) {
                        this.protected.setActiveGameSquare(activeSquare);
                        return activeSquare.getActionList();
                    }
                    return [];
                },
                closeActionPanel: function closeActionPanel() {
                    var activeSquare = this.private.activeGameSquare;
                    activeSquare.closeActionPanel();
                    this.private.activeGameSquare = null;
                },
                spawnCharacter: function spawnCharacter(character, x, y) {
                    var square = this.public.getPosition(x, y);
                    if (square !== null && !square.isOccupied()) {
                        square.setGameObject(character);
                        return true;
                    }
                    return false;
                },
                isInMoveRange: function isInMoveRange(newX, newY) {
                    if (!this.public.isInMoveMode()) {
                        return false;
                    }
                    return this.protected.isInMoveRange(newX, newY);
                },
                isInAttackRange: function isInAttackRange(newX, newY) {
                    if (!this.public.isInAttackMode()) {
                        return false;
                    }
                    return this.protected.isInAttackRange(newX, newY);
                },
                isInMoveMode: function isInMoveMode() {
                    if (this.private.activeGameSquare === null) {
                        return false;
                    }
                    return this.private.activeGameSquare.isInMoveMode();
                },
                isInAttackMode: function isInAttackMode() {
                    if (this.private.activeGameSquare === null) {
                        return false;
                    }
                    return this.private.activeGameSquare.isInAttackMode();
                },
                move: function move(newX, newY) {
                    var currentPosition = this.private.activeGameSquare;
                    var newPosition = this.public.getPosition(newX, newY);
                    var character = currentPosition.getGameObject();
                    if (this.protected.validatePositions(newX, newY)) {
                        currentPosition.setGameObject(null);
                        newPosition.setGameObject(character);
                    }
                    this.public.closeActionPanel();
                }
            };

            this.constructor = function constructor(width, height) {
                this.protected.initializeMap(width, height);
            };
        });
    });
}(window.angular, window.clazz));