/*
 * Copyright (c) 2014. 
 *
 * @author Andy Tang
 */
(function Excalibur(angular, clazz) {
    'use strict';

    var app = angular.module('jsWars');

    app.factory('Excalibur', ['Skill', function ExcaliburFactory() {
        return clazz(function Excalibur() {
            this.extend = 'Skill';

            this.constructor = function constructor() {
                this.super.constructor('Excalibur', 2, 3, 0);
            };
        });
    }]);

}(window.angular, window.clazz));