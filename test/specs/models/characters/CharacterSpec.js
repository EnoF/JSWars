/*
 * Copyright (c) 2014. 
 *
 * @author Andy Tang
 */
(function characterSpec(whereIt) {
    'use strict';

    describe('Character Model', function characterModelSpec() {

        var CharacterModel;

        beforeEach(module('jsWars'));

        beforeEach(inject(function injection(Character) {
            CharacterModel = Character;
        }));

        whereIt('should be able to retrieve the stats of an character',
            function retrieveStats(hp, attack, defence, mobility, sizeX, sizeY) {
                var character = new CharacterModel(0, null, hp, attack, defence, mobility, sizeX, sizeY);
                expect(character.getHp()).toEqual(hp);
                expect(character.getAttack()).toEqual(attack);
                expect(character.getDefence()).toEqual(defence);
                expect(character.getMobility()).toEqual(mobility);
                expect(character.getSizeX()).toEqual(sizeX);
                expect(character.getSizeY()).toEqual(sizeY);
            }, [
                {
                    hp: 100,
                    attack: 20,
                    defence: 10,
                    mobility: 5,
                    sizeX: 1,
                    sizeY: 1
                },
                {
                    hp: 1000,
                    attack: 200,
                    defence: 50,
                    mobility: 2,
                    sizeX: 5,
                    sizeY: 5
                }
            ]);
    });
}(window.whereIt));