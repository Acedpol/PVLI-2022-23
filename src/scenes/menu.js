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

    preload() 
    {
        console.log("Menu scene")
    }

    create() 
    {
        // gets the sizes of the screen
        const{width,height} = this.scale

        // compone el titulo y subtitulo del menu principal del juego
        this.add.text(width * 0.5, 25, 'PVLI Game', {
                fontSize: 14,
                fontFamily: 'Pixeled',
                color: '#FFFFFF'
            })
            .setOrigin(0.5)

        this.add.text(width * 0.5, 45, 'Selecciona un nivel de dificultad', {
                fontSize: 8,
                fontFamily: 'Pixeled',
                color: '#FFFFFF'
            })
            .setOrigin(0.5)

        // three buttons, three levels on difficulty
        this.createButtonGame(width * 0.5, height * 0.35, 'button', 'Fácil', 1)
        this.createButtonGame(width * 0.5, height * 0.55, 'button', 'Intermedio', 2)
        this.createButtonGame(width * 0.5, height * 0.75, 'button', 'Difícil', 3)
    }

    update() 
    {

    }

    /**
    * @param {number} lv Nivel de dificultad
     */
    initGame(lv)
    {
        // inits the game main scene
        this.scene.start('pvliGame', lv)
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
            .setScale(2.25, 1) // para el dibujo hecho en paint
            // .setScale(0.5, 0.3) // para la imagen descargada actual

        // selecciona el color del texto
        let _color = ''
        if (lv == 1) _color = '#4444FF'
        else if (lv == 2) _color = '#00FF00'
        else if (lv == 3) _color = '#FF0000'

        // compone el button con un texto
        this.add.text(x, y, name, {
                fontSize: 14,
                fontFamily: 'Pixeled',
                color: _color
            })
            .setOrigin(0.5)
    }
    
}
