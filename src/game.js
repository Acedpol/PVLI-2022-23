// import Phaser from '../lib/phaser.js'
// Como esta implementado no hace falta importar en cada scrypt

// ---------------------------------

import Boot from './scenes/boot.js';
import GameLogic from './scenes/pvliGame.js';
import Menu from './scenes/mainMenu.js';
import GameOver from './scenes/gameOver.js';
import BlankPause from './scenes/pause.js';
import UI from './scenes/UI.js';

window.onload = cargarJuego();

export var gameLogic;
export function cargarJuego() 
{
    let z = 1; let x = 3 / z;

    const config = {
        type: Phaser.AUTO,
        parent: "phaserGame",
        scale: {
            width: Math.floor((360 * x)  / 1488 * window.innerWidth),
            height: Math.floor((189 * x) / 783 * window.innerHeight),
            zoom: z
        },
        pixelArt: true,
        scene: [ Boot, GameLogic, Menu, GameOver, BlankPause, UI ],
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
};

// ---------------------------------
