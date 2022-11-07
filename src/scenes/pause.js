import { toggleInfo } from '../../lib/pauseCtrl.js'
import blankScene from './scene.js';

export default class blankPause extends blankScene
{
    /**
     * Constructor de la escena
     */
    constructor() 
    {
        super('blankPause');
    }

    init()
    {
        super.init();
        toggleInfo();
    }

    preload() 
    {
        console.log(" - blankPause scene - ")
    }

    create() 
    {
    }

    update(t, dt) 
    {
        super.update();
    }

    /** @override */
    handleResume(scene) {
        super.handleResume(scene);
        toggleInfo();
    }
};
