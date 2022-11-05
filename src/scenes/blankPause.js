import {} from '../../lib/submenus.js'

export default class blankPause extends Phaser.Scene
{
    /**
     * Constructor de la escena
     */
    constructor() 
    {
        super({
            key: 'blankPause'
        });
    }

    init()
    {
        this.p = this.input.keyboard.addKey('P');
        togglePause();
    }

    preload() 
    {
        console.log("blankPause scene")
    }

    create() 
    {
    }

    update(t, dt) 
    {
        // pause logic
        if (this.p.isDown) {
            this.scene.resume('pvliGame');
            this.scene.stop();
            console.log("UN-PAUSE");
        }
    }
};
