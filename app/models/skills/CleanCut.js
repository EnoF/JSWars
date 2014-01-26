/*
 * Copyright (c) 2014. 
 *
 * @author Andy Tang
 */
(function CleanCut(angular, clazz) {
    'use strict';

    var app = angular.module('jsWars');

    app.factory('CleanCut', ['Skill', function CleanCutFactory() {
        return clazz(function CleanCut() {
            this.extend = 'Skill';

            this.constructor = function constructor() {
                this.super.constructor('Clean cut', 3, 1, 0);
            };
        });
    }]);

}(window.angular, window.clazz));