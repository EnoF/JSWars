/*
 * Copyright (c) 2014. 
 *
 * @author Andy Tang
 */
(function VersusSceneModel(angular, clazz) {
    'use strict';

    var app = angular.module('jsWars');

    app.factory('VersusScene', ['Saber', 'SwordSoldier', 'Scene',
        function VersusSceneFactory(Saber, SwordSoldier) {
            return clazz(function VersusScene() {
                this.extend = 'Scene';

                this.private = {
                    createNewUnits: function createNewUnits(list) {
                        list.add(0, new Saber());
                        for (var i = 1; i < 5; i++) {
                            list.add(i, new SwordSoldier());
                        }
                    },
                    calculatPositions: function calculatePositions(unitsAdded, x, y) {
                        var position = {
                            x: x,
                            y: y
                        };
                        var positionCalculator = unitsAdded % 5;

                        if (positionCalculator === 1) {
                            position.x = x + 1;
                        } else if (positionCalculator === 2) {
                            position.y = y - 1;
                        } else if (positionCalculator === 3) {
                            position.x = x - 1;
                        } else if (positionCalculator === 4) {
                            position.y = y + 1;
                        }

                        return position;
                    },
                    positionUnits: function positionUnits(list, x, y) {
                        var unitNode = list.getFirst();
                        var unit;
                        var unitsAdded = 0;
                        var position;
                        do {
                            position = this.private.calculatPositions(unitsAdded, x, y);
                            unit = unitNode.getValue();
                            this.public.getPosition(position.x, position.y).setGameObject(unit);
                            unitsAdded++;
                        } while ((unitNode = unitNode.getNext()) !== null);
                    }
                };

                this.protected = {
                    addUnits: function addUnits() {
                        var playerList = this.public.getPlayers();
                        var playerOne = playerList.getFirst();
                        var playerTwo = playerList.getLast();
                        var unitsOne = playerOne.getValue().getUnits();
                        var unitsTwo = playerTwo.getValue().getUnits();
                        this.private.createNewUnits(unitsOne);
                        this.private.positionUnits(unitsOne, 2, 5);
                        this.private.createNewUnits(unitsTwo);
                        this.private.positionUnits(unitsTwo, 17, 5);
                    }
                };

                this.constructor = function constructor() {
                    this.super.constructor(20, 10);
                    this.protected.initializePlayers();
                };
            });
        }]);
}(window.angular, window.clazz, window.LinkedHashMap));