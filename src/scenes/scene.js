export default class blankScene extends Phaser.Scene
{
    // --- TIMER --- 
    /** @type {Number} */
    timeLapsed

    // --- ACTIVITY --- 
    /** @type {boolean} */
    active

    // --- ASPECT --- 
    /** @type {Number} */
    logicWidth
    /** @type {Number} */
    logicHeight
    /** @type {Number} */
    globalWidth
    /** @type {Number} */
    globalHeight    

    // --- CAMERA --- 
    /** @type {Number} */
    zoom
    /** @type {Number} */
    zw
    /** @type {Number} */
    zh
    /** @type {Number} */
    mw
    /** @type {Number} */
    mh

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
        this.globalWidth = width;
        this.globalHeight = height;  

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
    logicToGlobalWidth(w) {
        return w *  this.globalWidth / (this.logicWidth * this.zoom);
    }
    logicToGlobalHeight(h) {
        return h * this.globalHeight / (this.logicHeight * this.zoom);
    }

    globalAR() {
        return this.globalWidth / this.globalHeight;
    }
    logicAR() {
        return this.logicWidth / this.logicHeight;
    }
    realAR() {
        return this.zw / this.zh;
    }

    excedWidth() {
        return this.globalWidth / this.logicWidth;
    }
    excedHeight() {
        return this.globalHeight / this.logicHeight;
    }

    aspect_ratio_W() {
        return this.logicWidth / this.logicHeight;
    }
    aspect_ratio_H() {
        return this.logicHeight / this.logicWidth;
    }
    aspect_16_9() {
        this.zw = this.globalWidth;
        this.zh = this.globalWidth * this.aspect_ratio_H();
        this.mh = (this.globalHeight - this.zh) / 2;
    }
    aspect_4_3() {
        this.zh = this.globalHeight;
        this.zw = this.globalHeight * this.aspect_ratio_W();
        this.mw = (this.globalWidth - this.zw) / 2;
    }

    fontSize(size) {
        let fs = size;
        let exced = Math.abs(this.excedHeight() - this.excedWidth());
        if (exced > 0.05) {
            if (this.excedWidth() < this.excedHeight()) {
                fs *= 3 * this.globalWidth / this.logicWidth;
            } else {
                fs *= 3 * this.globalHeight / this.logicHeight;
            }
        } else {
            fs *= 3 * this.globalWidth / this.logicWidth;
        }
        return fs;
    }
    scaleRatio() {
        let zx = 3 * this.globalWidth / this.logicWidth;
        let zy = 3 * this.globalHeight / this.logicHeight;
        return {zx,zy};
    }
    // --- --- --- 

    // --- --- BACKGROUND --- --- 
    /**
     * Crea una imagen y la ajusta al fondo
     * @param {String} keymap Nombre dado a la imagen del fondo en boot 
     * @param {number} width ancho del fondo
     * @param {number} height alto del fondo
     */
    createBackgroundS(keymap, width, height){
        this.background = this.add.image(width/2, height/2, keymap)
            .setDisplaySize(width,height);
    }

    /**
     * Crea una imagen y la ajusta al fondo
     * @param {String} keymap Nombre dado a la imagen del fondo en boot 
     */
    createBackground(keymap){
        const{width,height} = this.scale;
        this.background = this.add.image(width/2, height/2, keymap)
            .setDisplaySize(width,height);
    }
    // --- --- 
};
