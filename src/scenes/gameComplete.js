import { startMain } from "../utils/callbacks.js";
import blankMenu from "./menu.js";

export default class GameComplete extends blankMenu
{
    /**
     * Constructor de la escena
     */
    constructor() 
    {
        super('GameComplete');
    }

    init(args) {
        super.init(args);
        this.sound.play('musica_end', this.ambConfig);
    }

    preload() 
    {
        console.log(" - complete scene - ")
    }

    create() 
    {
        // gets the sizes of the screen
        const{width,height} = this.scale

        // compone el titulo del final
        this.addText(width * 0.5, height * 0.5, 'Completed!!', 24, '#88ff88', 'Pixeled', 'bold')

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
