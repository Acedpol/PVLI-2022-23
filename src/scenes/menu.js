import blankScene from "./scene.js";

export default class blankMenu extends blankScene
{
    constructor(keyname) 
    {
        super(keyname);
    }

    init()
    {
        super.init();
    }

    preload() 
    {
    }

    create() 
    {
    }

    update(t, dt) 
    {
        super.update(t, dt);
    }

    /**
     * Constructor del button
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     * @param {Phaser.Textures.Texture} texture Textura usada en el fondo del button (image)
     * @param {String} text Texto ubicado en en el button
     * @param {Function} fn Callback a ejecutar
     * @param {Scene} scene Escena del ámbito de uso del botón
     * @param {any} v Variable auxiliar
     */
    createButtonGame(x, y, texture, text, fn, scene, v)
    {
        // relación de aspecto
        const {zx,zy} = this.scaleRatio();

        // crea el button y lo hace interactivo
        let img = this.add.image(x, y, texture)
            .setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, ()=>{
                fn(scene, v);
            })
            .setScale(1.25 * zx, 0.75 * zy) // <--

        console.log("img: " + img.width + ", " + img.height);
 
        // selecciona el color del texto
        let _color = '#DD1111'
 
        // compone el button con un texto
        this.addText(x, y, text, 16,  _color);
    }

    /**
     * Paleta de colores preestablecidos
     * @param {Number} N índice del color
     * @returns color seleccionado
     */
    color(N) {
        let _color = '';
        switch(N) {
            case 0:
                _color = '#4444FF'
                break;
            case 1:
                _color = '#00FF00'
                break;
            case 2:
                _color = '#FF0000'
                break;
            default:
                break;
        }
        return _color;
    }
};
