export default class blankScene extends Phaser.Scene
{
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
    }

    init()
    {
        this.timeLapsed = 0;
        this.active = false;
        this.p = this.input.keyboard.addKey('P');
        this.setSceneEvents();

        this.logicWidth = 1080;
        this.logicHeight = 567;

        const{width,height} = this.scale;
        this.canvasWidth = width;
        this.canvasHeight = height;  

        this.zoom = this.game.config.zoom;  
        // this.aspect_16_9();
        this.aspect_4_3();
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

    // --- --- TIMER SYSTEM --- --- 
    cooldown(keyTime, fn) {
        if (this.timeLapsed > keyTime)
        {
            fn();
            this.timeLapsed = 0;
        }
    }
    // --- --- --- 

    // --- --- PAUSE SYSTEM --- --- 
    setSceneEvents() {             
        this.events.on('start', () => { this.active = true; });
        this.events.on('create', () => { this.active = true; });
        this.events.on('resume', () => { this.active = true; });
        this.events.on('pause', () => { this.active = false; });
        this.events.on('shutdown', () => { this.active = false; });
    }

    isActive() { return this.active; }
    toggleActive() { this.active = !this.active; }

    handlePause() {
        this.scene.pause();
        this.scene.launch('blankPause');
        // this.scene.start('blankPause');
    }

    handleResume(scene) {
        this.scene.resume(scene);
        this.scene.stop();
        // this.scene.start(scene);
    }
    // --- --- --- 

    // --- --- ASPECT RATIO --- --- 
    logicToCanvasWidth(w) {
        return w *  this.canvasWidth / (this.logicWidth * this.zoom);
    }
    logicToCanvasHeight(h) {
        return h * this.canvasHeight / (this.logicHeight * this.zoom);
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

    excedWidth() {
        return this.canvasWidth / this.logicWidth;
    }
    excedHeight() {
        return this.canvasHeight / this.logicHeight;
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
        let exced = Math.abs(this.excedHeight() - this.excedWidth());
        if (exced > 0.05) {
            if (this.excedWidth() < this.excedHeight()) {
                fs *= 3 * this.canvasWidth / this.logicWidth;
            } else {
                fs *= 3 * this.canvasHeight / this.logicHeight;
            }
        } else {
            fs *= 3 * this.canvasWidth / this.logicWidth;
        }
        return fs + 'px';
    }
    scaleRatio() {
        let zx = 3 * this.canvasWidth / this.logicWidth;
        let zy = 3 * this.canvasHeight / this.logicHeight;
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
     * Crea una línea de texto
     * @param {number} x Posición horizontal
     * @param {number} y Posición vertical
     * @param {String} text Lo que se va a escribir
     * @param {number} size Tamaño de letra
     * @param {Color} color Código hexadecimal
     * @param {String} fuente Fuente creada en CSS
    */
    addTextR(x, y, text, size, color = '#FFFFFF', fuente = 'Greconian', style = 'normal') 
    {
        const _style = { fontSize: size, color: color, fontFamily: fuente, fontStyle: style }
        return this.addTextR_s(x, y, text, _style);
    }
 
    /**
     * Crea una línea de texto
     * @param {number} x Posición horizontal
     * @param {number} y Posición vertical
     * @param {String} text Lo que se va a escribir
     * @param {Phaser.Types.GameObjects.Text.TextStyle} style Atributos para el estilo de la fuente
    */
    addText_s(x, y, text, style) 
    {
       // relación de aspecto
       style.fontSize = this.fontSize(style.fontSize);
  
       // crea el texto
       return this.add.text(x, y, text, style).setOrigin(0.5);
    }

    /**
     * Crea una línea de texto
     * @param {number} x Posición horizontal
     * @param {number} y Posición vertical
     * @param {String} text Lo que se va a escribir
     * @param {Phaser.Types.GameObjects.Text.TextStyle} style Atributos para el estilo de la fuente
    */
    addTextR_s(x, y, text, style) 
    {
        style.fontSize *= 3;
        let t = this.add.text(x, y, text, style).setOrigin(0.5);
        console.log("Font size: { w: " + t.width + ", h: " + t.height + "} ");
        console.log("font size: " + style.fontSize);
        let w = t.width * this.canvasWidth / this.logicWidth;
        let h = t.height * this.canvasHeight / this.logicHeight;
        t.setDisplaySize(w,h);

        // crea el texto
        return t;
    }
    // --- --- --- 
};
