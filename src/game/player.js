import Attack from "./attack.js"
import Entity from "./entity.js";

/** @type {Phaser.GameObjects.GameObject} */
export default class PlayerLogic extends Entity
{
    /**
     * Constructor del container del jugador
     * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     * @param {spritesheet} spritesheet Spritesheet
     * @param {number} n nº de frame dentro del spritesheet
     * @param {struct} args parámetros de juego
     */
    constructor(scene, x, y, spritesheet, n, args)
    {
        super(scene, x, y, spritesheet, n);

        // vida
        this.health = 9;
        this.maxHealth = 9;

        // animación inicial pausada
        this.play('walk');
        this.anims.pause();

        // eventos de teclado
        this.optA = args.optA;
        this.optA ? this.setInputA() : this.setInputB(); 

        // variables de movimiento
        this._speed = 100;
        this.groundCheck = false;
        this.velocity = { x: 0, y: 0 };

        // variables de control de saltos
        this.maxJumps = 1;
        this.nextJump = this.scene.time.now;
        this.allowedJumps = this.maxJumps;

        // booleanno para saber si puede ser dañado
        this.canBeDamaged = true;

        // attack gameObject (mechanic: enable and disable)
        this.attack = new Attack(this.scene, 155, 150);
    }

    /** @async */
    update(groundCheck, dt) {
        this.checkInput();
        this.groundDetect(groundCheck, dt);
        this.playerController(groundCheck);
        this.playerAnimation(groundCheck);
    }

    setContainer(container) { this.container = container; }

    groundDetect(groundCheck, dt) {
        // ground detection logic
        if (groundCheck){
            this.allowedJumps = this.maxJumps;
            this.velocity.y = 0;
        } else {
            this.velocity.y = this.velocity.y + this.scene.physics.config.gravity.y * dt / 1000;
        }
    }

    playerAnimation(groundCheck) {
        // walk animation
        if (groundCheck)
        {
            if (this.left || this.right) {
                // resume animation
                this.play('walk', true);
                this.anims.resume();
            }
            else {
                // initial animation pause
                this.play('walk', true);
                this.anims.pause();
            }            
        }

        // flying animation
        if (!groundCheck)
        {
            // start animation
            this.play('jump', true);
        }
    }

    checkInput() {
        this.left = this.optA ? this.a.isDown : this.cursors.left.isDown;
        this.right = this.optA ? this.d.isDown : this.cursors.right.isDown;
        this.up = this.optA ? this.w.isDown : this.cursors.up.isDown;
        this.down = this.optA ? this.s.isDown : this.cursors.down.isDown;
        this.shoot_A = this.optA ? this.j.isDown : this.z.isDown;
        this.shoot_B = this.optA ? this.k.isDown : this.cx.isDown;
        this.action = this.space.isDown;
    }

    playerController()
    {
        // move input
        if (this.left)
        {
            // this.setVelocityX(-80);
            this.velocity.x = -80;
            this.flipX = true;
        }
        else if (this.right)
        {
            // this.setVelocityX(80);
            this.velocity.x = 80;
            this.flipX = false;
        }
        else
        {
            // this.setVelocityX(0);
            this.velocity.x = 0;
        }

        // jump input
        if (this.allowedJumps > 0 && this.up && this.nextJump < this.scene.time.now)
        {
            this.allowedJumps--;
            console.log(this.allowedJumps);
            // this.setVelocityY(-190);
            this.velocity.y = -190;
            this.nextJump = this.scene.time.now + 500;
        }

        // habilities input
        if (this.shoot_A) {
            this.spell_attack();
        }

        if (this.shoot_B){
            if (this.container) this.container.dropMagic();
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
        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.z = this.scene.input.keyboard.addKey('Z');
        this.cx = this.scene.input.keyboard.addKey('X'); // !!! cuidado con this.x !!!
        this.space = this.scene.input.keyboard.addKey('SPACE');
        // this.leftClick = this.scene.input.mousePointer.leftButtonDown;
        // this.rightClick = this.scene.input.mousePointer.rightButtonDown;
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

    hurt(power)
    {
        if (this.canBeDamaged)
        {
            this.health -= power;
            this.canBeDamaged = false;
            console.log("health" + this.health)

            this.timer = this.scene.time.addEvent({
                delay: 1000,
                callback: onEvent,
                callbackScope: this,
                loop: false
            });

            function onEvent() {
                this.canBeDamaged = true;
                console.log("now player can be damage again!");
            }

            // el jugador muere
            if (this.health < 1)
            {
                this.scene.handleGameLose(); // <<<
            }
        }
    }

    spell_attack() {
        // si ha pasado el cooldown se llama al método para atacar
        if (this.attack.cooldown === true) 
        {
            // calcula la nueva posición
            let dx = 0;

            if (this.flipX) {
                this.attack.flipX = true;
                dx = -this.width / 4;
            }
            if (!this.flipX) {
                this.attack.flipX = false;
                dx = this.width / 3;
            }

            // activa body y sprite 
            this.attack.enable(this.x + dx, this.y + this.height / 3);
        }
    }

    changeMaxJumps(jumps){
        this.maxJumps = jumps;
    }


}