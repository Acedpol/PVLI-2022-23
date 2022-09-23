export default class Bullet extends Phaser.Physics.Arcade.Sprite
{
    /** @type {Phaser.Scene} */
    scene

    /** @type {Phaser.Sound.BaseSound} */
    explode

    /** @type {Boolean} */
    isExploted

    /** @type {Number} */
    incV

    /** @type {Phaser.Math.Vector2} */
    vel

    /**
     * Constructor del objeto combustible
     * @param {Phaser.Scene} scene Escena a la que pertenece el proyectil
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     * @param {Phaser.Textures.Texture} texture Textura usada para el proyectil (spritesheet)
     */
    constructor(scene, x, y, texture) 
    {
        super(scene, x, y, texture)
        this.scene = scene
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)

        // set active and visible
        this.setActive(true)
        this.setVisible(true)

        // inicialización de variables //

        // sets the angle of the object
        let ang = Phaser.Math.Between(1, 179)
        this.angle = ang

        // sets the vector velocity
        let PI = 3.1416
        let velY = Phaser.Math.FloatBetween(0.5, 1)
        let velX
        if (ang <= 90)
        {
            let a = ang * PI / 180
            velX = velY / Math.sin(a) * Math.cos(a)
        }
        else
        {
            let a = (180 - ang) * PI / 180
            velX = velY / Math.sin(a) * Math.cos(a)
            velX *= -1
        }

        this.vel = new Phaser.Math.Vector2(velX, velY)
        this.vel.normalize()

        // scales the velocity
        this.incV = 30
        this.vel.scale(this.incV)

        // animation
        this.play('fly-bullet')

        // inicialización de audio sfx
        this.isExploted = false
    }

    preUpdate(t,dt) 
    {
        super.preUpdate(t,dt) // for animation

        // movimiento
        this.body.setAccelerationY(-200) // anula la gravedad!!
        this.setVelocity(this.vel.x, this.vel.y) // sets velocity

        // checks if the player overlap with this GameObject
        if (this.scene.physics.overlap(this, this.scene.playerContainer))
        {        
            this.scene.handleGameLose(this)
        }

        // checks if the player overlap with the groundLayer
        if (this.body.onFloor() || this.body.onWall()) 
        {
            this.play('explote', true)
            if (!this.isExploted) {
                this.scene.sound.play('explode', {
                    volume: 3,
                    rate: 1
                })
                this.isExploted = true
            }
            this.scene.physics.world.disableBody(this.body)
            this.scene.time.delayedCall(1000, () => {
                this.scene.bullets.killAndHide(this)
            })
        }

        // wraps the bullet (movimiento toroidal)
        this.horizontalWrap(this)
    }

    /**
     * @param {Phaser.Physics.Arcade.Sprite} object
     */
    horizontalWrap(object)
    {
        const halfWidth = object.body.width * 0.25
        const gameWidth = this.scene.scale.width
        if (object.x < -halfWidth*3)
        {
            object.x = gameWidth - halfWidth
        }
        else if (object.x > gameWidth - halfWidth)
        {
            object.x = -halfWidth*3
        }
    }



}