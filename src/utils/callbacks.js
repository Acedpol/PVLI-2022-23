import { gameLogic } from "../game.js"

// ejemplo:
// gameLogic.scene.getScene('menuGame').scene.start('pvliGame');

// recurso posible de pauseCtrl.js: offInfoBar(); onInfoBar(); toggleInfoBar();

// game
export function startGame(scene) {
    scene.scene.start('pvliGame', scene.optA);
}
export function gameOver(scene) {
    scene.sound.stopAll();
    scene.sound.play('lose');
    gameLogic.scene.stop('UI');
    scene.scene.start('GameOver');
}

// options
export function swithToOptions(scene, lv) {     // --->
    scene.scene.pause();
    scene.scene.start('menuOptions', lv);    
}
export function backFromOptions(scene, lv) {    // <---
    scene.scene.stop();
    scene.scene.resume('menuGame', lv);    
}
