import { toggleInfo } from '../../lib/pauseCtrl.js'

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
        if (this.p.isDown) {
            const evt = createEvent('pause');
            document.dispatchEvent(evt);
        }
    }

    handleResume(scene) {
        // pause logic
        toggleInfo();
        this.scene.resume(scene);
        this.scene.stop();
        console.log("UN-PAUSE");        
    }
};
