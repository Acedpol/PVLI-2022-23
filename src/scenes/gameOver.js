import { startMain } from "../utils/callbacks.js";
import blankMenu from "./menu.js";

export default class GameOver extends blankMenu
{
    /**
     * Constructor de la escena
     */
    constructor() 
    {
        super('GameOver');
    }

    init(args) {
        super.init(args);
        this.sound.stopAll();
        this.sound.play('musica_end_lose', this.ambConfig);
    }

    preload() 
    {
        console.log(" - gameOver scene - ")
    }

    create() 
    {
        // gets the sizes of the screen
        const{width,height} = this.scale

        // compone el titulo del final
        this.addText(width * 0.5, height * 0.5, 'Game Over', 24, '#88ff88', 'Pixeled', 'bold')

        // play again text
        this.addText(width * 0.5, height - 25, 'Press space to play again', 12, '#FFFFFF', 'Pixeled')

        // click to play again
        this.input.keyboard.once('keydown-SPACE', () => {
            startMain(this);
        });
    }

    update(t, dt) 
    {
        super.update(t, dt);
    }

}
