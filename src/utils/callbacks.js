import { offInfoBar, onInfoBar } from "../../lib/pauseCtrl.js";
import { gameLogic } from "../game.js"

// ejemplo:
// gameLogic.scene.getScene('menuGame').scene.start('pvliGame');

// recurso posible de pauseCtrl.js: offInfoBar(); onInfoBar(); toggleInfoBar();

// main menu
export function startMain(scene) {
    scene.scene.start('menuGame', {optA: scene.optA, optB: scene.optB, volGen: scene.volGen, volAmb: scene.volAmb, volSFX: scene.volSFX});
}

// game
export function startGame(scene) {
    scene.scene.start('pvliGame', {optA: scene.optA, optB: scene.optB, volGen: scene.volGen, volAmb: scene.volAmb, volSFX: scene.volSFX});
}
export function gameOver(scene) {
    scene.sound.stopAll();
    scene.sound.play('lose');
    scene.scene.stop('UI');
    scene.scene.start('GameOver', {optA: scene.optA, optB: scene.optB, volGen: scene.volGen, volAmb: scene.volAmb, volSFX: scene.volSFX});
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
    // else scene.speaker.setFrame(0);
}

export function setPause(scene) {
    onInfoBar();
    scene.scene.pause();
    scene.scene.launch('blankPause', {optA: scene.optA, optB: scene.optB, volGen: scene.volGen, volAmb: scene.volAmb, volSFX: scene.volSFX});
}

export function resume(scene, dest) {
    offInfoBar();
    scene.scene.resume(dest, {optA: scene.optA, optB: scene.optB, volGen: scene.volGen, volAmb: scene.volAmb, volSFX: scene.volSFX});
    scene.scene.stop();
}


