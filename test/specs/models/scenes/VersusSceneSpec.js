/*
 * Copyright (c) 2014.
 *
 * @author Andy Tang
 */

(function VersusSceneSpec(whereIt) {
    'use strict';

    describe('Versus Scene Model', function versusSceneModelSpec() {

        var scene;
        var square;

        beforeEach(module('jsWars'));

        beforeEach(inject(function injection(VersusScene) {
            jasmine.Clock.installMock();
            scene = new VersusScene();
        }));

        it('should directly open the action menu when canceled of an other action menu', function directlyOpen() {
            expect(scene.getMap().length).toEqual(20);
            expect(scene.getMap()[0].length).toEqual(10);
        });

        whereIt('should only allow characters of the current player to perform actions', function performActions(x, y, allowed) {
            var map = scene.getMap();
            expect(map[x][y].canPerformActions()).toEqual(allowed);
        }, [
            {
                x: 2,
                y: 5,
                allowed: true
            },
            {
                x: 17,
                y: 5,
                allowed: false
            },
            {
                x: 0,
                y: 0,
                allowed: false
            }
        ]);
    });
}(window.whereIt));