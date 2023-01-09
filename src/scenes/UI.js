import { Jump, Life } from "../utils/icons.js";
import Dock from "../utils/dock.js";
import blankMenu from "./menu.js";

export default class UI extends blankMenu
{
    constructor() 
    {
        super('UI');
        this.initC = false;
        this.initP = false;
    }

    init(args) {
        super.init(args);
        this.initC = true;
    }

    reset() {
        this.initC = true;
        this.initP = false;
    }
    
    /** @async */
    setPlayer(player) 
    {
        this.playerContainer = player;
        let z = 32 * this.AR;
        let dz = 32 / 5 * this.AR;

        // lives dock
        this.lives = new Dock(this, {x: z, y: z, stepX: z + dz, stepY: 0 }, Life.prototype);
        this.lives.setPlayer();
        this.lives.reset(this.playerContainer.player.health, 'lifeSpr');

        // jumps dock
        this.jumps = new Dock(this, {x: z, y: z * 2, stepX: z + dz, stepY: 0 }, Jump.prototype);
        this.jumps.setPlayer();
        this.jumps.reset(this.playerContainer.player.maxJumps, 'jumpBar');
        this.initP = true;
    }

    preload() 
    {
        console.log(" - UI scene - ")
    }

    create() 
    {

    }

    update(t, dt) 
    {
        super.update(t, dt);
    }
}
 