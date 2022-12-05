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

    init(args)
    {
        super.init(args);
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
        super.update(t, dt);
    }

    /** @override */
    handleResume(scene) {
        super.handleResume(scene);
        toggleInfo();
    }
};
