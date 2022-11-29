/**
 * Clase del enemigo. En principio para la demo sólo va a atacar al jugador con el
 * contacto físico, pero el futuro se podrá dejar con los parámetros básicos y heredar 
 * los diferentes enemigos con distintos ataques y estadísticas.
 */

import Enemy from './enemy.js';

export default class Hound extends Enemy {
    constructor(scene, x, y) {
        let stats = { health: 1, power: 1, speed: 50 };
        super(scene, x, y,'houndIdleSprite', 0, stats);
        this.play('wolf_idle');
    }

    preUpdate(t,dt) 
    {
        super.preUpdate(t,dt) // for animation and player detection
        this.move(this.playerContainer);
    }

    /**
     * Método ir hacia el jugador (si lo toca le disminuye la vida)
     * @param {GameObject} target lo que persigue
     */

    move(target){

        if(this.y-90 < target.y || this.y-20 < target.y)
        {
            if (this.anims.currentAnim.key != 'wolf_walk')
            {
                this.play('wolf_walk')
            }
            if(this.x < target.x + 50 && this.dir === 1)
            {
                this.setVelocityX(this.speed);
                this.flipX = true
            }
            else if(this.x > target.x - 50)
            {
                this.dir = -1
            }
            if(this.x > target.x - 50 && this.dir === -1)
            {
                this.setVelocityX(-this.speed);
                this.flipX = false
            }
            else if(this.x < target.x + 50)
            {
                this.dir = 1
            }
        }
        else
        {
            if (this.anims.currentAnim.key != 'wolf_idle')
            {
                this.play('wolf_idle')
            }
            
            this.setVelocityX(0);
        }   

    }

}