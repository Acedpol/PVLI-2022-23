/**
 * Clase Entidad. Todas las entidades que pueden potencialmente dañar al jugador. De momento tanto los enemigos como los pinchos
 * heredan de esta clase, ya que necesitan tener puntero del jugador
 */

export default class Entity extends Phaser.Physics.Arcade.Sprite{
    /**
     * Constructor de enemigo
     * @param {Phaser.Scene} scene Escena del enemigo
     * @param {number} x Coordenada x
     * @param {number} y Coordenada y
     * @param {number} width Ancho
     * @param {number} height Alto
     * @param {spritesheet} spritesheet Spritesheet
     * @param {playerContainer} player container
     */

    constructor(scene, x, y, spritesheet, n){
        super(scene, x, y, spritesheet, n);
        this.scene.physics.add.existing(this)
        this.body.setCollideWorldBounds();
        this.setOrigin(0.5)       
        this.player = this.scene.playerContainer


    }
    playerCollide()
    {
        if (this.scene.physics.overlap(this, this.player))
        {            
            this.player.hurt(this.power)
            //this.scene.sound.play('pick')   // sound feedback
        }  
    }
}