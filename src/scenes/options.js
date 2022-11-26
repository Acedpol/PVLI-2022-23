import blankMenu from "./menu.js";
import { startGame, swithToOptions } from "../utils/callbacks.js";

export default class Options extends blankMenu
{
    constructor() 
    {
        super('menuOptions');
    }

    init() {
        super.init();     
        this.optA = 3;
        this.optB = 1;
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
        this.background = this.createBackground('img_back');

        // compone el titulo y subtitulo del menu principal del juego
        this.addText(width * 0.5, height * 0.2, 'FORGOTTEN DEBRIS', 24);

        // play and options buttons
        this.createGeoButtonGame(this, width * 0.5, height * 0.65, 'Jugar', startGame);
        this.createGeoButtonGame(this, width * 0.5, height * 0.45, 'Opciones', swithToOptions);
        // this.createButtonGame(this, width * 0.5, height * 0.45, 'button', 'Jugar', initGame);
        // this.createButtonGame(this, width * 0.5, height * 0.65, 'button', 'Opciones', initGame);
 
        // barra informativa adicional
        let _textStyle = { fontSize: 6, color: '#FFFFFF', fontFamily: 'Greconian', fontStyle: 'normal' };
        let _rectStyle = new this.rectStyle(0x000000, 0x111111, 0.65, 1, true, false);
        let _text = "Vuelva a pulsar 'P' o haz click en [?] para salir del menú de opciones.";
        this.createTextPanel_s(width * 0.5, height * 0.95, width, height * 0.1, _text, _textStyle, _rectStyle, 4);
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
        scene.optA = 1;
        scene.optB = 3;
    }
    activarB(scene) {
        scene.graphicsB.setVisible(true);
        scene.graphicsA.setVisible(false);
        scene.optA = 3;
        scene.optB = 1;
    }
    apagarA(scene) {
        scene.graphicsA.setVisible(false);
        scene.optA = 1;
    }
    apagarB(scene) {
        scene.graphicsB.setVisible(false);
        scene.optB = 1;
    }

    colorear() {
        this.optA ? this.activarA(this) : this.apagarA(this);
        this.optB ? this.activarB(this) : this.apagarB(this);
    }

    // Para, B != 0 => !!B es igual a true;
    colorear_v2() {
        console.log("A: " + (this.optA === 3));
        console.log("B: " + (this.optB === 3));
        (this.optA === 3) ? this.activarA(this) : this.apagarA(this);
        (this.optB === 3) ? this.activarB(this) : this.apagarB(this);
    }
}
