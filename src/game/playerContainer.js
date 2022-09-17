/** @type {Phaser.GameObjects.GameObject} */
export default class PlayerContainer extends Phaser.GameObjects.Container
{
    /** @type {Phaser.Scene} */
    scene

    /** @type {Phaser.Types.Input.Keyboard.CursorKeys} */
    cursors

    /** @type {Number} */
    _speed

    /** @type {Phaser.Physics.Arcade.Sprite} */
    player

    /** @type {Boolean} */
    carriesObject

    /** @type {Fuel} */
    fuel

    /** @type {Phaser.Sound.BaseSound} */
    jetpack

    /** @type {Phaser.Sound.BaseSound} */
    walk

    /**
     * Constructor del container del jugador
     * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     * @param {Phaser.Physics.Arcade.Sprite} aspecto Sprite que representa al jugador
     */
    constructor(scene, x, y, aspecto)
    {
        // Constructor del container //
        super(scene, x, y, aspecto)
        this.scene = scene
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)

        // disable some direction colliders from player
        // this.body.checkCollision.up = false
        // this.body.checkCollision.right = false
        // this.body.checkCollision.left = false

        // colisiona con los bordes del mundo de juego
        this.body.collideWorldBounds = true

        // ajustes del jugador
        this.player = aspecto
        this.body.setSize(this.player.width, this.player.height)
        this.player.setOrigin(0)

        // initial animation pause
        this.player.play('walk')
        this.player.anims.pause()

        // eventos de teclado
        this.cursors = scene.input.keyboard.createCursorKeys() // init cursors

        // inicialización de variables
        this._speed = 100
        this.carriesObject = false
        this.fuel = null

        // inicialización de audios fx
        this.jetpack = this.scene.sound.add('jetpack')
        this.walk = this.scene.sound.add('walk-audio')
    }

    preUpdate(t,dt)
    {
        this.iterate( (child) => child.preUpdate(t,dt) ) // for animations

        // check if player is touching something below it
        const touchingDown = this.body.onFloor()

        // walk animation
        if (touchingDown && (this.cursors.left.isDown || this.cursors.right.isDown))
        {
            if (this.player.anims.currentAnim.key != 'walk')
            {
                this.player.play('walk')
            }
            // resume animation
            this.player.anims.resume()

            // sfx
            if (!this.walk.isPlaying)
            {
                this.walk.play({
                    volume: 0.75,
                    rate: 1.5
                })
            }
        }
        else if (touchingDown)
        {
            // initial animation pause
            this.player.play('walk')    
            this.player.anims.pause()

            this.walk.stop() // keeps sure to stop playing sound
        }

        // flying animation
        if (!touchingDown)
        {
            // sfx
            if (!this.jetpack.isPlaying)
            {
                this.jetpack.play({
                    volume: 0.5
                })
            }

            // animation
            if (this.player.anims.currentAnim.key != 'jump')
                this.player.play('jump')

            this.walk.stop() // keeps sure to stop playing sound
        }
        else
        {
            this.jetpack.stop() // keeps sure to stop playing sound
        }

        // left and right input logic
        if (this.cursors.left.isDown)
        {
            this.body.setVelocityX(-100)
            this.player.flipX = true
        }
        else if (this.cursors.right.isDown)
        {
            this.body.setVelocityX(100)
            this.player.flipX = false
        }
        else
        {
            this.body.setVelocityX(0)
        }

        // jump input logic
        if (this.cursors.up.isDown)
        {
            this.body.setVelocityY(-100)
        }

        // wraps the player (movimiento toroidal)
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

    /** 
     * Carries an object
     * @param {Phaser.GameObjects.GameObject} object The object that will carry over
     */
    carryObject(object)
    {
        // keeps save the object
        this.fuel = object
        this.carriesObject = true

        // disable from physics world
        this.scene.physics.world.disableBody(object.body)

        // Recoge el fuel y se lo añade a playerContainer (y lo coloca)
        this.add(object)
        object.setPosition(0, -object.height -2)
        object.setOrigin(0)
    }

    /**
     * Drops an object carried
     */
    dropObject()
    {
        if (this.carriesObject)
        {
            // hide from display (utilizado en caso de colectividad)
            // this.scene.fuels.killAndHide(fuel)
            
            // suma uno al marcador
            this.scene.fuelCollected++
            
            // create new text value and set it
            const value = this.scene.fuelCollected + '/' + this.scene.fuelToFinish
            this.scene.fuelCollectedText.text = value

            // removes the object from the scene
            this.fuel.destroy() // posible recurso (utilizado en caso de exclusividad)

            // reset values
            this.fuel = null
            this.carriesObject = false

            // creates a new one if it's not finished the game
            this.scene.createRandomFuel(this.scene.map)
        }        
    }


}