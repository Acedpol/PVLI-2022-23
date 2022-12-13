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
        this.target = this.playerContainer;
    }

    preUpdate(t,dt) 
    {
        this.checkPlayer();
        super.preUpdate(t,dt) // for animation and player detection (¡puede ser destruido!)
        if(this.shooting && this.canBeDamaged)
        { 
            this.shoot();
        }
    }

    /**
     * Método ir hacia el jugador (si lo toca le disminuye la vida)
     * @param {GameObject} target lo que persigue
     */

    rangeCheck()
    {
        if(this.y + 75 > this.target.y  && this.y - 125 < this.target.y)
        {
            if((this.x+175 > this.target.x && this.x < this.target.x)||(this.x-175 < this.target.x && this.x > this.target.x))
            {
                if(this.x < this.target.x)
                {
                    this.flipX = false
                    this.dir = 1
                }
                else
                {
                    this.flipX = true;                
                    this.dir = -1
                } 
                return true;
            }
        }
        return false;
    }
    checkPlayer()
    {

        if(this.rangeCheck())
        { 
            if(!this.targeted  && this.canBeDamaged && !this.shooting)
            {
                this.sleep = false;
                this.play('guard_wake');
                this.targeted = true;
                this.flipX = false
                this.dir = 1;
                
                this.timer = this.scene.time.addEvent({
                    delay: 800,
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
            this.targeted = false;
            if(!this.sleep)
            {
                this.play('guard_sleep');
                this.sleep = true;
            }
        }

    }
    shoot()
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
            if(this.canBeDamaged)
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
                    if(this.rangeCheck())
                        this.shooting = true;
                    else  
                    {
                        this.play('guard_sleep');
                        this.sleep = true;
                    }
                }
            }
        }
    }
    damageAnimation(){
        this.play('guard_damaged')
    }
    normalAnimation(){
        this.play('guard_wake')
    }
}