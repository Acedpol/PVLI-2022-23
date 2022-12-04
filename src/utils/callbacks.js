import { gameLogic } from "../game.js"

// ejemplo:
// gameLogic.scene.getScene('menuGame').scene.start('pvliGame');

// recurso posible de pauseCtrl.js: offInfoBar(); onInfoBar(); toggleInfoBar();

// game
export function startGame(scene) {
    scene.scene.start('pvliGame', {optA: scene.optA, optB: scene.optB, volG: 50});
}
export function gameOver(scene) {
    scene.sound.stopAll();
    scene.sound.play('lose');
    scene.scene.stop('UI');
    scene.scene.start('GameOver');
}

// options
export function swithToOptions(scene) {     // --->
    scene.scene.launch('menuOptions', {optA: scene.optA, optB: scene.optB, volGen: scene.volGen, volAmb: scene.volAmb, volSFX: scene.volSFX}); 
    scene.scene.pause();
}
export function backFromOptions(scene) {    // <---
    scene.scene.resume('menuGame', {optA: scene.optA, optB: scene.optB, volGen: scene.volGen, volAmb: scene.volAmb, volSFX: scene.volSFX});
    scene.scene.stop();
}

// sonido
export function swithToSonido(scene) {     // --->
    scene.scene.launch('menuSonido', {optA: scene.optA, optB: scene.optB, volGen: scene.volGen, volAmb: scene.volAmb, volSFX: scene.volSFX}); 
    scene.scene.pause();
}
export function backFromSonido(scene) {    // <---
    scene.scene.resume('menuOptions', {optA: scene.optA, optB: scene.optB, volGen: scene.volGen, volAmb: scene.volAmb, volSFX: scene.volSFX});   
    scene.scene.stop();
}

export function toggleMute(scene) {
    let isMute = scene.speaker.mute;
    scene.general.mod.toggleMute(isMute);
    if (isMute) scene.speaker.setFrame(4);
    return isMute;
}
