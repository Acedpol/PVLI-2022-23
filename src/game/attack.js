import Entity from "./entity.js";

export default class Attack extends Entity
{
    /**
     * Constructor de Heal
     * @param {Scene} scene Escena en la que aparece el bate
     * @param {number} x coordenada x
     * @param {number} y coordenada y
     */
    constructor(scene, x, y) {
        super(scene, x, y, 'attack');
        // this.body.allowGravity = false;
        this.setScale(0.75);
        this.disable(); // starts disabled!

        // cooldown condition
        this.cooldown = true;
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
    }

    enable(x, y) {
        // this.scene.addToScene(this);

        // activa body y sprite 
        // this.enableBody(true, x, y, true, true);
        this.setPosition(x,y);
        this.play('attack');

        this.cooldown = false;
        this.timer = this.scene.time.addEvent({
            delay: 500,
            callback: onEvent,
            callbackScope: this,
            loop: false
        });

        function onEvent() {
            this.disable();            
        }
    }

    disable() {
        // this.anims.pause();
        this.cooldown = true;
        // this.disableBody(true, true);
        // this.scene.deleteFromScene(this);
    }
}