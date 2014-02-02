/*
 * Copyright (c) 2014.
 *
 * @author Andy Tang
 */
(function FirstAttackSceneSpec(whereIt) {
    'use strict';

    describe('FirstAttackScene View Model', function firstAttackSceneSpec() {

        var scope, GameSquareModel, SaberModel;

        beforeEach(module('jsWars'));

        beforeEach(inject(
            function getViewModel($controller, $rootScope, $rootElement, $compile, GameSquare, Saber) {
                var directive = angular.element('<div data-first-attack-scene=""></div>');
                $compile(directive)($rootScope.$new());
                $rootScope.$digest();
                scope = directive.children().scope();
                GameSquareModel = GameSquare;
                SaberModel = Saber;
                jasmine.Clock.useMock();
            }));

        it('should load the map [10 by 5]', function loadCache() {
            expect(scope.map.length).toEqual(10);
            expect(scope.map[0].length).toEqual(5);
        });

        it('should have a character spawned', function character() {
            expect(scope.map[3][2].getGameObject() !== null).toEqual(true);
        });

        it('should show the damage', function showDmg() {
            whenAttackingTheEnemyWithExcalibur();
            expectEnemyDmg();
        });

        function whenAttackingTheEnemyWithExcalibur() {
            var square = scope.map[3][2];
            scope.action(3, 2);
            square.startSelectingAttack();
            square.selectSkill(1);
            scope.action(5, 2);

        }

        function expectEnemyDmg() {
            var enemy = scope.map[5][2].getGameObject();
            expect(enemy.getLastAppliedDmg()).toEqual(320);
            jasmine.Clock.tick(1500);
            expect(enemy.getLastAppliedDmg()).toEqual(0);
        }
    });
}(window.whereIt));