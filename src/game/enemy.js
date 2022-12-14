/**
 * Clase del enemigo. En principio para la demo sólo va a atacar al jugador con el
 * contacto físico, pero el futuro se podrá dejar con los parámetros básicos y heredar 
 * los diferentes enemigos con distintos ataques y estadísticas.
 */

import Character from './character.js';

export default class Enemy extends Character {


    constructor(scene, x, y, spritesheet, n, stats){
        super(scene, x, y, spritesheet, n);     
        this.dir = 1;
        this.target = this.playerContainer;
        this.health = stats.health;
        this.speed = stats.speed;
        this.canBeDamaged = true;


        this.target = this.playerContainer;
        this.magic_ = this.playerContainer.magic
        this.enemy
    }

    preUpdate(t,dt) 
    {
        super.preUpdate(t,dt);  // for animation and player detection
        this.testDamages();

    }

    /** @override */
    effect() {
        if(this.canBeDamaged)
            this.target.player.hurt();
    }
    
    testDamages() {
        if(this.target.player.attack)
        {
            this.checkDamage(this.target.player.attack);
            this.power = 1;
        }
        if(this.target.magic && this.target.magic.damage) 
        {
            this.checkDamage(this.target.magic);
            this.power = 2;
        }
    }

    checkDamage(object){
        if (this.canBeDamaged && this.scene.physics.overlap(object, this))  {
            console.log("enemigo dañado");
            if(object === this.target.player.attack)
                this.health --;
            else if(object === this.target.magic)
                this.health -=  2;            
            this.canBeDamaged = false;
            this.damageAnimation();
            let x;
            if(this.target.player.flipX)
            x = -35;
            else x = 35;
            this.setVelocity(x, -75);
            if (this.active) {
                this.timer = this.scene.time.addEvent({
                    delay: 700,
                    callback: damageTimer,
                    callbackScope: this
                });

                function damageTimer() {
                    this.canBeDamaged = true;
                    this.normalAnimation();
                    this.setVelocity(0, 0);
                    
                    if(this.health <= 0)
                    {
                        this.disableBody(true, true);
                        this.destroy();
                    }
                }
            }
        }
    }
    damageAnimation(){};
    normalAnimation(){};
}