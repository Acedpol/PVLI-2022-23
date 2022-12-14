import Enemy from './enemy.js';

export default class Hound extends Enemy {
    constructor(scene, x, y) {
        let stats = { health: 1, speed: 50 };
        super(scene, x, y,'houndIdleSprite', 0, stats);
        this.play('wolf_idle');
        this.patrolRange = 45;
    }

    preUpdate(t,dt) 
    {
        this.move();
        super.preUpdate(t,dt) // for animation and player detection (¡puede ser destruido!)
    }

    
    move(){

        if(this.canBeDamaged)
        {

            if((this.y-90 < this.target.y && this.y+20 > this.target.y) && (this.x-200 < this.target.x && this.x+200 > this.target.x))
            {
                this.play('wolf_walk', true);
                
                if(this.x < this.target.x + this.patrolRange && this.dir === 1)
                {
                    this.setVelocityX(this.speed);
                    this.flipX = true
                }
                else if(this.x > this.target.x - this.patrolRange)
                {
                    this.dir = -1
                }
                if(this.x > this.target.x - this.patrolRange + 20 && this.dir === -1)
                {
                    this.setVelocityX(-this.speed);
                    this.flipX = false
                }
                else if(this.x < this.target.x + this.patrolRange+20)
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

}