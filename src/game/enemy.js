import Entity from './entity.js';
/**
 * Clase del enemigo. En principio para la demo sólo va a atacar al jugador con el
 * contacto físico, pero el futuro se podrá dejar con los parámetros básicos y heredar 
 * los diferentes enemigos con distintos ataques y estadísticas.
 */

export default class Enemy extends Entity{


    constructor(scene, x, y, spritesheet, n, health, speed){
        super(scene, x, y, spritesheet, n);     
        this.dir = 1;
        this.health = health
        this.speed = speed;
        this.canDamage = true
    }
    preUpdate(t,dt) 
    {
        super.preUpdate(t,dt) // for animation
        this.damage()
        
    }
    damage() {
        if (this.canDamage && this.scene.physics.overlap(this.player.attack, this))  {
            console.log("enemigo dañado")
            this.health -= 1;
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
        else if(this.player.magic !== null)
        {if (this.canDamage && this.scene.physics.overlap(this.player.magic, this))  {

            this.health -= 3;
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
        }}
    }
}