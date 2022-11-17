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
        // this.events.on('');

        // this.style = { color: '#fff', fontSize: 8, fontFamily: 'Greconian', fontStyle: 'normal' }
        this.size = 8;
        this.allowedJumps = 'Allowed jumps: 0/0'; 
        this.life = 'Life: 0/0';
    }

    preload() 
    {
        console.log(" - UI scene - ")
    }

    create() 
    {
        const x = this.canvasWidth;
        const y = this.canvasHeight;

        this.place01 = this.addText(x / 2, y / 30, this.allowedJumps, this.size);
        this.place02 = this.addText(x / 2, y * 3 / 30, this.life, this.size);
    }

    update(t, dt) 
    {
        // super.update(t, dt);
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
 