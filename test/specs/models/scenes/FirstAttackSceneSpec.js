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
        var scene;
        var square;

        beforeEach(module('jsWars'));

        beforeEach(inject(function injection(Saber, SwordSoldier, FirstAttackScene) {
            jasmine.Clock.installMock();
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

        whereIt('should mark the character as has attacked', function markAttacked(x, y, result) {
            var scene = new FirstAttackSceneModel(3, 3, 4, 3);
            scene.action(3, 3);
            var square = scene.getActiveGameSquare();
            square.startSelectingAttack();
            square.startAttackMode();
            square.selectSkill(0);
            scene.action(x, y);
            expect(square.getGameObject().hasAttacked()).toEqual(result);
        }, [
            {
                x: 4,
                y: 3,
                result: true
            },
            {
                x: 2,
                y: 3,
                result: true
            },
            {
                x: 2,
                y: 4,
                result: false
            }
        ]);

        it('should not allow a player to attack again when already attacked', function preventAttack() {
            var scene = new FirstAttackSceneModel(3, 3, 4, 3);
            scene.action(3, 3);
            var square = scene.getActiveGameSquare();
            square.startSelectingAttack();
            square.startAttackMode();
            square.selectSkill(0);
            scene.action(4, 3);
            scene.action(3, 3);
            square.startSelectingAttack();
            expect(square.isSelectingAttack()).toEqual(false);
            expect(square.hasAttacked()).toEqual(true);
        });

        it('should not allow a player to move again when moved', function preventMove() {
            givenPlayerSpanwedNextToEnemy();

            whenStartingMoveMode();
            whenMovingAwayFromTheEnemyAndOpenMenu();
            whenMovingAgain();

            expectUnableToMove();
        });

        it('should return the first player', function listOfPlayers() {
            givenPlayerSpanwedNextToEnemy();
            expectCurrentPlayerToBePlayerOne();
        });

        it('should be able to end a turn of player one', function endTurn() {
            givenPlayerSpanwedNextToEnemy();

            whenStartingMoveMode();
            whenMovingAwayFromTheEnemyAndOpenMenu();
            whenAttackingWithSecondSkill();
            whenEndingTheTurn();

            expectCurrentPlayerToBeEnemy();

            whenEnemyIsEndingTheTurn();

            expectCurrentPlayerToBePlayerOne();
        });

        it('should directly open the action menu when canceled of an other action menu', function directlyOpen() {
            givenPlayerSpanwedNextToEnemy();
            whenOpeningActionMenu();
            whenCancelingActionMenu();
            whenOpeningEnemyActionMenu();
            expectEnemyActionMenuToBeOpen();
        });

        it('should remove a character when killed', function removeCharacter() {
            givenPlayerSpanwedNextToEnemy();
            expect(scene.hasGameEnded()).toEqual(false);
            whenOpeningActionMenu();
            whenAttackingWithFirstSkill();

            expectEnemyToBeDead();
            expectPlayerOneToHaveWon();
        });

        function givenPlayerSpanwedNextToEnemy() {
            scene = new FirstAttackSceneModel(3, 3, 4, 3);
        }

        function whenStartingMoveMode() {
            scene.action(3, 3);
            square = scene.getActiveGameSquare();
            square.resolveAction('move');
        }

        function whenMovingAwayFromTheEnemyAndOpenMenu() {
            scene.action(2, 3);
            scene.action(2, 3);
        }

        function whenOpeningActionMenu() {
            scene.action(3, 3);
        }

        function whenCancelingActionMenu() {
            square = scene.getActiveGameSquare();
            square.closeActionPanel();
        }

        function whenOpeningEnemyActionMenu() {
            scene.action(4, 3);
        }

        function whenAttackingWithFirstSkill() {
            var square = scene.getActiveGameSquare();
            square.startSelectingAttack();
            square.startAttackMode();
            square.selectSkill(0);
            scene.action(4, 3);
        }

        function whenAttackingWithSecondSkill() {
            var square = scene.getActiveGameSquare();
            square.startSelectingAttack();
            square.startAttackMode();
            square.selectSkill(1);
            scene.action(4, 3);
        }

        function whenEndingTheTurn() {
            scene.endTurn();
            expect(scene.isEndingTurn()).toEqual(true);
            jasmine.Clock.tick(1500);
            expect(scene.isEndingTurn()).toEqual(false);
        }

        function whenEnemyIsEndingTheTurn() {
            scene.endTurn();
            expect(scene.isEndingTurn()).toEqual(true);
            jasmine.Clock.tick(1500);
            expect(scene.isEndingTurn()).toEqual(false);
        }

        function whenMovingAgain() {
            square = scene.getActiveGameSquare();
            square.resolveAction('move');
        }

        function expectCurrentPlayerToBePlayerOne() {
            var saber = scene.getCurrentPlayer().getUnits().getFirst().getValue();
            expect(scene.getCurrentPlayer().getName()).toEqual('Player 1');
            expect(saber.hasMoved()).toEqual(false);
            expect(saber.hasAttacked()).toEqual(false);
        }

        function expectCurrentPlayerToBeEnemy() {
            expect(scene.getCurrentPlayer().getName()).toEqual('Player 2');
        }

        function expectUnableToMove() {
            expect(scene.isInMoveMode()).toEqual(false);
            expect(square.hasMoved()).toEqual(true);
        }

        function expectEnemyActionMenuToBeOpen() {
            expect(scene.getPosition(4, 3).isOpened()).toEqual(true);
        }

        function expectEnemyToBeDead() {
            expect(scene.getPosition(4, 3).isOccupied()).toEqual(true);
            jasmine.Clock.tick(1500);
            expect(scene.getPosition(4, 3).isOccupied()).toEqual(false);
        }

        function expectPlayerOneToHaveWon() {
            expect(scene.hasGameEnded()).toEqual(true);
            expect(scene.getWinner().getName()).toEqual('Player 1');
        }

    });
}(window.whereIt));