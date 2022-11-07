import Enemy from './enemy.js';
/**
 * Clase del enemigo. En principio para la demo sólo va a atacar al jugador con el
 * contacto físico, pero el futuro se podrá dejar con los parámetros básicos y heredar 
 * los diferentes enemigos con distintos ataques y estadísticas.
 */

export default class Hound extends Enemy{
    /**
     * Constructor de enemigo
     * @param {Phaser.Scene} scene Escena del enemigo
     * @param {number} x Coordenada x
     * @param {number} y Coordenada y
     * @param {number} width Ancho
     * @param {number} height Alto
     * @param {number} power daño al jugador
     * @param {spritesheet} spritesheet Spritesheet
     * @param {playerContainer} player container
     */

    constructor(scene, x, y){
        super(scene, x, y,'houndIdleSprite', 0, 3);
        this.play('wolf_idle');        
        this.player = this.scene.playerContainer
        this.dir = 1;
        this.speed = 50;     
        this.play('wolf_idle');
    }

    preUpdate(t,dt) 
    {
        super.preUpdate(t,dt) // for animation

        this.move()

        super.playerColide();
        
    }

    /**
     * Método ir hacia el jugador (si lo toca le disminuye la vida)
     * @param {number} x_player
     */

    move(){

        if(this.y-90 < this.player.y || this.y-20 < this.player.y)
        {
            if (this.anims.currentAnim.key != 'wolf_walk')
            {
                this.play('wolf_walk')
            }
            if(this.x < this.player.x + 50 && this.dir === 1)
            {
                this.body.setVelocityX(this.speed);
                this.flipX = true
            }
            else if(this.x > this.player.x - 50)
            {
                this.dir = -1
            }
            if(this.x > this.player.x - 50 && this.dir === -1)
            {
                this.body.setVelocityX(-this.speed);
                this.flipX = false
            }
            else if(this.x < this.player.x + 50)
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
            //this.player.anims.pause()
            this.body.setVelocityX(0);
        }   

    }

}