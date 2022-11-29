import Magic from "./magic.js"
import PlayerLogic from "./player.js";

/** @type {Phaser.GameObjects.GameObject} */
export default class PlayerContainer extends Phaser.GameObjects.Container
{
    /**
     * Constructor del container del jugador
     * @param {Phaser.Scene} scene escena a la que pertenece
     * @param {Number} x horizontal position
     * @param {Number} y vertical position
     * @param {Phaser.GameObjects.Sprite} sprite representación principal (no es un hijo)
     */
    constructor(scene, x, y, sprite)
    {
        // Constructor del container //
        super(scene, x, y, sprite);

        // variables de animación de la cabeza
        this.xHead = 0;
        this.yHead = 0;

        // magia (hijo, se adhiere)
        this.magic = null;
        this.carriesMagic = false;
    }    

    /**
     * Añade al jugador de forma asincrona
     * @param {PlayerLogic} playerLogic Sprite que representa al jugador
     */
    addPlayer(playerLogic) {
        
        // ajustes del jugador
        this.player = playerLogic;
        this.player.setContainer(this);
        this.player.setOrigin(0.4275,0.3275);
        this.player.setScale(0.75, 0.75);

        // ...this init!!
        this.setPlayer();
    }

    setPlayer() {
        this.player.setHabilities()
        this.body.setSize(this.player.width * 11 / 100, this.player.height * 48 / 100);
        console.log('player + container = playerContainer!');
    }

    preUpdate(t,dt)
    {
        this.iterate( (child) => child.preUpdate(t,dt) ) // for animations

        // revisar si esta en contacto con el suelo y recargar salto
        this.groundCheck = this.body.onFloor();

        // player logic update
        this.player.update(this.groundCheck, dt);

        // player container update
        let vel = this.player.velocity;
        this.body.setVelocity(vel.x, vel.y);
        this.headAnimation();

        // UI
        this.scene.UI.rewriteUI(this.scene.UI.place01, 'Allowed jumps: ' + this.player.allowedJumps + "/" + this.player.maxJumps);
        this.scene.UI.rewriteUI(this.scene.UI.place02, 'Lives: ' + this.player.health);
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

    // /**
    //  * Carries an magic
    //  * @param {Phaser.GameObjects.GameObject} magic The magic that will carry over
    //  */
    carryMagic(magic)
    {
        if (!this.carriesMagic)
        {
            // keeps save the magic
            /** @type {Phaser.Physics.Arcade.Sprite} */
            this.magic = magic; // <---
            this.magic.angle = 0;
            this.magic.stopRotation();
            this.carriesMagic = true;

            // disable from physics world
            this.scene.physics.world.disableBody(magic.body)

            // Recoge el magic y se lo añade a playerContainer (y lo coloca)
            this.add(magic)
            magic.setPosition(0 + this.player.width * 0 / 100, 0 - this.player.height * 5 / 100)
            magic.setOrigin(0)

            console.log('pick')
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
            this.remove(this.getAt(1), true);

            // creates a new one in the same position
            this.magic = this.scene.addToScene(new Magic(this.scene, posX, posY), true); // --->
            this.scene.addToScene(this.magic);
            this.magic.setOrigin(0.5,0.5);

            // reset physics
            this.scene.physics.world.enable(this.magic)
            this.magic.setVelocityY(-100)
            this.magic.toggleRotation()

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
                this.magic.onStop();
            })

            // reset values
            this.carriesMagic = false

            console.log('drop')
        }
    }
}
