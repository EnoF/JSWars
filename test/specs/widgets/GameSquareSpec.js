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
    });
}(window.whereIt));