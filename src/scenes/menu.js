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

    init(args)
    {
        super.init(args);
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
     * Constructor del button (todo en uno)
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     * @param {Phaser.Textures.Texture} texture Textura usada en el fondo del button (image)
     * @param {String} text Texto ubicado en en el button
     * @param {Function} fn Callback a ejecutar
     * @param {Scene} scene Escena del ámbito de uso del botón
     * @param {any} v Variable auxiliar
     */
    createGeoButtonGame(scene, x, y, rw, rh, text, textStyle, rectStyle, fn, lv = 1)
    {
        rw *= this.coeWidth;
        rh *= this.coeHeight;
        let _textStyle = { fontSize: 14, color: '#fff', fontFamily: 'Greconian', fontStyle: 'bold' };
        let _rectStyle = new this.rectStyle('0x000000', '0x000000', 0.75, 0.85, true, true);
        let _rect = this.createTextPanel_s(x, y, rw, rh, text, _textStyle, _rectStyle, lv = 1);
        this.setInteractiveZone(scene, _rect, fn, 3);
    }

    /**
     * Constructor del button (predeterminado - mainMenu)
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     * @param {Phaser.Textures.Texture} texture Textura usada en el fondo del button (image)
     * @param {String} text Texto ubicado en en el button
     * @param {Function} fn Callback a ejecutar
     * @param {Scene} scene Escena del ámbito de uso del botón
     * @param {any} v Variable auxiliar
     */
    createDefaultGeoButtonGame(scene, x, y, text, fn, setColor = true, lv = 1)
    {
        const{width,height} = this.scale
        let rw = width * 0.25;
        let rh = height * 0.12;
        let rect = this.createDefaultTextPanel(x, y, rw, rh, text, setColor, lv);
        this.setInteractiveZone(scene, rect, fn, 3);
    }

    /**
     * Constructor del button (todo en uno)
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     * @param {Phaser.Textures.Texture} texture Textura usada en el fondo del button (image)
     * @param {String} text Texto ubicado en en el button
     * @param {Function} fn Callback a ejecutar
     * @param {Scene} scene Escena del ámbito de uso del botón
     * @param {any} v Variable auxiliar
     */
    createExitGeoButtonGame(scene, x, y, fn, setColor = false, lv = 1)
    {
        const{width,height} = this.scale;
        let rw = width * 0.09;
        let rh = height * 0.075;
        let _text = "EXIT!!!";
        let _textStyle = { fontSize: 8, color: '#f0f', fontFamily: 'Greconian', fontStyle: 'normal' };
        let _rectStyle = new this.rectStyle('0x000000', '0xFF00FF', 0.9, 0.9, true, true);
        let _rect = new Phaser.Geom.Rectangle(x, y, rw, rh);
        _rect = this.createTextPanel_rc(_rect, _text, _textStyle, _rectStyle, setColor, lv = 1);
        this.setInteractiveZone(scene, _rect, fn, 3);
    }

    /**
     * Hace la zona que corresponde al rectangulo interactiva
     * @param {Scene} scene Escena del ámbito de uso del botón
     * @param {Phaser.Geom.Rectangle} rect Rectangulo usado en el fondo del button
     * @param {Function} fn Callback a ejecutar
     */
    setInteractiveZone(scene, rect, fn)
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
                fn(scene);
            });
    }

    /**
     * Crea un rectángulo con texto en su interior (sin rect, ni estilos)
     * @param {Number} x posición horizontal
     * @param {Number} y posición vertical
     * @param {Number} rw ancho
     * @param {Number} rh alto
     * @param {String} text texto ubicado en el panel
     * @param {Number} lv índice asociado
     */
    createDefaultTextPanel(x, y, rw, rh, text, setColor = false, lv = 1) 
    {
        // establece unos estilos por defecto
        let _textStyle = { fontSize: 14, color: '#fff', fontFamily: 'Greconian', fontStyle: 'bold' };
        let _rectStyle = new this.rectStyle('0x000000', '0x000000', 0.75, 0.85, true, true);
        let _rect = this.createTextPanel_s(x, y, rw, rh, text, _textStyle, _rectStyle, setColor, lv);
        return _rect;
    }

    /**
     * Crea un rectángulo con texto en su interior (sin rect dado)
     * @param {Number} x posición horizontal
     * @param {Number} y posición vertical
     * @param {Number} rw ancho
     * @param {Number} rh alto
     * @param {String} text texto ubicado en el panel
     * @param {Phaser.Types.GameObjects.Text.TextStyle} textStyle estilo asociado al texto
     * @param {makeStruct} rectStyle estilo del rectángulo
     * @param {Number} lv índice asociado
     */
    createTextPanel_s(x, y, rw, rh, text, textStyle, rectStyle, setColor = false, lv = 1) 
    {
        let _rect = new Phaser.Geom.Rectangle(x - rw/2, y - rh/2, rw, rh);
        this.createTextPanel(_rect, text, textStyle, rectStyle, setColor, lv);
        return _rect;
    }

    /**
     * Crea un rectángulo con texto en su interior (sin rect dado)
     * @param {Phaser.Geom.Rectangle} rect rectángulo usado para el panel
     * @param {String} text texto ubicado en el panel
     * @param {Phaser.Types.GameObjects.Text.TextStyle} textStyle estilo asociado al texto
     * @param {makeStruct} rectStyle estilo del rectángulo
     * @param {Number} lv índice asociado
     */
    createTextPanel_rc(rect, text, textStyle, rectStyle, setColor = false, lv = 1) 
    {
        let _rect = new Phaser.Geom.Rectangle(rect.x - rect.width/2, rect.y - rect.height/2, rect.width, rect.height);

        // fija el color
        if (setColor) { 
            const{color, relleno, contorno} = this.btnColor(lv);   
            textStyle.color = color;
            rectStyle.relleno = relleno;
            rectStyle.contorno = contorno;
        } 
        // crea el texto y el rectángulo
        let a = this.addRectText(_rect, text, textStyle); 
        const{rw,rh} = this.getTextRect(a);
        textStyle.fontSize = parseFloat(textStyle.fontSize.slice(0, textStyle.fontSize.length - 2)) * 3;

        let t = this.addRectText(_rect, text, textStyle); 
        t.setDisplaySize(rw / this.coeWidth, rh / this.coeHeight);
        a.destroy();

        this.setRectStyle(_rect, rectStyle);
        
        // console.log(t.text);
        // console.log("- dims: { w: " + t.width + ", h: " + t.height + "} ");
        // console.log("- rect dims: { w: " + _rect.width + ", h: " + _rect.height + "} ");

        return _rect;
    }

    /**
     * Crea un rectángulo con texto en su interior
     * @param {Phaser.Geom.Rectangle} rect rectángulo usado para el panel
     * @param {String} text texto ubicado en el panel
     * @param {Phaser.Types.GameObjects.Text.TextStyle} textStyle estilo asociado al texto
     * @param {makeStruct} rectStyle estilo del rectángulo
     * @param {Number} lv índice asociado
     */
    createTextPanel(rect, text, textStyle, rectStyle, setColor = false, lv = 1) {
        // fija el color
        if (setColor) { 
            const{color, relleno, contorno} = this.btnColor(lv);   
            textStyle.color = color;
            rectStyle.relleno = relleno;
            rectStyle.contorno = contorno;
        } 
        // crea el texto y el rectángulo
        this.addRectText(rect, text, textStyle);   
        this.setRectStyle(rect, rectStyle);
        return rect;
    }

    /**
     * Establece los gráficos con que se va a pintar
     * @param {Phaser.Geom.Rectangle} rect rectángulo usado para el botón
     * @param {makeStruct} rectStyle estilo del rectángulo
     */
    setRectStyle(rect, rectStyle, thick = 2) 
    {        
        /** @type {Phaser.GameObjects.Graphics} */
        let graphics = this.add.graphics({ 
            fillStyle: { 
                color: rectStyle.relleno, alpha: rectStyle.alphaFill 
            },
            lineStyle: {
                width: thick * this.AR,
                color: rectStyle.contorno,
                alpha: rectStyle.alphaLine
            }
        });

        this.resetRectDisplay(graphics, rect, rectStyle);

        return graphics;
    }

    resetRectDisplay(graphics, rect, rectStyle) {
        // how to paint/fill this rectangle
        graphics.clear();
        if (rectStyle.drawFill) graphics.fillRectShape(rect);       // relleno
        if (rectStyle.drawLine) graphics.strokeRectShape(rect);     // trazo
    }

    /**
     * Crea un texto incrustado en un rectángulo (responsive)
     * @param {Phaser.Geom.Rectangle} rect rectángulo contenedor
     * @param {String} text texto que se escribe
     * @param {Phaser.Types.GameObjects.Text.TextStyle} textStyle estilo del texto
     */
    addRectText(rect, text, textStyle) {
        let t = this.addText_s(rect.x + rect.width * 0.5, rect.y + rect.height * 0.5, text, textStyle)
            .setDepth(1);

        // console.log(t.text);
        // console.log("- dims: { w: " + t.width + ", h: " + t.height + "} ");

        return t;
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
                _line = 0xffffff
                break;       
            default:
                break;
        }
        return {color: _color, relleno: _fill, contorno: _line};
    }
};
