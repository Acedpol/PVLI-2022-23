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
}
