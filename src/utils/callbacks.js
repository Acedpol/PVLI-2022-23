import { gameLogic } from "../game.js"
import { toggleInfoBar } from '../../lib/pauseCtrl.js'

export function initGame(scene, lv) {
    // gameLogic.scene.getScene('menuGame').scene.start('pvliGame');
    scene.scene.start('pvliGame', lv);
    toggleInfoBar();
}
