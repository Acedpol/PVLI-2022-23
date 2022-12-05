import blankMenu from "./menu.js";
import { startGame, swithToSonido, backFromOptions } from "../utils/callbacks.js";

export default class Options extends blankMenu
{
    constructor() 
    {
        super('menuOptions');
    }

    init(args) {
        super.init(args);
        this.events.on('resume', (scene, args) => { this.onResume(args); } );
    }

    preload() 
    {
        console.log(" - Options scene - ")
    }

    create() 
    {        
        // gets the sizes of the screen
        const{width,height} = this.scale; // canvas size

        // Create background image
        this.background = this.createBackground('img_back3');

        // compone el titulo y subtitulo del menu principal del juego
        this.addText(width * 0.8, height * 0.1, 'Configuración', 14, '#000');

        // play and options buttons
        this.createDefaultGeoButtonGame(this, width * 0.15, height * 0.1, 'Sonido', swithToSonido);

        this.rect_ON = new this.rectStyle('0x000025', '0x00FF00', 0.45, 0.85, true, true);
        this.rect_OFF = new this.rectStyle('0x000025', '0x00FF00', 0.45, 0.85, false, false); 

        this.wasd = this.add.sprite(width * 0.2, height/2, 'controls', 0).setDepth(2);
        this.arrows = this.add.sprite(width * 0.8, height/2, 'controls', 1).setDepth(2);
        this.selectA = this.btnContorno(this.wasd, true);
        this.selectB = this.btnContorno(this.arrows, true);
        this.graphicsA = this.setRectStyle(this.selectA, this.rect_ON, 5);
        this.graphicsB = this.setRectStyle(this.selectB, this.rect_ON, 5);
        this.setInteractiveZone(this, this.selectA, this.activarA);
        this.setInteractiveZone(this, this.selectB, this.activarB);
        this.colorear();

        // exit button
        this.createExitGeoButtonGame(this, width * 0.91, height * 0.8465, backFromOptions);

        // barra informativa adicional
        let _textStyle = { fontSize: 6.5, color: '#FFFFFF', fontFamily: 'Greconian', fontStyle: 'normal' };
        let _rectStyle = new this.rectStyle(0x000000, 0x111111, 0.6, 1, true, false);
        let _text = "Pulse 'P' o haz click en ? para acceder al menú de información.";
        this.createTextPanel_s(width * 0.5, height * 0.95, width, height * 0.1, _text, _textStyle, _rectStyle, true, 4);
    }

    update(t, dt) 
    {
        super.update(t, dt);
    }

    getRect(gameObject) {
        let x = gameObject.x - gameObject.width * 0.5;
        let y = gameObject.y - gameObject.height * 0.5;
        return new Phaser.Geom.Rectangle(x, y, gameObject.width, gameObject.height);
    }

    btnContorno(gameObject, resize = true) {
        let _rect = this.getRect(gameObject);
        if (resize) _rect = this.resize(_rect);
        return _rect;
    }

    resize(rect) {
        let w = rect.width;
        let h = rect.height;
        let cw = 0.2;
        let ch = 0.5;
        rect.setSize(rect.width * (1 + cw), rect.height * (1 + ch));
        rect.setPosition(rect.x - w * cw / 2, rect.y - h * ch / 2);
        return rect;
    }

    activarA(scene) {
        scene.graphicsA.setVisible(true);
        scene.graphicsB.setVisible(false);
        scene.optA = true;
        scene.optB = false;
    }
    activarB(scene) {
        scene.graphicsB.setVisible(true);
        scene.graphicsA.setVisible(false);
        scene.optA = false;
        scene.optB = true;
    }
    apagarA(scene) {
        scene.graphicsA.setVisible(false);
        scene.optA = false;
    }
    apagarB(scene) {
        scene.graphicsB.setVisible(false);
        scene.optB = false;
    }

    colorear() {
        this.optA ? this.activarA(this) : this.apagarA(this);
        this.optB ? this.activarB(this) : this.apagarB(this);
    }

    // Para, B != 0 => !!B === 'true'
    colorear_v2() {
        console.log("A: " + (this.optA === 3));
        console.log("B: " + (this.optB === 3));
        (this.optA === 3) ? this.activarA(this) : this.apagarA(this);
        (this.optB === 3) ? this.activarB(this) : this.apagarB(this);
    }
}
