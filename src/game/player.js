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
        this.play('walk0');
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
        this.allowedJumps = 0; // this.maxJumps;

        // booleanno para saber si puede ser dañado
        this.canBeDamaged = true;
        this.canMove = true;
        this.canAttack = true;

        //booleanos de contol de powerUps
        this.attackPowerUp = false;
        this.wingPoweUp = false;
        this.crownPowerUp = false;


    }

    
    /** @async */
    update(groundCheck, dt) {
        if(this.canMove)
        {
            this.groundDetect(groundCheck, dt);
            this.checkInput();
            this.playerController();
            this.playerAnimation(groundCheck);
        }
    }
    
    /** @async */
    setAttack() {
        // - attack - (implementation: enable and disable)
        this.attack = this.scene.addToScene(new Attack(this.scene, 155, 150), true);
        this.last_attack = this.scene.time.now;
        this.cd_attack = 600;
        this.attack.init();
        this.attackPowerUp = true;
    }

    changeMaxJumps(){
        this.setAttack();
        this.maxJumps = 2;
        this.wingPoweUp = true;
        if(!this.attackPowerUp)
        this.setAttack();

    }

    setMagic() {
        if(!this.crownPowerUp)
        this.crownPowerUp = true;
        if(!this.attackPowerUp)
        this.setAttack()
        if(!this.wingPoweUp)
        this.changeMaxJumps();
    }

    checkPowerUps()
    {
        let p = 0;

        if(this.attackPowerUp)
        p++;
        if(this.wingPoweUp)
        p++
        if(this.crownPowerUp)
        p++

        return p;
    }

    setContainer(container) { this.container = container; }

    groundDetect(groundCheck, dt) {
        // ground detection logic
        if (groundCheck) {
            this.allowedJumps = this.maxJumps;
            if (this.scene.UI.initP) this.scene.UI.jumps.reset(this.allowedJumps, 'jumpBar'); // UI
            this.velocity.y = 0;
        } else {
            this.velocity.y = this.velocity.y + this.scene.physics.config.gravity.y * dt / 1000;
        }
    }

    playerAnimation(groundCheck) {
        // walk animation
        if(this.canAttack)
        {

            if (groundCheck)
            {
                if (this.left || this.right) {
                    // resume animation
                    this.play('walk'+this.checkPowerUps(), true);
                    this.anims.resume();
                }
                else {
                    // initial animation pause
                    this.play('walk'+this.checkPowerUps(), true);
                    this.anims.pause();
                }            
            }
            
            // flying animation
            if (!groundCheck)
            {
                // start animation
                this.play('jump'+this.checkPowerUps(), true);
            }
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
            if (this.scene.UI.initP) this.scene.UI.jumps.deleteLast(); // UI
            // console.log('allowed jumps: ' + this.allowedJumps);
            // this.setVelocityY(-190);
            this.velocity.y = -190;
            this.nextJump = this.scene.time.now + 500;
        }

        // habilities input
        if (this.shoot_A && this.attackPowerUp) {
            this.spell_attack();
            console.log('attack!');
        } 

        if (this.shoot_B) {
            if (this.container) this.container.dropMagic();
        }

        if(this.cd_attack < this.scene.time.now - this.last_attack && this.canAttack === false)
            this.canAttack = true;
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
            if (this.scene.UI.initP) this.scene.UI.lives.reset(this.health, 'lifeSpr'); // UI
        }
        else {
            if (this.scene.UI.initP) this.scene.UI.lives.addObjects(power, 'lifeSpr'); // UI
        }
        console.log("health" + this.health)
    }

    hurt()
    {
        if (this.canBeDamaged)
        {
            this.health --;
            this.canBeDamaged = false;
            this.canMove = false;
            if (this.scene.UI.initP) this.scene.UI.lives.deleteObjects(1);
            this.velocity.x = 0;
            if(this.health > 0)
            {
                this.play('hit'+this.checkPowerUps(), true)
                this.scene.sound.play('player_hit', this.scene.sfxConfig);
                let x;
                if(this.flipX)
                x = 35;
                else x = -35;

                this.velocity.y = -45;
                this.velocity.x = x;
                this.timer = this.scene.time.addEvent({
                    delay: 200,
                    callback: knockbackTimer,
                    callbackScope: this
                });

                function knockbackTimer() {
                    this.canMove = true;
                }

                this.timer = this.scene.time.addEvent({
                    delay: 1000,
                    callback: damageTimer,
                    callbackScope: this
                });
                
                function damageTimer() {
                    this.canBeDamaged = true;
    
                }
            }
            else 
            {
                this.velocity.x = 0;
                if(this.velocity.y < 0)
                this.velocity.y = -this.velocity.y;
                this.scene.sound.play('player_dead', this.scene.sfxConfig);
                this.play('death'+this.checkPowerUps(), true)
                this.timer = this.scene.time.addEvent({
                    delay: 2000,
                    callback: damageTimer1,
                    callbackScope: this
                });
                
                function damageTimer1() {
                    this.scene.handleGameLose();
                }

            }
        }
    }

    spell_attack() {
        // si ha pasado el cooldown se llama al método para atacar
        if (!this.attack.locked && this.cd_attack < this.scene.time.now - this.last_attack) // antes, 'cooldown === true'
        {
            this.scene.sound.play('player_attack', this.scene.sfxConfig);
            this.canAttack = false;
            this.play('attack'+this.checkPowerUps(), true)
            // calcula la nueva posición
            let dx = this.container.x; 
            let dy = this.container.y;

            if (this.flipX) {
                this.attack.flipX = true;
                dx += -this.container.player.width / 4;
            }
            if (!this.flipX) {
                this.attack.flipX = false;
                dx += this.container.player.width / 3;
            }
            dy += this.container.player.height / 3;

            // posiciona, activa body y sprite 
            this.attack.enable(dx, dy);

            // timer
            this.last_attack = this.scene.time.now;
        }
    }
}