/*
 * Copyright (c) 2014. 
 *
 * @author Andy Tang
 */
(function versusSpec(whereIt) {
    'use strict';

    describe('versus specs', function versusSpec() {

        var scope;

        beforeEach(module('jsWars'));

        beforeEach(inject(
            function getViewModel($controller, $rootScope, $rootElement, $compile) {
                var directive = angular.element('<div data-versus=""></div>');
                $compile(directive)($rootScope.$new());
                $rootScope.$digest();
                scope = directive.children().children().scope();
            }
        ));

        it('should load the map [20 by 10]', function loadMap() {
            expect(scope.map.length).toEqual(20);
            expect(scope.map[0].length).toEqual(10);
        });
    });
}(window.whereIt));