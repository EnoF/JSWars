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
                name: {
                    get: null
                },
                units: {
                    get: new LinkedHashMap()
                },
                allowedToPerformActions: {
                    isSet: false
                }
            };

            this.constructor = function constructor(name) {
                this.private.name = name;
            };
        });
    });
}(window.angular, window.clazz, window.LinkedHashMap));