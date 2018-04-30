/*
 * MeTRoiDVaNiA Phaser.io Game
 * Author: Phil Sanders (philsanders79@gmail.com)
 */

var game = new Phaser.Game(256, 240, Phaser.auto, 'metroidvania');
game.state.add('metroidvania', metroidvania);
game.state.start('metroidvania');
