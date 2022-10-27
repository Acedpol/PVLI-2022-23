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

        //vida
        this.health = 9;
        this.maxHealth = 9;

        // colisiona con los bordes del mundo de juego
        this.body.collideWorldBounds = true

        // ajustes del jugador
        this.player = aspecto
        this.body.setSize(this.player.width / 3, this.player.height * 70 / 100)
        // this.body.offset.y = 20
        this.player.setOrigin(0.3,0.2)

        // initial animation pause
        this.player.play('walk')
            this.player.anims.pause()

        // eventos de teclado
        this.cursors = scene.input.keyboard.createCursorKeys() // init cursors
        this.action = scene.input.keyboard.addKey('SPACE')

        // inicialización de variables
        this._speed = 100
        this.groundCheck = false
        this.allowJump = true;
        this.jumpCount = true;

        //cada cuanto puede recibir daño
        this.damageTimer = 2000000000000000000
        //booleanno para saber si puede ser dañado
        this.canDamage = true
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
        this.groundCheck ? this.allowJump = true : this.allowJump = false;

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

        // actives the main action of the player
        if (this.action.isDown)
        {
            this.dropObject()
        }

        this.playerController();

        this.timeLapsed += this.timeLapsed + dt;

        if(this.timeLapsed > this.damageTimer && !this.canDamage)
        {
            this.canDamage = true;
            console.log("puede ser dañado")
        }

        // this.horizontalWrap(this);
    }

    playerController()
    {
        //movement
        if (this.cursors.left.isDown)
        {
            this.body.setVelocityX(-80)
            this.player.flipX = true
            if (this.carriesObject) this.object.flipX = true
        }
        else if (this.cursors.right.isDown)
        {
            this.body.setVelocityX(80)
            this.player.flipX = false
            if (this.carriesObject) this.object.flipX = false
        }
        else
        {
            this.body.setVelocityX(0)
        }

        // jump input logic
        if (this.cursors.up.isDown && this.allowJump)
        {
            this.body.setVelocityY(-175)
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
    carryObject(object)
    {
        if (!this.carriesObject)
        {
            // keeps save the object
            /** @type {Phaser.Physics.Arcade.Image} */
            this.object = object
            this.object.angle = 0
            this.object.ensureRotationActivity()
            this.carriesObject = true

            // disable from physics world
            this.scene.physics.world.disableBody(object.body)

            // Recoge el object y se lo añade a playerContainer (y lo coloca)
            this.add(object)
            object.setPosition(0 + this.player.width * 7.5 / 100, 0 - this.player.height * 12 / 100)
            object.setOrigin(0)

            console.log('pick')
            // this.collectObject()
        }
    }

    /**
     * Drops an object that is being carried
     */
    heal(power)
    {
        this.health += power;
        if(this.health > this.maxHealth)
        {
            this.health = this.maxHealth
            console.log("health" + this.health)
        }
    }
    hurt(power)
    {
        if(this.canDamage)
        {
            this.health -= power;
            this.timeLapsed = 0;
            this.canDamage = false;
            console.log("health" + this.health)
            
            //el jugador muere
            if(this.health < 1)
            {
                this.scene.handleGameLose();
            }
        }
    }
    dropObject()
    {
        if (this.carriesObject)
        {
            // registers the actual position relative to the player container
            let posX = this.x + this.body.width / 2;
            let posY = this.y - this.player.height * 25 / 100;

            // removes and deletes the first object carried by the player container
            this.remove(this.getAt(1), true)

            // creates a new one in the same position
            let object = this.scene.createRandomObject(this.scene.map)
            object.setPosition(posX, posY)
            object.setOrigin(0.5,0.5)

            // reset physics
            this.scene.physics.world.enable(object)
            object.setVelocityY(-100)
            object.toggleRotationActivity()

            if (this.player.flipX) {
                object.setVelocityX(-75);
                object.flipX = true;
                object.setIncRot(5);
            } else {
                object.setVelocityX(75);
                object.flipX = false;
                object.setIncRot(-5);
            }

            this.scene.time.delayedCall(100, () => {
                object.toggleStopInertia()
            })

            // reset values
            this.object = null
            this.carriesObject = false

            console.log('drop')
            // this.unCollectObject()
        }        
    }


}
