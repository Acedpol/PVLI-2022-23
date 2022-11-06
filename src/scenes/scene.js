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
        this.setPauseCtrl();
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

    cooldown(keyTime, fn) {
        if (this.timeLapsed > keyTime)
        {
            fn();
            this.timeLapsed = 0;
        }
    }

    setPauseCtrl() {
        this.p = this.input.keyboard.addKey('P');
        this.active = true;      
        this.events.on('resume', () => { this.active = true; });
        this.events.on('pause', () => { this.active = false; });
        this.events.on('shutdown', () => { this.active = false; });
    }

    isActive() { return this.active; }
    toggleActive() { this.active = !this.active; }

    handlePause() {
        this.scene.pause();
        this.scene.launch('blankPause');
    }

    handleResume(scene) {
        this.scene.resume(scene);
        this.scene.stop();
    }
};
