/*
 * Copyright (c) 2014. 
 *
 * @author Andy Tang
 */
(function Skill(angular, clazz) {
    'use strict';

    var app = angular.module('jsWars');

    app.factory('Skill', function SkillFactory() {
        return clazz(function Skill() {

            this.private = {
                name: '',
                dmgAmp: 1,
                range: 1,
                aoe: 0
            };

            this.protected = {
                searchTargets: function searchTargets(map, x, y) {
                    var targets = [];
                    var character = map[x][y].getGameObject();
                    if (character !== null) {
                        targets.push(character);
                    }
                    return targets;
                }
            };

            this.public = {
                calcDmg: function calcDmg(executer, receiver) {
                    var dmg = executer.getAttack() * this.private.dmgAmp - receiver.getDefence();
                    if (dmg < 0) {
                        dmg = 0;
                    }
                    return dmg;
                },
                inflictDmg: function inflictDmg(character, map, x, y) {
                    var targets = this.protected.searchTargets(map, x, y);
                    for (var targetIndex = 0; targetIndex < targets.length; targetIndex++) {
                        var target = targets[targetIndex];
                        var dmg = this.public.calcDmg(character, target);
                        target.applyDmg(dmg);
                    }
                },
                getName: function getName() {
                    return this.private.name;
                },
                getRange: function getRange() {
                    return this.private.range;
                }
            };

            this.constructor = function constructor(name, dmgAmp, range, aoe) {
                this.private.name = name;
                this.private.dmgAmp = dmgAmp;
                this.private.range = range;
                this.private.aoe = aoe;
            };
        });
    });

}(window.angular, window.clazz));