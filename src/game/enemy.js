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
        this.health = stats.health;
        this.power = stats.power;
        this.speed = stats.speed;
        this.canBeDamaged = true;
    }

    preUpdate(t,dt) 
    {
        super.preUpdate(t,dt);  // for animation and player detection
        this.testDamages();

    }

    /** @override */
    effect() {
        this.playerContainer.player.hurt();
    }
    
    testDamages() {
        if(this.playerContainer.player.attack)
         this.checkDamage(this.playerContainer.player.attack);
        if(this.playerContainer.magic && this.playerContainer.magic.damage) 
            this.checkDamage(this.playerContainer.magic);
    }

    checkDamage(object){
        if (this.canBeDamaged && this.scene.physics.overlap(object, this))  {
            console.log("enemigo dañado");
            this.health --;
            this.canBeDamaged = false;
            this.damageAnimation();
            let x;
            if(this.playerContainer.player.flipX)
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