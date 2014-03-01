/*
 * Copyright (c) 2014.
 *
 * @author Andy Tang
 */
(function GameSquareSpec(whereIt) {
    'use strict';

    describe('GameSquare View Model', function GameSquareSpec() {

        var scope;

        beforeEach(module('jsWars'));

        describe('unoccupied square', function unoccupied() {
            beforeEach(inject(
                function getViewModel($controller, $rootScope, $rootElement, $compile, GameSquare) {
                    var directive = angular.element('<div data-game-square="gameSquare"></div>');
                    var newScope = $rootScope.$new();
                    newScope.gameSquare = new GameSquare();
                    $compile(directive)(newScope);
                    $rootScope.$digest();
                    scope = directive.children().scope();
                }));

            it('should prevent clicking to propagate to the parents', function stopPropagation() {
                var eventMock = {};
                scope.stopPropagation(eventMock);
                expect(eventMock.cancelBubble).toEqual(true);
            });

            it('should not allow a player to perform actions', function preventPerformActions() {
                expect(scope.canPerformActions()).toEqual(false);
                expect(scope.canAttack()).toEqual(false);
                expect(scope.canMove()).toEqual(false);
            });
        });

        describe('occupied square', function occupied() {
            var saber, player;

            beforeEach(inject(
                function getViewModel($controller, $rootScope, $rootElement, $compile, GameSquare, Saber, Player) {
                    var directive = angular.element('<div data-game-square="gameSquare"></div>');
                    var newScope = $rootScope.$new();
                    player = new Player();
                    saber = new Saber(0, player);
                    newScope.gameSquare = new GameSquare(0, 0, saber);
                    $compile(directive)(newScope);
                    $rootScope.$digest();
                    scope = directive.children().scope();
                }));

            it('should allow a player to perform actions', function performActions() {
                givenPlayerIsAtTurn();
                expect(scope.canPerformActions()).toEqual(true);
            });

            function givenPlayerIsAtTurn() {
                spyOn(player, 'isAllowedToPerformActions').andReturn(true);
            }
        });
    });
}(window.whereIt));