// import Phaser from '../lib/phaser.js'
// Como esta implementado no hace falta importar en cada scrypt

// ---------------------------------

import Boot from './scenes/boot.js';
import GameLogic from './scenes/pvliGame.js';
import Menu from './scenes/menu.js';
import GameOver from './scenes/gameOver.js';

window.onload = ()=>{

    const config = {
        type: Phaser.AUTO,
        parent: "phaserGame",
        scale: {
            width: 360,
            height: 192,
            zoom: 3,
            // autoCenter: Phaser.Scale.Center.CENTER_HORIZONTALLY
        },
        pixelArt: true,
        scene: [ Boot, GameLogic, Menu, GameOver ],
        physics: {
            default: 'arcade',
            arcade: {
                gravity: {
                    y: 200
                },
                debug: false // for showing box-colliders
            }
        }
        
    };

    var game = new Phaser.Game(config);
};

// ---------------------------------
