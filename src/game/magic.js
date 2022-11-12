import Object from './object.js'

export default class Magic extends Object
{
    /** @type {boolean} */
    stop

    /** @type {boolean} */
    onRotation

    /** @type {Number} */
    incRot

    /**
     * Constructor del objeto combustible
     * @param {Phaser.Scene} scene Escena a la que pertenece el combustible
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     * @param {Phaser.Textures.Texture} texture Textura usada para el combustible (image)
     */
    constructor(scene, x, y) 
    {
        super(scene, x, y, 'object', 3)
        this.stopMoving = false;
        this.rotation = false;
        this.incRot = 0;

        // set active and visible
        this.setActive(true)
        this.setVisible(true)
 
        // colisiona con los limites del mundo
    }

    preUpdate(t,dt) 
    {
        super.preUpdate(t,dt) // for animation

        if (this.stop) {
            this.stopInertia();
            console.log(this.onRotation)
        }
        if (this.onRotation) {
            this.angle += this.incRot;
        }
    }

    effect()
    {
        this.container.carryObject(this)
        this.scene.sound.play('pick')
    }

    setIncRot(inc) {
        this.incRot = inc;
    }

    toggleRotationActivity() {
        this.onRotation = !this.onRotation
    }
    ensureRotationActivity() {
        this.onRotation = false;
    }

    toggleStopInertia() {
        this.stop = !this.stop
    }

    stopInertia() {
        if (this.body.velocity.y == 0 && this.body.onFloor()) {
            this.toggleRotationActivity();
            this.toggleStopInertia();
            this.scene.time.delayedCall(250, () => {
                this.setVelocityX(0)
            })

        }
    }

}