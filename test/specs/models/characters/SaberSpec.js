/*
 * Copyright (c) 2014. 
 *
 * @author Andy Tang
 */
(function SaberSpec(whereIt) {
    'use strict';

    describe('Saber specs', function saberSpecs() {
        var saber, skills;

        beforeEach(module('jsWars'));

        beforeEach(inject(function injection(Saber, CleanCut, Excalibur) {
            saber = new Saber();
            skills = {
                cleanCut: CleanCut,
                excalibur: Excalibur
            };
        }));

        whereIt('should have the move', function moveChecker(moveIndex, getMove) {
            expect(saber.getMoves()[moveIndex] instanceof getMove()).toEqual(true);
        }, [
            {
                moveIndex: 0,
                getMove: function getCleanCut() {
                    return skills.cleanCut;
                }
            },
            {
                moveIndex: 1,
                getMove: function getExcalibur() {
                    return skills.excalibur;
                }
            }
        ]);
    });

}(window.whereIt));