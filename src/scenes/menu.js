import blankScene from "./scene.js";

// const rectStyle = {
//     contorno: Number,
//     relleno: Number,
//     alphaFill: Number,
//     alphaLine: Number,
//     fill: Boolean,
//     line: Boolean
// }

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

    // --- --- ARCADE BUTTON --- --- 

    /**
     * Constructor del button
     * @param {Scene} scene Escena del ámbito de uso del botón
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     * @param {Phaser.Textures.Texture} texture Textura usada en el fondo del button (image)
     * @param {String} text Texto ubicado en en el button
     * @param {Function} fn Callback a ejecutar
     * @param {Number} lv Variable auxiliar
     */
    createButtonGame(scene, x, y, texture, text, fn, lv)
    {
        // relación de aspecto
        const {zx,zy} = this.scaleRatio();

        // crea el button y lo hace interactivo
        let img = this.add.image(x, y, texture)
            .setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, ()=>{
                fn(scene, lv);
            })
            .setScale(1.25 * zx, 0.75 * zy) // <--
 
        // compone el button con un texto
        this.addText(x, y, text, 16,  this.color(3));
    }

    // --- --- --- 

    // --- --- GEO BUTTON --- --- 

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
    createGeoButtonGame(scene, x, y, text, fn, lv = 1)
    {
        const{width,height} = this.scale
        let rw = width * 0.25;
        let rh = height * 0.12;
        let rect = this.createDefaultTextPanel(x, y, rw, rh, text, lv);
        this.setInteractiveZone(scene, rect, fn, 3);
    }

    /**
     * Hace la zona que corresponde al rectangulo interactiva
     * @param {Scene} scene Escena del ámbito de uso del botón
     * @param {Phaser.Geom.Rectangle} rect Rectangulo usado en el fondo del button
     * @param {Function} fn Callback a ejecutar
     * @param {Number} lv Nivel de dificultad
     */
    setInteractiveZone(scene, rect, fn, lv)
    {
        let x = rect.x + rect.width * 0.5;
        let y = rect.y + rect.height * 0.5;
 
        // sets the zone that is interactive
        let zone = this.add.zone(x, y, rect.width, rect.height)
            .setInteractive({
                hitArea: rect,
                useHandCursor: true
            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                fn(scene, lv);
            });
    }

    /**
     * Crea un rectángulo con texto en su interior
     * @param {Number} x posición horizontal
     * @param {Number} y posición vertical
     * @param {Number} rw ancho
     * @param {Number} rh alto
     * @param {String} text texto ubicado en el panel
     * @param {Number} lv índice asociado
     */
    createDefaultTextPanel(x, y, rw, rh, text, lv = 1) 
    {
        const{color, relleno, contorno} = this.btnColor(lv);
        let _textStyle = { fontSize: 14, color: color, fontFamily: 'Greconian', fontStyle: 'bold' };
        let _rectStyle = new this.rectStyle(relleno, contorno, 0.75, 0.85, true, true);
        let _rect = new Phaser.Geom.Rectangle(x - rw/2, y - rh/2, rw, rh);
        this.addRectText(_rect, text, _textStyle);
        this.setRectStyle(_rect, _rectStyle);
        return _rect;
    }

    /**
     * Crea un rectángulo con texto en su interior
     * @param {Number} x posición horizontal
     * @param {Number} y posición vertical
     * @param {Number} rw ancho
     * @param {Number} rh alto
     * @param {String} text texto ubicado en el panel
     * @param {Phaser.Types.GameObjects.Text.TextStyle} textStyle estilo asociado al texto
     * @param {makeStruct} rectStyle estilo del rectángulo
     * @param {Number} lv índice asociado
     */
    createTextPanel_s(x, y, rw, rh, text, textStyle, rectStyle, lv = 1) 
    {
        const{color, relleno, contorno} = this.btnColor(lv);    
        textStyle.color = color;
        rectStyle.relleno = relleno;
        rectStyle.contorno = contorno;
        let _rect = new Phaser.Geom.Rectangle(x - rw/2, y - rh/2, rw, rh);  
        this.addRectText(_rect, text, textStyle);   
        this.setRectStyle(_rect, rectStyle);
        return _rect;
    }

    /**
     * Establece los gráficos con que se va a pintar
     * @param {Phaser.Geom.Rectangle} rect rectángulo usado para el botón
     * @param {makeStruct} rectStyle estilo del rectángulo
     */
    setRectStyle(rect, rectStyle) 
    {        
        /** @type {Phaser.GameObjects.Graphics} */
        let graphics = this.add.graphics({ 
            fillStyle: { 
                color: rectStyle.relleno, alpha: rectStyle.alphaFill 
            },
            lineStyle: {
                width: 2 * this.AR,
                color: rectStyle.contorno,
                alpha: rectStyle.alphaLine
            }            
        });
 
        // how to paint/fill this rectangle
        if (rectStyle.drawFill) graphics.fillRectShape(rect);       // relleno
        if (rectStyle.drawLine) graphics.strokeRectShape(rect);     // trazo
    }

    /**
     * Crea un texto incrustado en un rectángulo
     * @param {Phaser.Geom.Rectangle} rect rectángulo contenedor
     * @param {String} text texto que se escribe
     * @param {Phaser.Types.GameObjects.Text.TextStyle} textStyle estilo del texto
     */
    addRectText(rect, text, textStyle) {
        this.addText_s(rect.x + rect.width * 0.5, rect.y + rect.height * 0.5, text, textStyle)
            .setDepth(1);
    }

    // --- --- --- 

    /**
     * Muestra por consola el tamaño real y el ilustrado del objeto imagen
     * @param {Phaser.GameObjects.Image} img image to get data
     */
    debugImg(img) {
        console.log("img: " + img.width + ", " + img.height);
        console.log("img display size: " + img.displayWidth + ", " + img.displayHeight);
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
            case 3:
                _color = '#DD1111'
                break;
            default:
                break;
        }
        return _color;
    }

    /**
     * Paleta de colores preestablecidos
     * @param {Number} N índice del color
     * @returns color, relleno y contorno
     */
    btnColor(N) {
        // selecciona el color del texto, del relleno y del borde
        let _color, _fill, _line
        switch (N) {
            case 1:
                _color = '#0000FF' //
                _fill = 0xffffff
                _line = 0x0000ff
                break;
            case 2:
                _color = '#00FF00' //
                _fill = 0x440044
                _line = 0x00ff00
                break;
            case 3: 
                _color = '#FF0000' //
                _fill = 0x111111
                _line = 0xff0000
                break;  
            case 4: 
                _color = '#FFFFFF' //
                _fill = 0x000000
                _line = 0x111111
                break;       
            default:
                break;
        }
        return {color: _color, relleno: _fill, contorno: _line};
    }
};
