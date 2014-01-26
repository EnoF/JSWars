/*
 * Copyright (c) 2014. 
 *
 * @author Andy Tang
 */
(function CharacterSpec(whereIt) {
    'use strict';

    describe('Character View Model', function characterSpec() {

        var scope;

        beforeEach(module('jsWars'));

        beforeEach(inject(function getViewModel($controller, $rootScope, $rootElement, $compile, Saber) {
            var newScope = $rootScope.$new();
            newScope.character = new Saber();

            var directive = angular.element('<div data-character="character"></div>');
            $compile(directive)(newScope);
            $rootScope.$digest();

            scope = directive.children().scope();
        }));

        it('should provide hp', function provideHp() {
            expect(scope.hp).toEqual(1000);
        });
    });
}(window.whereIt));