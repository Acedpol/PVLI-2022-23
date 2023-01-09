/**
 * @constructor Generates a constructor for a given data structure
 * @param {string} keys separated by a comma + whitespace. struct('id, name, age')
 * @returns {constructor} Constructor for the new struct
 */
function makeStruct(keys) {
    if (!keys) return null;
    const k = keys.split(', ');
    const count = k.length;
    
    /** @constructor */
    function constructor() {
        for (let i = 0; i < count; i++) this[k[i]] = arguments[i];
    }
    return constructor;
}

export default class blankScene extends Phaser.Scene
{
    // --- STRUCT --- 
    /** @type {makeStruct} */   rectStyle

    // --- TIMER --- 
    /** @type {Number} */   timeLapsed

    // --- ACTIVITY --- 
    /** @type {boolean} */  active

    // --- DIMENSIONS --- 
    /** @type {Number} */   logicWidth
    /** @type {Number} */   logicHeight
    /** @type {Number} */   canvasWidth
    /** @type {Number} */   canvasHeight    

    // --- ASPECT GAME --- 
    /** @type {Number} */   AR
    /** @type {Number} */   coeHeight
    /** @type {Number} */   coeWidth
    /** @type {Number} */   zoom
    /** @type {Number} */   zw
    /** @type {Number} */   zh
    /** @type {Number} */   mw
    /** @type {Number} */   mh

    constructor(keyname) 
    {
        super({
            key: keyname
        });

        this.audioConfig = {
            mute: false,
            volume: 0.2,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0
        };
    }

    init(args)
    {
        this.args = args;
        this.onResume(args);
        this.events.on('resume', (scene, args) => { this.onResume(args); } );

        this.timeLapsed = 0;
        this.active = false;
        this.p = this.input.keyboard.addKey('P');
        this.setSceneEvents();

        this.logicWidth = 1080;
        this.logicHeight = 567;

        const{width,height} = this.scale;
        this.canvasWidth = width;
        this.canvasHeight = height;  

        this.coeWidth = this.getCoeWidth();
        this.coeHeight = this.getCoeHeight();
        this.AR = this.getAR();

        this.zoom = this.game.config.zoom;
        this.aspect_4_3();

        this.rectStyle = new makeStruct('relleno, contorno, alphaFill, alphaLine, drawFill, drawLine');
    }

    onResume(args) {
        this.optA = args.optA; 
        this.optB = args.optB; 
        this.volGen = args.volGen;
        this.volAmb = args.volAmb;
        this.volSFX = args.volSFX;
        this.mute = args.mute;

        this.genConfig = {
            mute: args.mute,
            volume: this.volGen / 100,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0
        };
        this.ambConfig = {
            mute: args.mute,
            volume: this.volAmb / 100 * this.volGen / 100,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        };
        this.sfxConfig = {
            mute: args.mute,
            volume: this.volSFX / 100 * this.volGen / 100,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0
        };
    }

    preload() 
    {
        console.log(key + " scene")
    }

    create() 
    {
    }

    update(t, dt) 
    {
        this.timeLapsed = this.timeLapsed + dt; // UPDATE TIMER

        if (this.timeLapsed > 150 && this.p.isDown) {
            const evt = createEvent('pause');
            document.dispatchEvent(evt);
            this.timeLapsed = 0;
        }
    }

    // --- --- TIMER --- --- 

    cooldown(keyTime, fn) {
        if (this.timeLapsed > keyTime)
        {
            fn();
            this.timeLapsed = 0;
        }
    }

    // --- --- --- 

    // --- --- SYSTEM ACTIVITY --- --- 

    setSceneEvents() {             
        this.events.on('start', () => { this.active = true; });
        this.events.on('create', () => { this.active = true; });
        this.events.on('resume', () => { this.active = true; });
        this.events.on('pause', () => { this.active = false; });
        this.events.on('shutdown', () => { this.active = false; });
    }

    isActive() { return this.active; }
    toggleActive() { this.active = !this.active; }
    enable() { this.active = true; }
    disable() { this.active= false; }

    // --- --- --- 

    // --- --- ASPECT RATIO --- --- 
    logicToCanvasWidth(w) {
        return w *  this.canvasWidth / this.logicWidth;
    }
    logicToCanvasHeight(h) {
        return h * this.canvasHeight / this.logicHeight;
    }

    canvasAR() {
        return this.canvasWidth / this.canvasHeight;
    }
    logicAR() {
        return this.logicWidth / this.logicHeight;
    }
    realAR() {
        return this.zw / this.zh;
    }

    getCoeWidth() {
        return this.canvasWidth / this.logicWidth;
    }
    getCoeHeight() {
        return this.canvasHeight / this.logicHeight;
    }
    getAR() {
        return (this.coeHeight + this.coeWidth) / 2;
    }

    aspect_ratio_W() {
        return this.logicWidth / this.logicHeight;
    }
    aspect_ratio_H() {
        return this.logicHeight / this.logicWidth;
    }

    aspect_16_9() {
        this.zw = this.canvasWidth;
        this.zh = this.canvasWidth * this.aspect_ratio_H();
        this.mh = (this.canvasHeight - this.zh) / 2;
    }
    aspect_4_3() {
        this.zh = this.canvasHeight;
        this.zw = this.canvasHeight * this.aspect_ratio_W();
        this.mw = (this.canvasWidth - this.zw) / 2;
    }

    fontSize(size) {
        let fs = size;
        let exced = Math.abs(this.coeHeight - this.coeWidth);
        if (exced > 0.05) {
            if (this.coeWidth < this.coeHeight) {
                fs *= 3 * this.coeWidth;
            } else {
                fs *= 3 * this.coeHeight;
            }
        } else {
            fs *= 3 * this.coeWidth;
        }
        return fs + 'px';
    }

    scaleRatio() {
        let zx = 3 * this.coeWidth;
        let zy = 3 * this.coeHeight;
        return {zx,zy};
    }
    // --- --- --- 

    // --- --- BACKGROUND --- --- 
    /**
     * Crea una imagen y la ajusta al tamaño del mapa
     * @param {String} keymap Nombre dado a la imagen del fondo en boot 
     * @param {Phaser.Tilemaps.Tilemap} map mapa de juego
     */
    createMapBackground(keymap, map){
        // dimensiones del mapa
        const mapWidth = map.width * map.tileWidth
        const mapHeight = map.height * map.tileHeight
        this.background = this.add.image(mapWidth/2, mapHeight/2, keymap)
            .setDisplaySize(mapWidth,mapHeight);
    }

    /**
     * Crea una imagen y la ajusta al tamaño proporcionado
     * @param {String} keymap Nombre dado a la imagen del fondo en boot 
     * @param {number} width ancho del fondo
     * @param {number} height alto del fondo
     */
     createSizedBackground(keymap, width, height){
        this.background = this.add.image(width/2, height/2, keymap)
            .setDisplaySize(width,height);
    }

    /**
     * Crea una imagen y la ajusta al tamaño del canvas
     * @param {String} keymap Nombre dado a la imagen del fondo en boot 
     */
    createBackground(keymap){
        const{width,height} = this.scale;
        this.background = this.add.image(width/2, height/2, keymap)
            .setDisplaySize(width,height);
    }
    // --- --- 

    // --- --- TEXT --- --- 
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
        const _style = { fontSize: size, color: color, fontFamily: fuente, fontStyle: style }
        return this.addText_s(x, y, text, _style);
    }

    /**
     * Crea una línea de texto (responsive)
     * @param {number} x Posición horizontal
     * @param {number} y Posición vertical
     * @param {String} text Lo que se va a escribir
     * @param {Phaser.Types.GameObjects.Text.TextStyle} style Atributos para el estilo de la fuente
    */
    addText_s(x, y, text, style) 
    {
        // tamaño original
        let fs = style.fontSize;

        // rectangulo envolvente
        let t = this.add.text(x, y, text, style).setOrigin(0.5)
            .setFontSize(3 * fs); 
        const{rw,rh} = this.getTextRect(t);
        t.destroy();

        // relación de aspecto
        t = this.add.text(x, y, text, style).setOrigin(0.5)
            .setFontSize(3 * fs * this.AR)
            .setDisplaySize(rw,rh);
   
        // crea el texto
        return t;
    }

    /**
     * Devuelve el tamaño del rectángulo que envuelve el texto
     * @param {Phaser.GameObjects.Text} text text object to get rect size
     * @param {Boolean} debug debug or not debug
     */
    getTextRect(text, debug = false) {
        let rw = text.width * this.coeWidth;
        let rh = text.height * this.coeHeight;
        if (debug) this.debugTextRect(text);
        return {rw,rh};
    }

    /**
     * Muestra por consola datos relevantes del texto
     * @param {Phaser.GameObjects.Text} text text object to be debug
     */
    debugTextRect(text) {
        console.log("FontRect size: { w: " + text.width + ", h: " + text.height + "} ");
        console.log("- font size: " + text.style.fontSize);
        console.log("Canvas size: { w: " + this.canvasWidth + ", h: " + this.canvasHeight + "} ");
    }
    // --- --- --- 
};
