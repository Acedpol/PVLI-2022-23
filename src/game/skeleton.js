import Enemy from './enemy.js';

export default class Skeleton extends Enemy {
    constructor(scene, x, y, properties) {
        let stats = { health: 3, speed: 35 };
        super(scene, x, y,'skeletonWalkSprite', 0, stats);
        this.play('skeleton_walk', true);
        this.setOrigin(0,0.5)
        this.range = 30;
        this.startingPos = x;
        this.canMove = true;
        this.canAttack = true;
        this.attackOffset = 10;
        for (const { name, value } of properties) {
            if (name === 'patrol') {
                this.patrolRange = parseInt(value);


            }
            if(name === 'bloqueado')
                this.bloqueado = true;
        }
        
    }

    preUpdate(t,dt) 
    {
        this.move();
        super.preUpdate(t,dt) // for animation and player detection (¡puede ser destruido!)
    }

    move(){   
        if (!this.canMove || !this.canAttack) return;

        if (this.checkRange()) {
            this.attack();
        } else {
            this.play('skeleton_walk', true);
            this.checkPatrol();
            this.setVelocityX(this.speed*this.dir);
            this.body.width = 22;
        }
    }
    attack()
    {
        this.canAttack = false;
        this.play('skeleton_attack', true);
        this.setVelocityX(0);
        this.body.width = 43;
        if(this.flipX == true && this.checkRange())
        this.x-=this.attackOffset;

        this.timer = this.scene.time.addEvent({
            delay: 700,
            callback: attackTimer,
            callbackScope: this
        });
        
        function attackTimer() {
            this.body.width = 24;
            this.play('skeleton_idle', true);
            if(this.flipX == true)
            {
                this.x+=this.attackOffset;
            }


            this.timer = this.scene.time.addEvent({
                delay: 1000,
                callback: attackDelayTimer,
                callbackScope: this
            });

            function attackDelayTimer() {
                this.canAttack = true;

            }
        }

        


    }
    checkRange(){

        if((this.y-90 < this.target.y && this.y+20 > this.target.y) && (this.x-this.range < this.target.x && this.x+this.range + this.attackOffset > this.target.x))
        {
            if(this.canAttack)
            {

                if(this.target.x < this.x)
                {
                    this.dir = -1;
                    this.flipX = true;
                }
                else 
                {
                    this.dir = 1;
                    this.flipX = false;
                }
            }
            return true
        }
        return false;
    }
    checkPatrol()
    {
        if(this.x > this.startingPos + this.patrolRange)
        {
            this.dir = -1;
            this.flipX = true;
        }     
        else if(this.x < this.startingPos - this.patrolRange)
        {
            this.dir = 1;
            this.flipX = false;
        }
    }

    checkDamage(object){
        if (this.canBeDamaged && this.scene.physics.overlap(object, this))  {
            if(object === this.target.player.attack)
                this.health --;
            else if(object === this.target.magic)
                    this.health -=  2; 
            this.canBeDamaged = false;
            this.canMove = false;
            if(this.health > 0)
            {
                this.damageAnimation();
                let x;
                if(this.target.player.flipX)
                x = -25;
                else x = 25;
                this.setVelocity(x, -50);
                if (this.active) {

                    this.timer = this.scene.time.addEvent({
                        delay: 500,
                        callback: knockbackTimer,
                        callbackScope: this
                    });

                    function knockbackTimer() {
                        this.canMove = true;
                        this.normalAnimation();
                        this.setVelocity(0, 0);
                    }

                    this.timer = this.scene.time.addEvent({
                        delay: 700,
                        callback: damageTimer,
                        callbackScope: this
                    });
                    
                    function damageTimer() {
                        this.canBeDamaged = true;
                    }

                }
            }
            else 
            {
                this.setVelocityX(0);
                this.play('skeleton_dead')
                this.scene.sound.play('bone', this.scene.sfxConfig);
                this.timer = this.scene.time.addEvent({
                    delay: 1500,
                    callback: damageTimer1,
                    callbackScope: this
                });
                
                function damageTimer1() {
                    this.canBeDamaged = false;
                    this.disableBody(true, true);
                    this.destroy();
                }

            }
        }
    }

    damageAnimation(){
        this.play('skeleton_hit', true)
        this.scene.sound.play('bone', this.scene.sfxConfig);
    }
    normalAnimation(){
        this.play('skeleton_move', true)
    }
}