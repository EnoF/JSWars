/*
 * Copyright (c) 2014. 
 *
 * @author Andy Tang
 */
(function FirstAttackSceneScenarios(whereIt) {
    'use strict';
    describe('First Attack Scene Scenarios', function FirstAttackScene() {

        beforeEach(function () {
            browser().navigateTo('/#/tutorial');
        });

        it('should have one saber and one sword soldier', function oneCharacter() {
            expect(element('.saber').count()).toEqual(1);
            expect(element('.sword-soldier').count()).toEqual(1);
        });

        it('should have 10 x 5 game squares', function gameSquares() {
            expect(element('.game-square').count()).toEqual(10 * 5);
        });

        it('should show a menu when clicking on a character', function actionMenu() {
            clickOnSaber();
            expect(element('.game-square:has(.saber) .action-menu li').count()).toEqual(3);
            var text = element('.game-square:has(.saber) li').text();
            expect(text).toContain('attack');
            expect(text).toContain('move');
            expect(text).toContain('cancel');
        });

        it('should be able to move a character closer to an enemy and attack the enemy', function moveCloserAndAttack() {
            clickOnSaber();
            selectFromActiveActionMenu(0);
            clickOnPosition(4, 2);
            clickOnSaber();
            selectFromActiveActionMenu(1);
            selectFromActiveAttackList(0);
            clickOnPosition(5, 2);
            expect(element('.column:eq(5) [data-game-square]:eq(2) .hp-bar span').css('width')).toEqual('0px');
        });

        it('should be able to attack only once', function attackOnce() {
            clickOnSaber();
            selectFromActiveActionMenu(1);
            selectFromActiveAttackList(1);
            clickOnPosition(5, 2);
            clickOnSaber();
            selectFromActiveActionMenu(1);
            expect(element('.attack-list:visible').count()).toEqual(0);
        });

        function clickOnSaber() {
            element('.saber').click();
        }

        function selectFromActiveActionMenu(item) {
            element('.action-menu:visible li:eq(' + item + ')').click();
        }

        function selectFromActiveAttackList(item) {
            element('.attack-list:visible li:eq(' + item + ')').click();
        }

        function clickOnPosition(x, y) {
            element('.column:eq(' + x + ') [data-game-square]:eq(' + y + ')').click();
        }
    });

}(window.whereIt));