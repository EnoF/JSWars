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
            }));

        it('should load the map [10 by 5]', function loadCache() {
            expect(scope.map.length).toEqual(10);
            expect(scope.map[0].length).toEqual(5);
        });

        it('should have a character spawned', function character() {
            expect(scope.map[3][2].getGameObject() !== null).toEqual(true);
        });

        whereIt('should start the correct mode', function actionSelected(action, mode) {
            var squareScope = scope.$$childHead.$$childHead.$$childHead;
            scope.action(0, 0);
            squareScope.resolveAction(action, {});
            expect(scope[mode]()).toEqual(true);
        }, [
            {
                action: 'move',
                mode: 'isInMoveMode'
            }
        ]);

    });
}(window.whereIt));