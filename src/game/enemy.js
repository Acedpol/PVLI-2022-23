/**
 * Clase del enemigo. En principio para la demo sólo va a atacar al jugador con el
 * contacto físico, pero el futuro se podrá dejar con los parámetros básicos y heredar 
 * los diferentes enemigos con distintos ataques y estadísticas.
 */

export default class Enemy extends Phaser.Physics.Arcade.Sprite{
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

    constructor(scene, x, y, spritesheet, n){
        super(scene, x, y, spritesheet, n);
        this.scene.physics.add.existing(this)
        this.body.setCollideWorldBounds();
        this.setOrigin(0.5)
        
        this.player = this.scene.playerContainer
        this.power = 2;

        //this.spritesheet = spritesheet;
        this.speed = 200;
        
        this.play('wolf_idle');
       // this.player.anims.pause()


    }

    preUpdate(t,dt) 
    {
        super.preUpdate(t,dt) // for animation


        //this.move()

        // checks if the player overlap with this GameObject
        if (this.scene.physics.overlap(this, this.player))
        {            
            this.player.hurt(power)
            //this.scene.sound.play('pick')   // sound feedback
        }
        
    }

    /**
     * Método ir hacia el jugador (si lo toca le disminuye la vida)
     * @param {number} x_player
     */

    move(x_player){

        if(this.y < player.y)
        {

        }





        let dir = x_player - x;
        if (dir > 0) this.body.setVelocityX(this.speed);
        else if (dir < 0) this.body.setVelocityX(-this.speed);
        else this.body.setVelocityX(0);
    }

}