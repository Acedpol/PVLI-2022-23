import PlayerContainer from './playerContainer.js'

export default class Object extends Phaser.Physics.Arcade.Sprite
{
    /** @type {Phaser.Scene} */
    scene

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
    constructor(scene, x, y, texture) 
    {
        super(scene, x, y, texture)
        this.scene = scene
        this.scene.add.existing(this)
        // this.scene.physics.add.existing(this)
        this.scene.physics.world.enable(this)

        console.log('new object x:' + x + ', y:' + y + ', texture:' + texture) // print info
        this.setScale(0.5,0.5);

        this.stopMoving = false;
        this.rotation = false;
        this.incRot = 0;

        // set active and visible
        this.setActive(true)
        this.setVisible(true)
 
        // colisiona con los limites del mundo
        this.body.collideWorldBounds = true
    }

    preUpdate(t,dt) 
    {
        super.preUpdate(t,dt) // for animation

        /** @type {PlayerContainer} */
        let container = this.scene.playerContainer

        // checks if the player overlap with this GameObject
        if (this.scene.physics.overlap(this, container))
        {            
            container.carryObject(this)
            this.scene.sound.play('pick')   // sound feedback
        }
        
        if (this.stop) {
            this.stopInertia();
            console.log(this.onRotation)
        }
        if (this.onRotation) {
            this.angle += this.incRot;
        }
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