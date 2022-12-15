import blankMenu from "./menu.js";
import { startGame, swithToOptions } from "../utils/callbacks.js";
import { onInfoBar, offInfoBar } from '../../lib/pauseCtrl.js'

export default class Menu extends blankMenu
{
    constructor() 
    {
        super('menuGame');
    }

    init(args) {
        super.init(args);
        this.sound.stopAll();
        this.sound.play('musica_menu', this.ambConfig);
    }

    preload() 
    {
        console.log(" - mainMenu scene - ");
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
        this.createDefaultGeoButtonGame(this, width * 0.5, height * 0.45, 'Jugar', startGame);
        this.createDefaultGeoButtonGame(this, width * 0.5, height * 0.65, 'Opciones', swithToOptions);
        // this.createButtonGame(this, width * 0.5, height * 0.45, 'button', 'Jugar', initGame);
        // this.createButtonGame(this, width * 0.5, height * 0.65, 'button', 'Opciones', initGame);
 
        // barra informativa adicional
        let _textStyle = { fontSize: 6, color: '#FFFFFF', fontFamily: 'Greconian', fontStyle: 'normal' };
        let _rectStyle = new this.rectStyle(0x000000, 0x111111, 0.6, 1, true, false);
        let _rect = new Phaser.Geom.Rectangle(width * 0.5, height * 0.95, width, height * 0.1);
        let _text = "Pulse 'P' o haz click en '?' para acceder al menú de información.";
        this.createTextPanel_rc(_rect, _text, _textStyle, _rectStyle, true, 4);

    }



    update(t, dt) 
    {
        super.update(t, dt);
    }
}
