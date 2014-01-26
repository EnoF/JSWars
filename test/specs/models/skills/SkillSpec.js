/*
 * Copyright (c) 2014. 
 *
 * @author Andy Tang
 */
(function SkillSpec(whereIt) {
    'use strict';

    describe('Skill specs', function skillSpecs() {

        var SkillModel, CharacterModel;

        beforeEach(module('jsWars'));

        beforeEach(inject(function injection(Skill, Character) {
            SkillModel = Skill;
            CharacterModel = Character;
        }));

        whereIt('should be able initialize different Skills',
            function skillWithDifferentStats(dmgAmp, range, aoe, att, def, dmg) {
                var skill = new SkillModel('name', dmgAmp, range, aoe);
                var executer = new CharacterModel(0, att, 0, 0, 0);
                var receiver = new CharacterModel(0, 0, def, 0, 0);
                expect(skill.calcDmg(executer, receiver)).toEqual(dmg);
            }, [
                {
                    dmgAmp: 1,
                    range: 1,
                    aoe: 0,
                    att: 200,
                    def: 100,
                    dmg: 100
                },
                {
                    dmgAmp: 0.5,
                    range: 2,
                    aoe: 1,
                    att: 200,
                    def: 100,
                    dmg: 0
                },
                {
                    dmgAmp: 0.5,
                    range: 2,
                    aoe: 1,
                    att: 200,
                    def: 200,
                    dmg: 0
                }
            ]);
    });

}(window.whereIt));