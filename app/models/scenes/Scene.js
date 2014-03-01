/*
 * Copyright (c) 2014. 
 *
 * @author Andy Tang
 */
(function SceneModel(angular, clazz, LinkedHashMap, undefined) {
    'use strict';

    var app = angular.module('jsWars');

    app.factory('Scene', function SceneFactory(GameSquare, Player) {
        return clazz(function Scene() {

            this.private = {
                activeGameSquare: {
                    get: null
                },
                isEndingTurn: false,
                isGameEnded: false,
                winner: null,
                map: {
                    get: []
                },
                notify: {
                    set: null
                },
                players: {
                    get: new LinkedHashMap()
                },
                currentPlayerNode: null,
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
                    character.setHasAttacked(true);
                    this.public.closeActionPanel();
                },
                addUnits: function addUnits() {
                    throw new Error('Exception not implemented');
                },
                endTurn: function endTurn(player) {
                    var units = player.getUnits();
                    player.setAllowedToPerformActions(false);
                    for (var unit = units.getFirst(); unit; unit = unit.getNext()) {
                        unit.getValue().setActive(false);
                    }
                },
                hasGameEnded: function hasGameEnded() {
                    var enemy = this.protected.getNextPlayer().getValue();
                    return enemy.getUnits().isEmpty();
                },
                startTurn: function startTurn(player) {
                    var units = player.getUnits();
                    player.setAllowedToPerformActions(true);
                    for (var unit = units.getFirst(); unit; unit = unit.getNext()) {
                        unit.getValue().setHasAttacked(false);
                        unit.getValue().setHasMoved(false);
                        unit.getValue().setActive(true);
                    }
                },
                initializeMap: function initializeMap(width, height) {
                    for (var column = 0; column < width; column++) {
                        this.private.initializeMapCollumn(column, height);
                    }
                },
                initializePlayers: function initializePlayers() {
                    this.private.players.add(0, new Player('Player 1'));
                    this.private.players.add(1, new Player('Player 2'));
                    this.private.currentPlayerNode = this.private.players.getFirst();
                    this.protected.addUnits();
                },
                isInMoveRange: function isInMoveRange(newX, newY) {
                    var square = this.private.activeGameSquare;
                    var character = square.getGameObject();
                    var travel = this.private.getDistance(square.getX(), newX) +
                        this.private.getDistance(square.getY(), newY);
                    return travel <= character.getMobility();
                },
                isInAttackRange: function isInAttackRange(newX, newY) {
                    var square = this.private.activeGameSquare;
                    var travel = this.private.getDistance(square.getX(), newX) +
                        this.private.getDistance(square.getY(), newY);
                    return travel <= square.getSelectedSkill().getRange();
                },
                setActiveGameSquare: function setActiveGameSquare(gameSquare) {
                    this.private.activeGameSquare = gameSquare;
                    gameSquare.openActionPanel();
                    return true;
                },
                setCurrentPlayer: function setCurrentPlayer(playerNode) {
                    this.private.currentPlayerNode = playerNode;
                },
                setAllCharacterStates: function setAllCharacterStates(list, active) {
                    for (var node = list.getFirst(); node; node = node.getNext()) {
                        node.getValue().setActive(active);
                    }
                },
                getNextPlayer: function getNextPlayer() {
                    var currentPlayer = this.private.currentPlayerNode;
                    var nextPlayerNode = currentPlayer.getNext();
                    if (nextPlayerNode === null) {
                        nextPlayerNode = this.private.players.getFirst();
                    }
                    return nextPlayerNode;
                }
            };

            this.public = {
                attack: function attack(x, y) {
                    if (this.public.isInAttackRange(x, y)) {
                        this.protected.attack(x, y);
                    } else {
                        this.public.closeActionPanel();
                    }
                },
                endTurn: function endTurn() {
                    var currentPlayerNode = this.private.currentPlayerNode;
                    var nextPlayer = this.protected.getNextPlayer();
                    this.protected.endTurn(currentPlayerNode.getValue());
                    this.private.currentPlayerNode = nextPlayer;
                    this.private.isEndingTurn = true;
                    setTimeout(this.public.startNextTurn, 1500);
                },
                startNextTurn: function startNextTurn() {
                    this.protected.startTurn(this.private.currentPlayerNode.getValue());
                    this.private.isEndingTurn = false;
                    this.private.notify();
                },
                getCurrentPlayer: function getCurrentPlayer() {
                    return this.private.currentPlayerNode.getValue();
                },
                getPosition: function getPosition(x, y) {
                    if (this.private.map[x] === undefined) {
                        return null;
                    }
                    return this.private.map[x][y] || null;
                },
                getWinner: function getWinner() {
                    var list = this.private.players;
                    var playerNode = list.getFirst();
                    var player;
                    if (this.protected.hasGameEnded()) {
                        for (playerNode; playerNode; playerNode = playerNode.getNext()) {
                            player = playerNode.getValue();
                            if (!player.getUnits().isEmpty()) {
                                return player;
                            }
                        }
                    }
                    return null;
                },
                isEndingTurn: function isEndingTurn() {
                    return this.private.isEndingTurn;
                },
                openActionPanel: function openActionPanel(x, y) {
                    var activeSquare = this.public.getPosition(x, y);
                    this.protected.setActiveGameSquare(activeSquare);
                    return activeSquare.openActionPanel();
                },
                closeActionPanel: function closeActionPanel() {
                    var activeSquare = this.private.activeGameSquare;
                    activeSquare.closeActionPanel();
                    this.private.activeGameSquare = null;
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
                hasGameEnded: function hasGameEnded() {
                    return this.protected.hasGameEnded();
                },
                hasActionPanelOpen: function hasActionPanelOpen() {
                    if (this.private.activeGameSquare === null) {
                        return false;
                    }
                    return this.private.activeGameSquare.isOpened();
                },
                move: function move(newX, newY) {
                    var currentPosition = this.private.activeGameSquare;
                    var newPosition = this.public.getPosition(newX, newY);
                    var character = currentPosition.getGameObject();
                    currentPosition.setGameObject(null);
                    newPosition.setGameObject(character);
                    character.setHasMoved(true);
                    this.public.closeActionPanel();
                }
            };

            this.constructor = function constructor(width, height) {
                this.protected.initializeMap(width, height);
            };
        });
    });
}(window.angular, window.clazz, window.LinkedHashMap));