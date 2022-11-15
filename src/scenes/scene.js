export default class blankScene extends Phaser.Scene
{
    // --- TIMER --- 
    /** @type {Number} */
    timeLapsed

    // --- ACTIVITY --- 
    /** @type {boolean} */
    active

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

        if (this.p.isDown) {
            const evt = createEvent('pause');
            document.dispatchEvent(evt);
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

    /**
     * Crea una imagen y la ajusta al fondo
     * @param {String} keymap Nombre dado a la imagen del fondo en boot 
     */
    createBackground(keymap){
        const{width,height} = this.scale;
        this.add.image(width/2, height/2, keymap)
            .setDisplaySize(width,height);
    }
};
