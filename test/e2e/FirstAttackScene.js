/*
 * Copyright (c) 2014. 
 *
 * @author Andy Tang
 */
(function FirstAttackSceneScenarios(whereIt) {

    describe('First Attack Scene Scenarios', function FirstAttackScene() {

        beforeEach(function () {
            browser().navigateTo('/');
        });

        it('should have one saber and one sword soldier', function oneCharacter() {
            expect(element('.saber').count()).toEqual(1);
            expect(element('.sword-soldier').count()).toEqual(1);
        });

        it('should have 10 x 5 game squares', function gameSquares() {
            expect(element('.game-square').count()).toEqual(10 * 5);
        });

        it('should show a menu when clicking on a character', function actionMenu() {
            expect(element('.game-square:has(.saber)').count()).toEqual(1);
            element('.game-square:has(.saber)').click();
            expect(element('.game-square:has(.saber) .action-menu li').count()).toEqual(3);
            var text = element('.game-square:has(.saber) li').text();
            expect(text).toContain('attack');
            expect(text).toContain('move');
            expect(text).toContain('cancel');
        });

        it('should be able to move a character closer to an enemy and attack the enemy', function moveCloserAndAttack() {
            element('.column:eq(3) [data-game-square]:eq(2)').click();
            element('.action-menu:visible li:eq(0)').click();
            element('.column:eq(4) [data-game-square]:eq(2)').click();
            element('.column:eq(4) [data-game-square]:eq(2)').click();
            element('.action-menu:visible li:eq(1)').click();
            element('.attack-list:visible li:eq(0)').click();
            element('.column:eq(5) [data-game-square]:eq(2)').click();
            expect(element('.column:eq(5) [data-game-square]:eq(2) .hp-bar span').css('width')).toEqual("0px");
        });
    });

}(window.whereIt));