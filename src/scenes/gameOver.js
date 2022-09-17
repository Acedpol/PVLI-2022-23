export default class GameOver extends Phaser.Scene 
{
    /**
     * Constructor de la escena
     */
    constructor() 
    {
        super({
            key: 'GameOver'
        });
    }

    preload() 
    {
        console.log("GameOver scene")
    }

    create() 
    {
        // gets the sizes of the screen
        const{width,height} = this.scale

        // compone el titulo del final
        this.add.text(width * 0.5, height * 0.5, 'Game Over', {
                fontSize: 22,
                fontFamily: 'Pixeled',
                fontStyle: 'bold', 
                color: '#88ff88'
            })
            .setOrigin(0.5)

        // play again text
        this.add.text(width * 0.5, height - 25, 'Press space to play again', {
                fontSize: 8,
                fontFamily: 'Pixeled',
                color: '#FFFFFF'
            })
            .setOrigin(0.5)

        // click to play again
        this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.start('menuGame')
        })
    }

    update() 
    {
        
    }

}
