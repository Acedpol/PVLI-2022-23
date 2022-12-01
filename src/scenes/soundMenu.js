import blankMenu from "./menu.js";
import { startGame, backFromSonido } from "../utils/callbacks.js";
import volumeCtrl from "../utils/volumeCtrl.js";

export default class SoundMenu extends blankMenu
{
    constructor() 
    {
        super('menuSonido');
    }

    init() {
        super.init();       
    }

    preload() 
    {
        console.log(" - Sonido scene - ")
    }

    create() 
    {        
        // gets the sizes of the screen
        const{width,height} = this.scale; // canvas size

        // Create background image
        this.background = this.createBackground('img_back3');
        this.colorBackGround(width * 0.5, height * 0.5, width * 0.975, height * 0.95, true, false, true, 4);

        // compone el titulo y subtitulo del menu principal del juego
        this.addText(width * 0.8, height * 0.1, 'Configuración', 14, '#000');

        // play and options buttons
        this.createDefaultGeoButtonGame(this, width * 0.15, height * 0.1, 'Sonido', backFromSonido, true, 4);

        this.slider = new volumeCtrl(this, height * 0.25, height * 0.75);
    }

    update(t, dt) 
    {
        super.update(t, dt);
        this.slider.update(t, dt);
    }

    colorBackGround(x, y, rw, rh, fill = true, stroke = false, setColor = false, lv = 1) {
        // rectángulo
        let _rect = new Phaser.Geom.Rectangle(x - rw/2, y - rh/2, rw, rh);
        let _rectStyle = new this.rectStyle('0x000000', '0x000000', 0.75, 0.85, fill, stroke);

        // fija el color
        if (setColor) { 
            const{color, relleno, contorno} = this.btnColor(lv);
            _rectStyle.relleno = relleno;
            _rectStyle.contorno = contorno;
        } 

        // fija el estilo
        this.setRectStyle(_rect, _rectStyle);
    }
}
