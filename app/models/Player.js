/*
 * Copyright (c) 2014. 
 *
 * @author Andy Tang
 */
(function PlayerModel(angular, clazz, LinkedHashMap) {
    'use strict';

    var app = angular.module('jsWars');

    app.factory('Player', function PlayerFactory() {
        return clazz(function Player() {

            this.private = {
                name: null,
                units: new LinkedHashMap()
            };

            this.public = {
                getName: function getName() {
                    return this.private.name;
                },
                getUnits: function getUnits() {
                    return this.private.units;
                }
            };

            this.constructor = function constructor(name) {
                this.private.name = name;
            };
        });
    });
}(window.angular, window.clazz, window.LinkedHashMap));