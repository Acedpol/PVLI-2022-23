import blankMenu from "./menu.js";
import { initGame } from "../utils/callbacks.js";
import { toggleInfoBar } from '../../lib/pauseCtrl.js'

export default class Menu extends blankMenu
{
    constructor() 
    {
        super('menuGame');
    }

    init() {
        super.init();
        toggleInfoBar();
        this.events.on('resume', () => { toggleInfoBar(); });
    }

    preload() 
    {
        console.log(" - mainMenu scene - ")
    }

    create() 
    {
        // gets the sizes of the screen
        const{width,height} = this.scale

        // Create background image
        this.background = this.createBackground('img_back');

        // compone el titulo y subtitulo del menu principal del juego
        this.addText(width * 0.5, height * 0.2, 'FORGOTTEN DEBRIS', 24);

        // three buttons, three levels on difficulty (0.35, 0.55, 0.75)
        this.createButtonGame(width * 0.5, height * 0.45, 'button', 'Jugar', initGame, this);
        this.createButtonGame(width * 0.5, height * 0.65, 'button', 'Opciones', initGame, this);
    }

    update() 
    {
        super.update();
    }

    /** @override */
    handlePause() {
        super.handlePause();
        toggleInfoBar();
    }
}
