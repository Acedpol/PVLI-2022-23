import blankScene from './blankScene.js';

export default class Pause extends blankScene
{
    /**
     * Constructor de la escena
     */
    constructor() 
    {
        super('pauseScene');
    }

    init(args)
    {
        super.init(args);
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
};
