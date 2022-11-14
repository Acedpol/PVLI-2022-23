// import Phaser from '../lib/phaser.js'
// Como esta implementado no hace falta importar en cada scrypt

// ---------------------------------

import Boot from './scenes/boot.js';
import GameLogic from './scenes/pvliGame.js';
import Menu from './scenes/mainMenu.js';
import GameOver from './scenes/gameOver.js';
import BlankPause from './scenes/pause.js';

window.onload = cargarJuego();

export var gameLogic;
export function cargarJuego() {
    let zoomV = 0;
    const config = {
        type: Phaser.AUTO,
        parent: "phaserGame",
        scale: {
            // width: 360,
            // height: 189,
            width: Math.floor(360 - (360 * (zoomV/3))  / 1488 * window.innerWidth),
            height: Math.floor(189 - (189 * (zoomV/3)) / 783 * window.innerHeight),
            zoom: 3,
            // autoCenter: Phaser.Scale.Center.CENTER_HORIZONTALLY
        },
        pixelArt: true,
        scene: [ Boot, GameLogic, Menu, GameOver, BlankPause ],
        physics: {
            default: 'arcade',
            arcade: {
                gravity: {
                    y: 200
                },
                debug: true // use this to show box-colliders
            }
        }
        
    };

    gameLogic = new Phaser.Game(config);
    // console.log(gameLogic);
};

// ---------------------------------
