import GameObject from "./gameObject.js";

export default class Attack extends GameObject
{
    
    /**
     * Constructor de Heal
     * @param {Scene} scene Escena en la que aparece el bate
     * @param {number} x coordenada x
     * @param {number} y coordenada y
     */
    constructor(scene, x, y) {
        super(scene, x, y, 'attackSpr');
        this.setScale(0.75);
    }

    init(debug = false) {
        this.disable();
        this.body.allowGravity = false;
        this.setPosition(this.playerContainer.x, this.playerContainer.y);

        if (debug) {
            console.log('///');
            console.log('> attack position: { x:' + this.x + ', y: ' + this.y + '} ');
            console.log('> player position: { x:' + this.playerContainer.x + ', y: ' + this.playerContainer.y + '} ');
            console.log(' --- ');
            console.log('///');
        }
    };

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
    }

    enable(x, y) {
        // this.scene.addToScene(this);

        // activa body y sprite 
        this.enableBody(true, x, y, true, true); // parecido a: 'this.setPosition(x,y);'
        this.play('attack', true);

        this.locked = true;
        this.timer = this.scene.time.addEvent({
            delay: 600,
            callback: onEvent,
            callbackScope: this,
            loop: false
        });

        function onEvent() {
            this.disable();            
        }
    }

    disable() {
        this.locked = false;
        this.disableBody(true, true);
        this.anims.stop();
    }
}