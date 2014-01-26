/*
 * Copyright (c) 2014. 
 *
 * @author Andy Tang
 */
(function SwordSoldierSpec(whereIt) {
    'use strict';

    describe('Sword Soldier specs', function SwordSoldierSpec() {

        var soldier, CleanCutModel;

        beforeEach(module('jsWars'));

        beforeEach(inject(function injection(SwordSoldier, CleanCut) {
            soldier = new SwordSoldier();
            CleanCutModel = CleanCut;
        }));

        it('should have one attack', function () {
            var moves = soldier.getMoves();
            expect(moves.length).toEqual(1);
            expect(moves[0] instanceof CleanCutModel).toEqual(true);
        });
    });

}(window.whereIt));