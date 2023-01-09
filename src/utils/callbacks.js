import { offInfo, offInfoBar, onInfo, onInfoBar } from "../../modulosJS/pauseCtrl.js";

// ejemplo:
// gameLogic.scene.getScene('menuGame').scene.start('pvliGame');

// recurso posible de pauseCtrl.js: offInfoBar(); onInfoBar(); toggleInfoBar();

var gameActive = false;

// main menu
export function startMain(scene) {
    scene.scene.start('menuGame', {optA: scene.optA, optB: scene.optB, volGen: scene.volGen, volAmb: scene.volAmb, volSFX: scene.volSFX, mute: scene.mute});
}

// game
export function startGame(scene) {
    gameActive = true;
    scene.scene.start('pvliGame', {optA: scene.optA, optB: scene.optB, volGen: scene.volGen, volAmb: scene.volAmb, volSFX: scene.volSFX, mute: scene.mute});
}
export function gameOver(scene) {
    gameActive = false;
    scene.scene.start('GameOver', {optA: scene.optA, optB: scene.optB, volGen: scene.volGen, volAmb: scene.volAmb, volSFX: scene.volSFX, mute: scene.mute});
    scene.scene.stop('UI');
    scene.scene.stop('pvliGame');
}
export function gameComplete(scene) {
    gameActive = false;
    scene.scene.start('GameComplete', {optA: scene.optA, optB: scene.optB, volGen: scene.volGen, volAmb: scene.volAmb, volSFX: scene.volSFX, mute: scene.mute});
    scene.scene.stop('UI');
    scene.scene.stop('pvliGame');
}

// options
export function swithToOptions(scene) {     // --->
    scene.scene.start('menuOptions', {optA: scene.optA, optB: scene.optB, volGen: scene.volGen, volAmb: scene.volAmb, volSFX: scene.volSFX, mute: scene.mute}); 
}
export function backFromOptions(scene) {    // <---
    let dest = '';
    if (gameActive) {
        scene.scene.resume('pvliGame', {optA: scene.optA, optB: scene.optB, volGen: scene.volGen, volAmb: scene.volAmb, volSFX: scene.volSFX, mute: scene.mute});
        scene.scene.stop();
    }
    else {
        scene.scene.start('menuGame', {optA: scene.optA, optB: scene.optB, volGen: scene.volGen, volAmb: scene.volAmb, volSFX: scene.volSFX, mute: scene.mute});
    }
}

// sonido
export function swithToSonido(scene) {     // --->
    scene.scene.start('menuSonido', {optA: scene.optA, optB: scene.optB, volGen: scene.volGen, volAmb: scene.volAmb, volSFX: scene.volSFX, mute: scene.mute}); 
}
export function backFromSonido(scene) {    // <---
    scene.scene.start('menuOptions', {optA: scene.optA, optB: scene.optB, volGen: scene.volGen, volAmb: scene.volAmb, volSFX: scene.volSFX, mute: scene.mute});
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

    if (gameActive) 
    {
        scene.scene.launch('pauseScene', {optA: scene.optA, optB: scene.optB, volGen: scene.volGen, volAmb: scene.volAmb, volSFX: scene.volSFX, mute: scene.mute});

        if (scene.scene.key === 'menuOptions' || scene.scene.key === 'menuSonido') {
            // ya ha comenzado el juego, se ha pausado una vez y se ha navegado a opciones
            scene.disable();
            scene.scene.stop();
        }
        else {
            // siempre, es la primera vez cuando el juego ha iniciado
            scene.scene.pause('UI');
            scene.scene.pause('pvliGame');
        }
    }
    else {
        scene.disable();
        scene.scene.start('pauseScene', {optA: scene.optA, optB: scene.optB, volGen: scene.volGen, volAmb: scene.volAmb, volSFX: scene.volSFX, mute: scene.mute});
    }
     
}

export function resume(scene, dest) {
    offInfo(); offInfoBar(); 
    
    if (gameActive) {
        if (dest === 'menuOptions' || dest === 'menuSonido') {
            scene.enable();
            scene.scene.start(dest, {optA: scene.optA, optB: scene.optB, volGen: scene.volGen, volAmb: scene.volAmb, volSFX: scene.volSFX, mute: scene.mute});
        }
        else {
            scene.scene.resume('pvliGame', {optA: scene.optA, optB: scene.optB, volGen: scene.volGen, volAmb: scene.volAmb, volSFX: scene.volSFX, mute: scene.mute});
        }
        scene.scene.stop('pauseScene');
    }
    else {
        scene.enable();
        scene.scene.start(dest, {optA: scene.optA, optB: scene.optB, volGen: scene.volGen, volAmb: scene.volAmb, volSFX: scene.volSFX, mute: scene.mute});
    }
}


