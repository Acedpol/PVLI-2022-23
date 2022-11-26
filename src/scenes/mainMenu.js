import blankMenu from "./menu.js";
import { startGame, swithToOptions } from "../utils/callbacks.js";
import { onInfoBar, offInfoBar } from '../../lib/pauseCtrl.js'

export default class Menu extends blankMenu
{
    constructor() 
    {
        super('menuGame');
    }

    init(optA) {
        super.init();
        this.optA = optA;
        this.events.on('resume', (scene, optA) => { offInfoBar(); this.optA = optA; console.log(optA); } );
    }

    preload() 
    {
        console.log(" - mainMenu scene - ")
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
        this.createGeoButtonGame(this, width * 0.5, height * 0.45, 'Jugar', startGame);
        this.createGeoButtonGame(this, width * 0.5, height * 0.65, 'Opciones', swithToOptions);
        // this.createButtonGame(this, width * 0.5, height * 0.45, 'button', 'Jugar', initGame);
        // this.createButtonGame(this, width * 0.5, height * 0.65, 'button', 'Opciones', initGame);
 
        // barra informativa adicional
        let _textStyle = { fontSize: 6, color: '#FFFFFF', fontFamily: 'Greconian', fontStyle: 'normal' };
        let _rectStyle = new this.rectStyle(0x000000, 0x111111, 0.6, 1, true, false);
        let _text = "Pulse 'P' o haz click en ? para acceder al menú de información.";
        this.createTextPanel_s(width * 0.5, height * 0.95, width, height * 0.1, _text, _textStyle, _rectStyle, 4);
    }

    update(t, dt) 
    {
        super.update(t, dt);
    }

    /** @override */
    handlePause() {
        super.handlePause();
        onInfoBar();
    }
}
