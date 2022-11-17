import { gameLogic } from "../game.js"
import { offInfoBar } from '../../lib/pauseCtrl.js'

export function initGame(scene, lv) {
    // gameLogic.scene.getScene('menuGame').scene.start('pvliGame');
    scene.scene.start('pvliGame', lv);
    offInfoBar();
}

export function initOver(scene) {
    scene.sound.stopAll();
    scene.sound.play('lose');
    gameLogic.scene.stop('UI');
    scene.scene.start('GameOver');
}
