import Enemy from './enemy.js';
import Proyectile from './proyectile.js';
//import Trigger from './trigger.js';

export default class Guard extends Enemy {
    constructor(scene, x, y) {
        let stats = { health: 50, power: 1, speed: 40 };
        super(scene, x, y,'guardIdleSprite', 3, stats);
        this.play('guard_move');
        //this.play('guard_idle');
       // this.setOrigin(1);
        this.dir = 1;
        this.shooting = false;
        this.sleep = false;
        this.targeted = false;
    }

    preUpdate(t,dt) 
    {
        this.checkPlayer(this.playerContainer);
        super.preUpdate(t,dt) // for animation and player detection (¡puede ser destruido!)
        this.shoot();
    }

    /**
     * Método ir hacia el jugador (si lo toca le disminuye la vida)
     * @param {GameObject} target lo que persigue
     */

    checkPlayer(target){

        if(this.y + 50 > target.y  && this.y - 100 < target.y && this.canDamage)
        { 
            if(this.x+150 > target.x && this.x < target.x)
            {

                if(!this.targeted)
                {
                    this.sleep = false;
                    this.play('guard_wake');
                    this.targeted = true;
                    this.flipX = false
                    this.dir = 1;
                    
                    this.timer = this.scene.time.addEvent({
                        delay: 1000,
                        callback: onEvent,
                        callbackScope: this,
                        loop: false
                    });
                    
                    function onEvent() {
                        this.shooting = true;
                    }
                }
                
            }
            else if(this.x-150 < target.x && this.x > target.x)
            {

                if(!this.targeted)
                {
                    this.play('guard_wake');
                    this.targeted = true;
                    this.flipX = true
                    this.dir = -1;
                    
                    this.timer = this.scene.time.addEvent({
                        delay: 1000,
                        callback: onEvent,
                        callbackScope: this,
                        loop: false
                    });
                
                    function onEvent() {
                        this.shooting = true;
                    }
                }
            }
            else 
            {
                this.shooting = false;
                this.targeted = false;
                if(!this.sleep)
                {
                    this.play('guard_sleep');
                    this.sleep = true;
                }
            }
        }
        else if(this.targeted)
            this.targeted = false
    }
    shoot()
    {
        if(this.shooting && this.canDamage)
        {        
            this.shooting = false
            this.play('guard_charge')
            this.timer = this.scene.time.addEvent({
                delay: 800,
                callback: onEvent,
                callbackScope: this,
                loop: false
            });

            function onEvent() {
                if(this.canDamage)
                {
                    this.play('guard_shoot')
                    this.scene.addToScene(new Proyectile(this.scene, this.x+20*this.dir, this.y-5, this.dir), true);
                    
                    this.timer = this.scene.time.addEvent({
                    delay: 800,
                    callback: onEvent,
                    callbackScope: this,
                    loop: false
                    });
                    
                    function onEvent() {
                        //shoot
                        this.shooting = true;
                    }
                }
            }
        }
    }
    checkDamage(object, power){
        if (this.canDamage && this.scene.physics.overlap(object, this))  {
            let x = this.playerContainer.player.flipX; // booleano de si está girado o no
            if(x)
            x = -50;
            else x = 50;
            this.setVelocity(x, -100);
            console.log("enemigo dañado");
            this.health -= power;
            this.play('guard_damaged')
            this.canDamage = false;
            if (this.active) {
                this.timer = this.scene.time.addEvent({
                    delay: 1000,
                    callback: damageTimer,
                    callbackScope: this
                });

                function damageTimer() {
                    this.canDamage = true;
                    this.setVelocity(0, 0);
                }
            }
        }
    }

}