import Enemy from './enemy.js';

export default class Hound extends Enemy {
    constructor(scene, x, y) {
        let stats = { health: 1, power: 1, speed: 50 };
        super(scene, x, y,'houndIdleSprite', 0, stats);
        this.play('wolf_idle');
    }

    preUpdate(t,dt) 
    {
        this.move(this.playerContainer);
        super.preUpdate(t,dt) // for animation and player detection (¡puede ser destruido!)
    }

    /**
     * Método ir hacia el jugador (si lo toca le disminuye la vida)
     * @param {GameObject} target lo que persigue
     */

    move(target){

        if(this.y-90 < target.y || this.y-20 < target.y)
        {
            this.play('wolf_walk', true);

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
            this.play('wolf_idle', true);
            this.setVelocityX(0);
        }   

    }

}