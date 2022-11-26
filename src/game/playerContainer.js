import Magic from "./magic.js"
import Attack from "./attack.js"

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
    constructor(scene, x, y, aspecto, optA)
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
        this.body.setSize(this.player.width * 11 / 100, this.player.height * 48 / 100)
        // this.body.offset.y = 20
        this.player.setOrigin(0.4275,0.3275);

        this.player.setScale(0.75, 0.75);

        // initial animation pause
        this.player.play('walk')
            this.player.anims.pause()

        // eventos de teclado
        this.optA = optA;
        if (this.optA === 3) this.setInputA(); else this.setInputB(); // init cursors

        // inicialización de variables
        this._speed = 100
        this.groundCheck = false

        // maximum number of allowed jumps
        this.maxJumps = 1;
        this.nextJump = this.scene.time.now;
        this.allowedJumps = this.maxJumps;


        //booleanno para saber si puede ser dañado
        this.canDamage = true
        this.xHead = 0;
        this.yHead = 0;

        // ataque
        this.attackcooldown = true
        this.attack = this.scene.add.existing(new Attack(this.scene, 155, 150   ));
        this.attack.disable();

        // magia
        this.magic = null;

        // // inicialización de audios fx
        // this.jetpack = this.scene.sound.add('jetpack')
        // this.walk = this.scene.sound.add('walk-audio')
    }

    preUpdate(t,dt)
    {
        this.iterate( (child) => child.preUpdate(t,dt) ) // for animations

        // revisar si esta en contacto con el suelgo y recargar salto
        this.groundCheck = this.body.onFloor()
        this.checkInput();
        // this.groundCheck ? this.allowJump = true : this.allowJump = false;

        // walk animation
        if (this.groundCheck && (this.left || this.right))
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

        this.timeLapsed += this.timeLapsed + dt;

        if(this.timeLapsed > this.damageTimer && !this.canDamage)
        {
            this.canDamage = true;
            console.log("puede ser dañado")
        }

        // this.horizontalWrap(this);
        this.headAnimation();

        // UI
        this.scene.UI.rewriteUI(this.scene.UI.place01, 'Allowed jumps: ' + this.allowedJumps + "/" + this.maxJumps);
    }

    checkInput() {
        this.left = this.optA ? this.a.isDown : this.cursors.left.isDown;
        this.right = this.optA ? this.d.isDown : this.cursors.right.isDown;
        this.up = this.optA ? this.w.isDown : this.cursors.up.isDown;
        this.down = this.optA ? this.s.isDown : this.cursors.down.isDown;
        this.shoot_A = this.optA ? this.j.isDown : this.z.isDown;
        this.shoot_B = this.optA ? this.k.isDown : this.x.isDown;
        this.action = this.space.isDown;
    }

    playerController()
    {
        //movement
        if (this.left)
        {
            this.body.setVelocityX(-80)
            this.player.flipX = true
            if (this.carriesMagic) this.magic.flipX = true
        }
        else if (this.right)
        {
            this.body.setVelocityX(80)
            this.player.flipX = false
            if (this.carriesMagic) this.magic.flipX = false
        }
        else
        {
            this.body.setVelocityX(0)
        }

        // jump input logic
        if (this.allowedJumps > 0 && this.up && this.nextJump < this.scene.time.now)
        {
            this.allowedJumps--;
            console.log(this.allowedJumps);
            this.body.setVelocityY(-190);
            this.nextJump = this.scene.time.now + 500;
        }

        if (this.groundCheck){
            this.allowedJumps = this.maxJumps;
        }

        if (this.shoot_A) {
            this.attackinput()
        }

        if (this.shoot_B){
            this.dropMagic();
        }
    }

    headAnimation() {
        if (this.carriesMagic)
        {
            if (!this.groundCheck)
            {
                // console.log("index flying: " + this.player.anims.currentFrame.index);
                let index = this.player.anims.currentFrame.index;
                let zoom = 2; // this.scene.game.config.zoom;
                let sx = this.player.scaleX;
                let sy = this.player.scaleY;
                if (index >= 2 && index <= 6) {
                    let ix = 1.639 * sx; // - ((this.player.width * 1 / 4) * 100 / 122); 
                    let iy = 2.105 * sy; // - ((this.player.height * 1 / 4) * 100 / 95);
                    this.xHead += ix / zoom * sx;
                    this.yHead += iy / zoom * sy;
                } else if (index > 6 && index <= 9) {
                    let ix = 2.459 * sx; // - ((this.player.width * 1 / 4) * 100 / 122);
                    let iy = 3.158 * sy; // - ((this.player.height * 1 / 4) * 100 / 95);
                    this.xHead -= ix / zoom * sx;
                    this.yHead -= iy / zoom * sy;
                } else {
                    this.xHead = 0; this.yHead = 0;
                }
                if (!this.player.flipX) 
                    this.magic.setPosition(0 - this.player.width * (-2 + this.xHead) / 100, 0 - this.player.height * (9 + this.yHead) / 100);
                else
                    this.magic.setPosition(0 + this.player.width * (-4 + this.xHead) / 100, 0 - this.player.height * (9 + this.yHead) / 100);
            } else {
                this.xHead = 0; this.yHead = 0;
                if (!this.player.flipX)
                    this.magic.setPosition(0 + this.player.width * 0 / 100, 0 - this.player.height * 6 / 100);
                else 
                    this.magic.setPosition(0 + this.player.width * -2 / 100, 0 - this.player.height * 6 / 100);
            }
        }
    }

    /**
     * @param {Phaser.Physics.Arcade.Sprite} magic
     */
    horizontalWrap(magic)
    {
        const halfWidth = magic.body.width * 0.25
        const gameWidth = this.scene.scale.width
        if (magic.x < -halfWidth*3)
        {
            magic.x = gameWidth - halfWidth
        }
        else if (magic.x > gameWidth - halfWidth)
        {
            magic.x = -halfWidth*3
        }
    }

    // /**
    //  * Carries an magic
    //  * @param {Phaser.GameObjects.GameObject} magic The magic that will carry over
    //  */
    carryMagic(magic)
    {
        if(this.magic===null)
            this.magic = magic
        if (!this.carriesMagic)
        {
            // keeps save the magic
            /** @type {Phaser.Physics.Arcade.Image} */
            this.magic = magic
            this.magic.angle = 0
            this.magic.ensureRotationActivity()
            this.carriesMagic = true

            // disable from physics world
            this.scene.physics.world.disableBody(magic.body)

            // Recoge el magic y se lo añade a playerContainer (y lo coloca)
            this.add(magic)
            magic.setPosition(0 + this.player.width * 0 / 100, 0 - this.player.height * 5 / 100)
            magic.setOrigin(0)

            console.log('pick')
        }
    }

    heal(power)
    {
        this.health += power;
        if(this.health > this.maxHealth)
        {
            this.health = this.maxHealth
        }
        console.log("health" + this.health)
    }

    hurt()
    {
        if(this.canDamage)
        {
            this.health --;
            this.canDamage = false;
            console.log("health" + this.health)
            
            this.scene.UI.rewriteUI(this.scene.UI.place02, 'Lives: ' + this.health);

            this.timer = this.scene.time.addEvent({
                delay: 1000,
                callback: onEvent,
                callbackScope: this,
                loop: false
            });

            function onEvent() {
                this.canDamage = true;
            }

            //el jugador muere
            if(this.health < 1)
            {
                this.scene.handleGameLose();
            }
        }
    }
    dropMagic()
    {
        if (this.carriesMagic)
        {
            // registers the actual position relative to the player container
            let posX = this.x + this.body.width / 2;
            let posY = this.y - this.player.height * 10 / 100;
            if (this.player.flipX) {
                posX -= this.body.width * 95 / 100;
            } else {
                posX += this.body.width * 95 / 100;
            }

            // removes and deletes the first magic carried by the player container
            this.remove(this.getAt(1), true)

            // creates a new one in the same position
            this.magic = new Magic(this.scene, posX, posY);
            this.scene.addToScene(this.magic);
            this.magic.setOrigin(0.5,0.5);

            // reset physics
            this.scene.physics.world.enable(this.magic)
            this.magic.setVelocityY(-100)
            this.magic.toggleRotationActivity()

            if (this.player.flipX) {
                this.magic.setVelocityX(-75);
                this.magic.flipX = true;
                this.magic.setIncRot(5);
            } else {
                this.magic.setVelocityX(75);
                this.magic.flipX = false;
                this.magic.setIncRot(-5);
            }

            this.scene.time.delayedCall(100, () => {
                this.magic.toggleStopInertia()
            })

            // reset values
            this.carriesMagic = false

            console.log('drop')
        }
    }

    /**
     * Sets the basic controlls for the player (WASD)
     */
    setInputA() {
        // this.keys = this.input.keyboard.addKeys('W,S,A,D'); no funciona
        this.w = this.scene.input.keyboard.addKey('W');
        this.a = this.scene.input.keyboard.addKey('A');
        this.s = this.scene.input.keyboard.addKey('S');
        this.d = this.scene.input.keyboard.addKey('D');
        this.j = this.scene.input.keyboard.addKey('J');
        this.k = this.scene.input.keyboard.addKey('K');
        this.space = this.scene.input.keyboard.addKey('SPACE');
        // this.leftClick = this.scene.input.mousePointer.leftButtonDown;
        // this.rightClick = this.scene.input.mousePointer.rightButtonDown;
    }

    /**
     * Sets the basic controlls for the player (arrows)
     */
    setInputB() {
        // this.keys = this.input.keyboard.addKeys('W,S,A,D'); no funciona
        this.cursors = this.scene.input.keyboard.createCursorKeys()
        this.z = this.scene.input.keyboard.addKey('Z');
        this.x = this.scene.input.keyboard.addKey('X');
        this.space = this.scene.input.keyboard.addKey('SPACE');
        // this.leftClick = this.scene.input.mousePointer.leftButtonDown;
        // this.rightClick = this.scene.input.mousePointer.rightButtonDown;
    }
    
    changeMaxJumps(jumps){
        this.maxJumps = jumps;
    }
    attackinput() {
        //si ha pasado el cooldown se llama al método para atacar
        if (this.attackcooldown === true) {
          let dx = 0;
          this.attackcooldown = false;

          if (this.player.flipX) {
            this.attack.flipX = true;
            dx = -this.player.width / 4;
          }
          if (!this.player.flipX) {
            this.attack.flipX = false;
            dx = this.player.width / 3;
          }
          this.attack.enableBody(true, this.x + dx, this.y + this.player.height/3, true, true)
          this.attack.play('attack')

            

            //this.batSound.play(); //
            this.timer = this.scene.time.addEvent({
                delay: 500,
                callback: onEvent,
                callbackScope: this,
                loop: false
            });

            function onEvent() {
                this.attack.disable();
                this.attack.anims.pause()
                this.attackcooldown = true;
            }
        }
    }

}
