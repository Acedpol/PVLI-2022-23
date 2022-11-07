import { gameLogic } from "../game.js"

export function initGame(scene, lv) {
    // gameLogic.scene.getScene('menuGame').scene.start('pvliGame');
    scene.scene.start('pvliGame', lv);
}
