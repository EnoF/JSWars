/*
 * Copyright (c) 2014. 
 *
 * @author Andy Tang
 */
(function FirstAttackSceneSpec(whereIt) {
    'use strict';

    describe('GameSquare Model', function gameSquareModelSpec() {

        var SaberModel;
        var SwordSoldierModel;
        var FirstAttackSceneModel;

        beforeEach(module('jsWars'));

        beforeEach(inject(function injection(Saber, SwordSoldier, FirstAttackScene) {
            SaberModel = Saber;
            SwordSoldierModel = SwordSoldier;
            FirstAttackSceneModel = FirstAttackScene;
        }));

        whereIt('should initialize a player and an enemy on a given position',
            function initializePlayerInScene(x, y, enemyX, enemyY) {
                var scene = new FirstAttackSceneModel(x, y, enemyX, enemyY);
                var player = scene.getPosition(x, y).getGameObject();
                var enemy = scene.getPosition(enemyX, enemyY).getGameObject();
                expect(player instanceof SaberModel).toEqual(true);
                expect(enemy instanceof SwordSoldierModel).toEqual(true);
            }, [
                {
                    x: 5,
                    y: 2,
                    enemyX: 4,
                    enemyY: 2
                },
                {
                    x: 2,
                    y: 3,
                    enemyX: 2,
                    enemyY: 4
                }
            ]);


        whereIt('should be able to attack a player on a given position',
            function attackPosition(x, y, hp, skill) {
                var scene = new FirstAttackSceneModel(3, 3, x, y);
                var enemyTarget = scene.getPosition(x, y).getGameObject();
                scene.action(3, 3);
                var square = scene.getActiveGameSquare();
                square.startSelectingAttack();
                square.startAttackMode();
                square.selectSkill(skill);
                scene.action(x, y);
                expect(enemyTarget.getHp()).toEqual(hp);
                expect(scene.isInAttackMode()).toEqual(false);
                expect(scene.getPosition(3, 3).isOpened()).toEqual(false);
            }, [
                {
                    x: 4,
                    y: 3,
                    skill: 0,
                    hp: 0
                },
                {
                    x: 6,
                    y: 3,
                    skill: 1,
                    hp: 180
                },
                {
                    x: 7,
                    y: 3,
                    skill: 1,
                    hp: 500
                }
            ]);
        it('should not do any dmg calculation when attacking an unoccupied square', function unOccupied() {
            var scene = new FirstAttackSceneModel(3, 3, 6, 3);
            scene.action(3, 3);
            var square = scene.getActiveGameSquare();
            square.startSelectingAttack();
            square.startAttackMode();
            square.selectSkill(1);
            expect(function testIfErrorIsThrown() {
                scene.action(3, 2);
            }).not.toThrow();
        });
    });
}(window.whereIt));