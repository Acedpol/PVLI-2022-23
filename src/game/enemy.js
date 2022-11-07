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

    constructor(scene, x, y, spritesheet, n, p){
        super(scene, x, y, spritesheet, n);
        this.scene.physics.add.existing(this)
        this.body.setCollideWorldBounds();
        this.setOrigin(0.5)
        
        this.player = this.scene.playerContainer
        this.power = p;
        this.dir = 1;
        //this.spritesheet = spritesheet;
        this.speed = 50;
       // this.player.anims.pause()


    }
    playerColide()
    {
        if (this.scene.physics.overlap(this, this.player))
        {            
            this.player.hurt(this.power)
            //this.scene.sound.play('pick')   // sound feedback
        }  
    }
}