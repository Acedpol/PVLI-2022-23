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
        if(this.shooting && this.canBeDamaged)
        { 
            this.shoot();
        }
    }

    /**
     * Método ir hacia el jugador (si lo toca le disminuye la vida)
     * @param {GameObject} target lo que persigue
     */

    rangeCheck(target)
    {
        if(this.y + 50 > target.y  && this.y - 100 < target.y)
        {
            if((this.x+150 > target.x && this.x < target.x)||(this.x-150 < target.x && this.x > target.x))
            {
                return true;
            }
        }
        return false;
    }
    checkPlayer(target)
    {

        if(this.rangeCheck(target))
        { 
            if(!this.targeted  && this.canBeDamaged)
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



            // if(this.x+150 > target.x && this.x < target.x)
            // {

                
            // }
            // else if(this.x-150 < target.x && this.x > target.x)
            // {

            //     if(!this.targeted)
            //     {
            //         this.play('guard_wake');
            //         this.targeted = true;
            //         this.flipX = true
            //         this.dir = -1;
                    
            //         this.timer = this.scene.time.addEvent({
            //             delay: 1000,
            //             callback: onEvent,
            //             callbackScope: this,
            //             loop: false
            //         });
                
            //         function onEvent() {
            //             this.shooting = true;
            //         }
            //     }
            // }
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
                    this.shooting = true;
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