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
        this.canDamage = true;
    }

    preUpdate(t,dt) 
    {
        super.preUpdate(t,dt);  // for animation and player detection
        this.testDamages();

        if(this.health <= 0)
        {
            this.disableBody(true, true);
            this.destroy();
        }
    }

    /** @override */
    effect() {
        this.playerContainer.player.hurt(this.power);
    }
    
    testDamages() {
        if(this.playerContainer.player.attack) this.checkDamage(this.playerContainer.player.attack, 1);
        if(this.playerContainer.magic) this.checkDamage(this.playerContainer.magic, 3);
    }

    checkDamage(object, power){
        if (this.canDamage && this.scene.physics.overlap(object, this))  {
            let x = this.playerContainer.player.flipX; // booleano de si está girado o no
            this.setVelocity(x, -100);
            console.log("enemigo dañado");
            this.health -= power;
            this.canDamage = false;
            if (this.active) {
                this.timer = this.scene.time.addEvent({
                    delay: 500,
                    callback: damageTimer,
                    callbackScope: this
                });

                function damageTimer() {
                    this.canDamage = true;
                }
            }
        }
    }
}