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
export function swithToOptions(scene) {     // --->
    scene.scene.pause();
    scene.scene.launch('menuOptions'); 
}
export function backFromOptions(scene) {    // <---
    scene.scene.stop();
    scene.scene.resume('menuGame', scene.optA);
    gameLogic.scene.getScene('menuGame').optA = scene.optA;
}

// sonido
export function swithToSonido(scene) {     // --->
    scene.scene.pause();
    scene.scene.launch('menuSonido'); 
}
export function backFromSonido(scene) {    // <---
    scene.scene.stop();
    scene.scene.resume('menuOptions');   
}
