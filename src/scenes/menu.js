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
        let zx = 3 * this.zw / this.logicWidth;
        let zy = 3 * this.zh / this.logicHeight;

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
     * Crea una línea de texto
     * @param {number} x Posición horizontal
     * @param {number} y Posición vertical
     * @param {String} text Lo que se va a escribir
     * @param {number} size Tamaño de letra
     * @param {Color} color Código hexadecimal
     * @param {String} fuente Fuente creada en CSS
     */
    addText(x, y, text, size, color = '#FFFFFF', fuente = 'Greconian', style = 'normal') 
    {
        // relación de aspecto
        let zs = size * 3 * this.globalWidth / this.logicWidth;

        // crea el texto
        this.add.text(x, y, text, {
            fontSize: zs, // <--
            fontStyle: style,
            fontFamily: fuente,
            color: color
        })
        .setOrigin(0.5)
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
