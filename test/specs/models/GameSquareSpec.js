/*
 * Copyright (c) 2014. 
 *
 * @author Andy Tang
 */
(function GameSquareSpec(whereIt) {
    'use strict';

    describe('GameSquare Model', function gameSquareModelSpec() {

        var GameSquareModel;
        var GameObjectModel;
        var SaberModel;
        var CharacterModel;

        beforeEach(module('jsWars'));

        beforeEach(inject(function injection(GameObject, GameSquare, Saber, Character) {
            GameSquareModel = GameSquare;
            GameObjectModel = GameObject;
            SaberModel = Saber;
            CharacterModel = Character;
        }));

        whereIt('should be able to create a game square', function createGameSquare(getGameObject, isOccupied) {
            var gameSquare = new GameSquareModel(0, 0, getGameObject());
            expect(gameSquare.isOccupied()).toEqual(isOccupied);
        }, [
            {
                getGameObject: function getGameObject() {
                    return new GameObjectModel();
                },
                isOccupied: true
            },
            {
                getGameObject: function getGameObject() {
                    return null;
                },
                isOccupied: false
            }
        ]);

        whereIt('should open the action panel', function openActionPanel(getGameObject, isOpen, result) {
            var gameSquare = new GameSquareModel(0, 0, getGameObject());
            if (isOpen) gameSquare.openActionPanel();
            expect(gameSquare.getActionList()).toEqual(result);
        }, [
            {
                getGameObject: function getGameObject() {
                    return new SaberModel(0, 0, 0, 0, 0);
                },
                isOpen: true,
                result: ['move', 'attack']
            },
            {
                getGameObject: function getGameObject() {
                    return new SaberModel(0, 0, 0, 0, 0);
                },
                result: [],
                isOpen: false
            },
            {
                getGameObject: function getGameObject() {
                    return new GameObjectModel();
                },
                result: [],
                isOpen: true
            },
            {
                getGameObject: function getGameObject() {
                    return null;
                },
                result: [],
                isOpen: false
            }
        ]);

        it('should be able to open and close the panel', function closePanel() {
            var gameSquare = new GameSquareModel(0, 0, new SaberModel());
            gameSquare.openActionPanel();
            expect(gameSquare.isOpened());
            gameSquare.closeActionPanel();
            expect(gameSquare.isOpened());
        });

        it('should be able to get the available attacks', function availableAttacks() {
            var gameSquare = new GameSquareModel(0, 0, new SaberModel());
            gameSquare.startSelectingAttack();
            var list = gameSquare.getAttackList();
            expect(list[0].getName()).toEqual('Clean cut');
            expect(list[1].getName()).toEqual('Excalibur');
        });

        whereIt('should be able to select a skill', function selectSkill(isOccupied, skillIndex, result) {
            var gameSquare = new GameSquareModel();
            if (isOccupied) {
                gameSquare.setGameObject(new SaberModel());
            }
            gameSquare.startSelectingAttack();
            gameSquare.selectSkill(skillIndex);
            expect(gameSquare.getSelectedSkill() === null).toEqual(result);
            expect(gameSquare.isInAttackMode()).toEqual(true);
            expect(gameSquare.isSelectingAttack()).toEqual(false);
        }, [
            {
                isOccupied: true,
                skillIndex: 1,
                result: false
            },
            {
                isOccupied: false,
                skillIndex: 1,
                result: true
            },
            {
                isOccupied: true,
                skillIndex: 5,
                result: true
            }
        ]);

        it('should be able to close the panel', function closePanel() {
            var square = new GameSquareModel();
            square.openActionPanel();
            square.startAttackMode();
            square.closeActionPanel();
            expect(square.isOpened()).toEqual(false);
            expect(square.isInAttackMode()).toEqual(false);
        });

        it('should return an empty list when no moves are available', function noMoves() {
            var square = new GameSquareModel(0, 0, new CharacterModel());
            square.startSelectingAttack();
            expect(square.isSelectingAttack()).toEqual(true);
            expect(square.getAttackList()).toEqual([]);
        });

        it('should return false when no character is on the square', function noCharacter() {
            var square = new GameSquareModel();
            expect(square.hasAttacked()).toEqual(false);
            expect(square.hasMoved()).toEqual(false);
        });

        whereIt('should disable the options when the character has already used it',
            function disable(action, result) {
                var square = new GameSquareModel(0, 0, new CharacterModel());
                square.getGameObject().setHasAttacked(true);
                square.getGameObject().setHasMoved(true);
                expect(square.shouldDisable(action)).toEqual(result);
            }, [
                {
                    action: 'attack',
                    result: true
                },
                {
                    action: 'move',
                    result: true
                },
                {
                    action: 'cancel',
                    result: false
                }
            ]);
    });
}(window.whereIt));