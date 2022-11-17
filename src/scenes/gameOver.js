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

    init() {
        super.init();
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
        this.addText(width * 0.5, height * 0.5, 'Game Over', 22, '#88ff88', 'Pixeled', 'bold')

        // play again text
        this.addText(width * 0.5, height - 25, 'Press space to play again', 8, '#FFFFFF', 'Pixeled')

        // click to play again
        this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.start('menuGame')
        });
    }

    update(t, dt) 
    {
        super.update(t, dt);
    }

}
