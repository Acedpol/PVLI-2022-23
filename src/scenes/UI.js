import Dock from "../utils/dock.js";
import blankMenu from "./menu.js";

export default class UI extends blankMenu
{
    // /** @type {Phaser.Types.GameObjects.Text.TextStyle} */      style
    /** @type {Number} */                                       size
    /** @type {String} */                                       allowedJumps
    /** @type {String} */                                       life
    /** @type {Phaser.GameObjects.Text} */                      place01
    /** @type {Phaser.GameObjects.Text} */                      place02

    constructor() 
    {
        super('UI');
    }

    init() {
        super.init();
        this.size = 8;
        this.allowedJumpsText = 'Allowed jumps: 0/0'; 
        this.livesText = 'Lives: 9';
        console.log('UI iniciada!');
    }
    
    /** @async */
    setPlayer(player) 
    {
        this.playerContainer = player;

        // lives dock
        this.lives = new Dock(this, this.physics.world);
        this.lives.setArgs({x: 32, y: 32, stepX: 32 + 32/5, stepY: 0 });
        this.lives.setPlayer();
        this.lives.reset(this.playerContainer.player.health, 'object');

        // jumps dock
        this.jumps = new Dock(this, this.physics.world);
        this.jumps.setArgs({x: 32, y: 32 * 2, stepX: 32 + 32/5, stepY: 0 });
        this.jumps.setPlayer();
        this.jumps.reset(this.playerContainer.player.maxJumps, 'jump');
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
 