export default class Player extends Phaser.Physics.Arcade.Sprite
{
    /** @type {Phaser.Scene} */
    scene

    // /** @type {Phaser.Types.Input.Keyboard.CursorKeys} */
    cursors

    /**
     * Constructor del jugador
     * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     * @param {Phaser.Textures.Texture} texture Textura usada en el jugador (spritesheet)
     * @param {number} frame Indice del frame utilizado
     */
    constructor(scene, x, y, texture, frame) 
    {
        super(scene, x, y, texture, frame)
        this.scene = scene
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)

        // eventos de teclado
        this.cursors = scene.input.keyboard.createCursorKeys() // init cursors

        // initial animation pause
        this.play('walk')
        this.anims.pause()

        // disable some direction colliders from player
        this.body.checkCollision.up = false
        this.body.checkCollision.right = false
        this.body.checkCollision.left = false

        // colisiona con los limites del mundo pero no por arriba
        this.body.collideWorldBounds = true
        this.scene.physics.world.checkCollision.up = false
    }

    preUpdate(t,dt) 
    {
        super.preUpdate(t,dt) // for animation

        // check if player is touching something below it
        const touchingDown = this.body.onFloor()

        // walk animation
        if (touchingDown && (this.cursors.left.isDown || this.cursors.right.isDown))
        {
            if (this.anims.currentAnim.key != 'walk')
            {
                this.play('walk')
            }
            // resume animation
            this.anims.resume()
        }
        else if (touchingDown)
        {
            // initial animation pause
            this.play('walk')
            this.anims.pause()
        }

        // flying animation
        if (!touchingDown)
        {
            if (this.anims.currentAnim.key != 'jump')
                this.play('jump')
        }

        // left and right input logic
        if (this.cursors.left.isDown)
        {
            this.setVelocityX(-100)
            this.flipX = true
        }
        else if (this.cursors.right.isDown)
        {
            this.setVelocityX(100)
            this.flipX = false
        }
        else
        {
            this.setVelocityX(0)
        }

        // jump input logic
        if (this.cursors.up.isDown)
        {
            this.setVelocityY(-100)
        }

        // wraps the player (movimiento toroidal)
        this.horizontalWrap(this)
    }

    /**
     * @param {Phaser.Physics.Arcade.Sprite} object
     */
    horizontalWrap(object)
    {
        const halfWidth = object.displayWidth * 0.5
        const gameWidth = this.scene.scale.width
        if (object.x < -halfWidth)
        {
            object.x = gameWidth + halfWidth
        }
        else if (object.x > gameWidth + halfWidth)
        {
            object.x = -halfWidth
        }
    }

}
