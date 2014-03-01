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
                var directive = angular.element('<div data-tutorial=""></div>');
                $compile(directive)($rootScope.$new());
                $rootScope.$digest();
                scope = directive.children().children().scope();
                GameSquareModel = GameSquare;
                SaberModel = Saber;
                jasmine.Clock.useMock();
            }));

        it('should load the map [10 by 5]', function loadMap() {
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

        it('should be able to end the turn', function endTurn() {
            whenEndingTurn();
            expectPlayerTwoTurn();
        });

        it('should be able to attack enemy with clean cut', function move() {
            givenMoveModeIsStarted();
            whenMovingNextToEnemy();
            whenAttackingTheEnemyWithCleanCut();
            expectPlayerOneToHaveWon();
        });

        it('should close the action panel when action panel is open', function closePanel() {
            givenMoveModeIsStarted();
            whenClickingOutOfRange();
            expectActionPanelToBeClosed();
        });

        it('should be able to let player two win', function playerTwoWin() {
            givenMoveModeIsStarted();
            whenMovingNextToEnemy();
            whenEndingTurn();
            whenAttackingSaber();
            whenEndingTurn();
            whenEndingTurn();
            whenAttackingSaber();
            whenEndingTurn();
            whenEndingTurn();
            whenAttackingSaber();
            expectPlayerTwoToHaveWon();
        });

        it('should cancel the attack when targeting an open place', function cancelAttack() {
            givenStartingAnAttackWithCleanCut();
            whenTargetingOpenSquare();
            expect(scope.isInAttackMode()).toEqual(false);
        });

        function givenMoveModeIsStarted() {
            var square = scope.map[3][2];
            scope.action(3, 2);
            square.startMoveMode();
        }

        function givenStartingAnAttackWithCleanCut() {
            var square = scope.map[3][2];
            scope.action(3, 2);
            square.startSelectingAttack();
            square.selectSkill(0);
        }

        function whenMovingNextToEnemy() {
            scope.action(4, 2);
        }

        function whenTargetingOpenSquare() {
            scope.action(0, 0);
        }

        function whenAttackingSaber() {
            var square = scope.map[5][2];
            scope.action(5, 2);
            square.startSelectingAttack();
            square.selectSkill(0);
            scope.action(4, 2);
        }

        function whenEndingTurn() {
            scope.endTurn();
            jasmine.Clock.tick(1500);
        }

        function whenAttackingTheEnemyWithCleanCut() {
            var square = scope.map[4][2];
            scope.action(4, 2);
            square.startSelectingAttack();
            square.selectSkill(0);
            scope.action(5, 2);
        }

        function whenAttackingTheEnemyWithExcalibur() {
            var square = scope.map[3][2];
            scope.action(3, 2);
            square.startSelectingAttack();
            square.selectSkill(1);
            scope.action(5, 2);
        }

        function whenClickingOutOfRange() {
            scope.action(0, 0);
        }

        function expectEnemyDmg() {
            var enemy = scope.map[5][2].getGameObject();
            expect(enemy.getLastAppliedDmg()).toEqual(320);
            jasmine.Clock.tick(1500);
            expect(enemy.getLastAppliedDmg()).toEqual(0);
        }

        function expectPlayerTwoTurn() {
            expect(scope.getCurrentPlayer().getName()).toEqual('Player 2');
        }

        function expectPlayerOneToHaveWon() {
            jasmine.Clock.tick(1500);
            expect(scope.getWinner().getName()).toEqual('Player 1');
        }

        function expectPlayerTwoToHaveWon() {
            jasmine.Clock.tick(1500);
            expect(scope.getWinner().getName()).toEqual('Player 2');
        }

        function expectActionPanelToBeClosed() {
            expect(scope.map[3][2].isOpened()).toEqual(false);
        }
    });
}(window.whereIt));