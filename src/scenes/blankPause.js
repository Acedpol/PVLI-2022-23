import '../../lib/submenus.js'

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
        toggleInfo();
        // console.log(document.getElementById('info'));
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
        this.handleResume();
    }

    handleResume() {
        // pause logic
        if (this.p.isDown) {
            toggleInfo();
            this.scene.resume('pvliGame');
            this.scene.stop();
            console.log("UN-PAUSE");
        }
    }
};
