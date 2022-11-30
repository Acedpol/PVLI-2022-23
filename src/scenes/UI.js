import { Jump, Life } from "../utils/icons.js";
import Dock from "../utils/dock.js";
import blankMenu from "./menu.js";
import volumeCtrl from "../utils/volumeCtrl.js";

export default class UI extends blankMenu
{
    // /** @type {Phaser.Types.GameObjects.Text.TextStyle} */      style
    /** @type {Number} */                                       size
    /** @type {String} */                                       allowedJumpsText
    /** @type {String} */                                       lifeText
    /** @type {Phaser.GameObjects.Text} */                      place01
    /** @type {Phaser.GameObjects.Text} */                      place02

    constructor() 
    {
        super('UI');
        this.initC = false;
        this.initP = false;
    }

    init() {
        super.init();
        this.size = 8;
        this.allowedJumpsText = 'Allowed jumps: 0/0'; 
        this.livesText = 'Lives: 9';
        console.log('UI iniciada!');
        this.initC = true;
    }

    reset() {
        this.initC = false;
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
        this.lives.reset(this.playerContainer.player.health, 'object');

        // jumps dock
        this.jumps = new Dock(this, {x: z, y: z * 2, stepX: z + dz, stepY: 0 }, Jump.prototype);
        this.jumps.setPlayer();
        this.jumps.reset(this.playerContainer.player.maxJumps, 'jump');
        this.initP = true;
    }

    preload() 
    {
        console.log(" - UI scene - ")
    }

    create() 
    {
        const width = this.canvasWidth;
        const height = this.canvasHeight;

        this.place01 = this.addText(width / 2, height / 30, this.allowedJumpsText, this.size);
        this.place02 = this.addText(width / 2, height * 3 / 30, this.livesText, this.size);

        this.modulador = new volumeCtrl(this);
    }

    update(t, dt) 
    {
        super.update(t, dt);
    }

    /**
     * Reescribe un texto del UI.
     * @param {Phaser.GameObjects.Text} place placeholder donde escribir
     * @param {String} text texto a escribir
     */
    rewriteUI(place, text) {
        place.text = text;
    }
}
 