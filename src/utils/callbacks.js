import { offInfo, offInfoBar, onInfo, onInfoBar } from "../../lib/pauseCtrl.js";
import { gameLogic } from "../game.js"

// ejemplo:
// gameLogic.scene.getScene('menuGame').scene.start('pvliGame');

// recurso posible de pauseCtrl.js: offInfoBar(); onInfoBar(); toggleInfoBar();

// main menu
export function startMain(scene) {
    scene.scene.start('menuGame', {optA: scene.optA, optB: scene.optB, volGen: scene.volGen, volAmb: scene.volAmb, volSFX: scene.volSFX, mute: scene.mute});
}

// game
export function startGame(scene) {
    scene.scene.start('pvliGame', {optA: scene.optA, optB: scene.optB, volGen: scene.volGen, volAmb: scene.volAmb, volSFX: scene.volSFX, mute: scene.mute});
}
export function gameOver(scene) {
    scene.sound.stopAll();
    scene.sound.play('lose');
    scene.scene.stop('UI');
    scene.scene.start('GameOver', {optA: scene.optA, optB: scene.optB, volGen: scene.volGen, volAmb: scene.volAmb, volSFX: scene.volSFX, mute: scene.mute});
}

// options
export function swithToOptions(scene) {     // --->
    scene.scene.launch('menuOptions', {optA: scene.optA, optB: scene.optB, volGen: scene.volGen, volAmb: scene.volAmb, volSFX: scene.volSFX, mute: scene.mute}); 
    scene.scene.pause();
}
export function backFromOptions(scene) {    // <---
    scene.scene.resume('menuGame', {optA: scene.optA, optB: scene.optB, volGen: scene.volGen, volAmb: scene.volAmb, volSFX: scene.volSFX, mute: scene.mute});
    scene.scene.stop();
}

// sonido
export function swithToSonido(scene) {     // --->
    scene.scene.launch('menuSonido', {optA: scene.optA, optB: scene.optB, volGen: scene.volGen, volAmb: scene.volAmb, volSFX: scene.volSFX, mute: scene.mute}); 
    scene.scene.pause();
}
export function backFromSonido(scene) {    // <---
    scene.scene.resume('menuOptions', {optA: scene.optA, optB: scene.optB, volGen: scene.volGen, volAmb: scene.volAmb, volSFX: scene.volSFX, mute: scene.mute});   
    scene.scene.stop();
}

// soundMenu: speaker
export function toggleMute(scene) {
    let isMute = scene.speaker.mute;
    scene.mute = isMute;
    scene.general.mod.toggleMute(isMute);
    scene.sfx.mod.toggleMute(isMute);
    scene.ambience.mod.toggleMute(isMute);
    if (isMute) scene.speaker.setFrame(4);
}

// pause / play any scene
export function setPause(scene) {
    onInfo(); onInfoBar();
    scene.disable();
    scene.scene.launch('pauseScene', {optA: scene.optA, optB: scene.optB, volGen: scene.volGen, volAmb: scene.volAmb, volSFX: scene.volSFX, mute: scene.mute});
    scene.scene.pause();
}

export function resume(scene, dest) {
    offInfo(); offInfoBar(); 
    scene.enable();
    scene.scene.resume(dest, {optA: scene.optA, optB: scene.optB, volGen: scene.volGen, volAmb: scene.volAmb, volSFX: scene.volSFX, mute: scene.mute});
    scene.scene.stop();
}


