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

        it('should throw an error when a scene is extended without implementing addUnits', function addUnits() {
            var BrokenScene = clazz(function BrokenScene() {
                this.extend = 'Scene';

                this.constructor = function constructor() {
                    this.protected.initializePlayers();
                };
            });

            expect(function testingConstructor() {
                new BrokenScene();
            }).toThrow(new Error('Exception not implemented'));
        });
    });
}(window.whereIt));