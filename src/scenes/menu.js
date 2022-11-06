export default class Menu extends Phaser.Scene 
{
    /**
     * Constructor de la escena
     */
    constructor() 
    {
        super({
            key: 'menuGame'
        });
    }

    init() {
        this.p = this.input.keyboard.addKey('P');
    }

    preload() 
    {
        console.log(" - Menu scene - ")
    }

    create() 
    {
        // gets the sizes of the screen
        const{width,height} = this.scale

        // Create background image
        this.background = this.createBackground('img_back');

        // compone el titulo y subtitulo del menu principal del juego
        this.add.text(width * 0.5, 40, 'FORGOTTEN DEBRIS', {
                fontSize: 24,
                fontFamily: 'Greconian',
                color: '#FFFFFF'
            })
            .setOrigin(0.5)

        // three buttons, three levels on difficulty (0.35, 0.55, 0.75)
        this.createButtonGame(width * 0.5, height * 0.45, 'button', 'Jugar', 3)
        this.createButtonGame(width * 0.5, height * 0.65, 'button', 'Opciones', 3)

        // pause ctrl
        this.active = true;
        this.events.on('resume', () => {
            this.active = true;
        })
    }

    update() 
    {
        if (this.p.isDown) {
            const evt = createEvent('pause');
            document.dispatchEvent(evt);
        }
    }

    /**
    * @param {number} lv Nivel de dificultad
     */
    initGame(lv)
    {
        // inits the game main scene
        this.scene.start('pvliGame', lv)
        this.active = false;
    }

    isActive() { return this.active; }
    toggleActive() { this.active = !this.active; }

    handlePause() {
        // pause logic
        this.scene.pause();
        this.scene.launch('blankPause');
        this.active = false;
        console.log("PAUSE");
    }

    /**
     * Constructor del button
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     * @param {Phaser.Textures.Texture} texture Textura usada en el fondo del button (image)
     * @param {String} name Texto ubicado en en el button
     * @param {number} lv Nivel de dificultad
     */
    createButtonGame(x, y, texture, name, lv)
    {
        // crea el button y lo hace interactivo
        this.add.image(x, y, texture)
            .setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, ()=>{
                this.initGame(lv)
            })
            .setScale(1.25, 0.75) // para el dibujo hecho en paint
            // .setScale(0.5, 0.3) // para la imagen descargada actual

        // selecciona el color del texto
        let _color = ''
        if (lv == 1) _color = '#4444FF'
        else if (lv == 2) _color = '#00FF00'
        else if (lv == 3) _color = '#FF0000'

        // compone el button con un texto
        this.add.text(x, y, name, {
                fontSize: 16,
                fontFamily: 'Greconian',
                color: _color
            })
            .setOrigin(0.5)
    }

    /**
     * Crea una imagen y la ajusta al fondo
     * @param {String} keymap Nombre dado a la imagen del fondo en boot 
     */
    createBackground(keymap){
        // gets the sizes of the screen
        const{width,height} = this.scale

        this.add.image(width/2, height/2, keymap)
    }
    
}
