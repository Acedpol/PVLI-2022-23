/** @type {Phaser.GameObjects.GameObject} */
export default class PlayerContainer extends Phaser.GameObjects.Container
{

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

        // colisiona con los bordes del mundo de juego
        this.body.collideWorldBounds = true

        // ajustes del jugador
        this.player = aspecto
        this.body.setSize(this.player.width / 2, this.player.height / 2)
        this.body.offset.y = 30
        this.player.setOrigin(0.5,0)

        // initial animation pause
        this.player.play('walk')
        this.player.anims.pause()

        // eventos de teclado
        this.cursors = scene.input.keyboard.createCursorKeys() // init cursors
        this.action = scene.input.keyboard.addKey('SPACE')

        // inicialización de variables
        this._speed = 100
        this.groundCheck = false
        this.jump = true;
        this.jumpCount = true;
        //this.object = null

        // // inicialización de audios fx
        // this.jetpack = this.scene.sound.add('jetpack')
        // this.walk = this.scene.sound.add('walk-audio')
    }

    preUpdate(t,dt)
    {
        this.iterate( (child) => child.preUpdate(t,dt) ) // for animations

        // revisar si esta en contacto con el suelgo y recargar salto
        this.groundCheck = this.body.onFloor()
        if(this.body.onFloor())
        {
            this.groundCheck = true
            this.jump = true
        }
        // walk animation
        if (this.groundCheck && (this.cursors.left.isDown || this.cursors.right.isDown))
        {
            if (this.player.anims.currentAnim.key != 'walk')
            {
                this.player.play('walk')
            }
            // resume animation
            this.player.anims.resume()

            // sfx
            // if (!this.walk.isPlaying)
            // {
            //     this.walk.play({
            //         volume: 0.75,
            //         rate: 1.5
            //     })
            // }
        }
        else if (this.groundCheck)
        {
            // initial animation pause
            this.player.play('walk')    
            this.player.anims.pause()

            //this.walk.stop() // keeps sure to stop playing sound
        }

        // flying animation
        if (!this.groundCheck)
        {
            // sfx
            // if (!this.jetpack.isPlaying)
            // {
            //     this.jetpack.play({
            //         volume: 0.5
            //     })
            // }

            // animation
            if (this.player.anims.currentAnim.key != 'jump')
                this.player.play('jump')

            //this.walk.stop() // keeps sure to stop playing sound
        }
        // else
        // {
        //     this.jetpack.stop() // keeps sure to stop playing sound
        // }

        this.playerController();
    }

    playerController()
    {
        //movement
        if (this.cursors.left.isDown)
        {
            this.body.setVelocityX(-80)
            this.player.flipX = true
        }
        else if (this.cursors.right.isDown)
        {
            this.body.setVelocityX(80)
            this.player.flipX = false
        }
        else
        {
            this.body.setVelocityX(0)
        }

        // jump input logic
        if (this.cursors.up.isDown)
        {
            if(this.jump)
            {
                this.body.setVelocityY(-150)
            }
            if(!this.groundCheck)
            {
                this.jump = false
            }
        }
    }

    /**
     * @param {Phaser.Physics.Arcade.Sprite} object
     */
    // horizontalWrap(object)
    // {
    //     const halfWidth = object.body.width * 0.25
    //     const gameWidth = this.scene.scale.width
    //     if (object.x < -halfWidth*3)
    //     {
    //         object.x = gameWidth - halfWidth
    //     }
    //     else if (object.x > gameWidth - halfWidth)
    //     {
    //         object.x = -halfWidth*3
    //     }
    // }

    // /** 
    //  * Carries an object
    //  * @param {Phaser.GameObjects.GameObject} object The object that will carry over
    //  */
    // carryObject(object)
    // {
    //     if (!this.carriesObject)
    //     {
    //         // keeps save the object
    //         this.object = object
    //         this.carriesObject = true

    //         // disable from physics world
    //         this.scene.physics.world.disableBody(object.body)

    //         // Recoge el object y se lo añade a playerContainer (y lo coloca)
    //         this.add(object)
    //         object.setPosition(0, -object.height -2)
    //         object.setOrigin(0)

    //         console.log('pick')
    //         this.collectObject()
    //     }
    // }

    /**
     * Drops an object that is being carried
     */
    // dropObject()
    // {
    //     if (this.carriesObject)
    //     {
    //         // registers the actual position relative to the player container
    //         let posX = this.x;
    //         let posY = this.y - this.object.height - 2;

    //         // removes and deletes the first object carried by the player container
    //         this.remove(this.getAt(1), true)

    //         // creates a new one in the same position
    //         let object = this.scene.createRandomObject(this.scene.map)
    //         object.setPosition(posX, posY)
    //         object.setOrigin(0)

    //         // reset physics
    //         this.scene.physics.world.enable(object)
    //         object.setVelocityY(-100)

    //         // reset values
    //         this.object = null
    //         this.carriesObject = false

    //         console.log('drop')
    //         this.unCollectObject()
    //     }        
    // }

    // /**
    //  * Subs a collected object from the score
    //  */
    // unCollectObject()
    // {
    //     // suma uno al marcador
    //     this.scene.objectCollected--
            
    //     // create new text value and set it
    //     const value = this.scene.objectCollected + '/' + this.scene.objectToFinish
    //     this.scene.objectCollectedText.text = value      
    // }

    // /**
    //  * Adds another collected object to the score
    //  */
    // collectObject()
    // {
    //     // suma uno al marcador
    //     this.scene.objectCollected++
             
    //     // create new text value and set it
    //     const value = this.scene.objectCollected + '/' + this.scene.objectToFinish
    //     this.scene.objectCollectedText.text = value      
    // }
}
