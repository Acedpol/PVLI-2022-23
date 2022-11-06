// import Phaser from '../lib/phaser.js'
// Como esta implementado no hace falta importar en cada scrypt

// ---------------------------------

import Boot from './scenes/boot.js';
import GameLogic from './scenes/pvliGame.js';
import Menu from './scenes/menu.js';
import GameOver from './scenes/gameOver.js';
import BlankPause from './scenes/blankPause.js';

window.onload = cargarJuego();

export var gameLogic;
export function cargarJuego() {
    const config = {
        type: Phaser.AUTO,
        parent: "phaserGame",
        scale: {
            // width: 360,
            // height: 189,
            width: Math.floor(360  / 1488 * window.innerWidth),
            height: Math.floor(189 / 783 * window.innerHeight),
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
