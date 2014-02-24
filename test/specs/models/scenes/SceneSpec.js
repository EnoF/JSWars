/*
 * Copyright (c) 2014. 
 *
 * @author Andy Tang
 */
(function SceneSpec(whereIt) {
    'use strict';

    describe('Scene Model', function gameSquareModelSpec() {

        var GameSquareModel;
        var GameObjectModel;
        var CharacterModel;
        var SceneModel;
        var scene;
        var saber;

        beforeEach(module('jsWars'));

        beforeEach(inject(function injection(Scene, GameObject, GameSquare, Character, Saber) {
            GameSquareModel = GameSquare;
            GameObjectModel = GameObject;
            SceneModel = Scene;
            CharacterModel = Character;
            saber = new Saber();
            scene = new Scene(10, 10);
        }));

        whereIt('should initialize a scene with', function sceneInitialization(width, height) {
            var scene = new SceneModel(width, height);
            expect(scene.getPosition(0, 0) instanceof GameSquareModel).toEqual(true);
            expect(scene.getPosition(width - 1, height - 1) instanceof GameSquareModel).toEqual(true);
            expect(scene.getPosition(width - 1, height) instanceof GameSquareModel).toEqual(false);
            expect(scene.getPosition(width, height - 1) instanceof GameSquareModel).toEqual(false);
        }, [
            {
                width: 10,
                height: 10
            },
            {
                width: 2,
                height: 10
            },
            {
                width: 10,
                height: 2
            }
        ]);

//        whereIt('should be able to highlight where the character is allowed to move to',
//            function checkWhereToMoveTo(mobility, sizeX, sizeY, spawnPointX, spawnPointY, newX, newY, allowed) {
//                var character = new CharacterModel(0, null, 0, 0, 0, mobility, sizeX, sizeY);
//                scene.spawnCharacter(character, spawnPointX, spawnPointY);
//                scene.action(spawnPointX, spawnPointY);
//                scene.getActiveGameSquare().startMoveMode();
//                expect(scene.isInMoveRange(newX, newY)).toEqual(allowed);
//                scene.action(newX, newY);
//                expect(scene.getPosition(spawnPointX, spawnPointY).isOccupied()).toEqual(!allowed);
//                expect(scene.getPosition(newX, newY).isOccupied()).toEqual(allowed);
//            }, [
//                {
//                    mobility: 1,
//                    sizeX: 1,
//                    sizeY: 1,
//                    spawnPointX: 4,
//                    spawnPointY: 4,
//                    newX: 4,
//                    newY: 3,
//                    allowed: true
//                },
//                {
//                    mobility: 1,
//                    sizeX: 1,
//                    sizeY: 1,
//                    spawnPointX: 4,
//                    spawnPointY: 4,
//                    newX: 4,
//                    newY: 2,
//                    allowed: false
//                },
//                {
//                    mobility: 1,
//                    sizeX: 1,
//                    sizeY: 1,
//                    spawnPointX: 4,
//                    spawnPointY: 4,
//                    newX: 2,
//                    newY: 4,
//                    allowed: false
//                },
//                {
//                    mobility: 3,
//                    sizeX: 1,
//                    sizeY: 1,
//                    spawnPointX: 4,
//                    spawnPointY: 4,
//                    newX: 7,
//                    newY: 4,
//                    allowed: true
//                },
//                {
//                    mobility: 3,
//                    sizeX: 1,
//                    sizeY: 1,
//                    spawnPointX: 4,
//                    spawnPointY: 4,
//                    newX: 7,
//                    newY: 5,
//                    allowed: false
//                }
//            ]);

//        whereIt('should be able to highlight attackable possitions',
//            function attackablePositions(x, y, result) {
//                scene.spawnCharacter(saber, 3, 3);
//                scene.action(3, 3);
//                var square = scene.getPosition(3, 3);
//                square.resolveAction('attack');
//                square.selectSkill(0);
//                expect(scene.isInAttackRange(x, y)).toEqual(result);
//            }, [
//                {x: 3, y: 2, result: true},
//                {x: 4, y: 2, result: false}
//            ]);

//        it('should not allow a player to be spawned on an occupied square', function occupiedSpawn() {
//            var character = new CharacterModel();
//            expect(scene.spawnCharacter(character, 11, 11)).toEqual(false);
//        });

        whereIt('should be able to open an actionpanel', function openActionPanel(x, y, actions) {
            scene.getPosition(5, 5).setGameObject(new CharacterModel());
            scene.getPosition(3, 3).setGameObject(new GameObjectModel());
            expect(scene.openActionPanel(x, y)).toEqual(actions);
        }, [
            {
                x: 5, y: 5, actions: ['move', 'attack']
            },
            {
                x: 3, y: 3, actions: []
            },
            {
                x: 1, y: 5, actions: []
            }
        ]);

//        it('should open the action panel when nothing is open yet', function nothingOpenYet() {
//            scene.getPosition(5, 5).setGameObject(new CharacterModel());
//            scene.action(5, 5);
//            expect(scene.getActiveGameSquare().isOpened()).toEqual(true);
//        });
//
//        it('should do nothing when the position is of the active square', function nothingToDo() {
//            scene.getPosition(5, 5).setGameObject(new CharacterModel());
//            scene.action(5, 5);
//            expect(scene.getActiveGameSquare().isOpened()).toEqual(true);
//            scene.action(5, 5);
//            expect(scene.isInMoveMode()).toEqual(false);
//            expect(scene.getActiveGameSquare().isOpened()).toEqual(true);
//        });
//
//        it('should prevent openening an action panel', function noSquareFound() {
//            scene.action(100, 100);
//            expect(scene.getActiveGameSquare() === null).toEqual(true);
//        });

    });
}(window.whereIt));