/*
 * Copyright (c) 2014. 
 *
 * @author Andy Tang
 */
(function VersusScene() {
    'use strict';

    describe('Versus Scene Scenarios', function VersusScene() {

        beforeEach(function navigateTo() {
            browser().navigateTo('/#/versus');
        });

        it('should have 20 x 10 game squares', function gameSquares() {
            expect(element('.game-square').count()).toEqual(20 * 10);
        });

        it('should spawn two sabers', function spawnTwoSabers() {
            expect(element('.saber').count()).toEqual(2);
        });

        it('should spawn 10 sword soldiers', function swordSoldiers() {
            expect(element('.sword-soldier').count()).toEqual(8);
        });
    });
}());