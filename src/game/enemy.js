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
     * @param {spritesheet} spritesheet Spritesheet
     */

    constructor(scene, x, y, spritesheet, n){
        super(scene, x, y, spritesheet, n);
        this.scene.physics.add.existing(this)
        this.body.setCollideWorldBounds();
        console.log('enemy spawned') // print info
        
        //this.spritesheet = spritesheet;
        //this.speed = 300;
        
        this.play('wolf_idle');
       // this.player.anims.pause()


    }

    /**
     * Método ir hacia el jugador (si lo toca le disminuye la vida)
     * @param {number} x_player
     */

    // attackPlayer(x_player){
    //     let dir = x_player - x;
    //     if (dir > 0) this.body.setVelocityX(this.speed);
    //     else if (dir < 0) this.body.setVelocityX(-this.speed);
    //     else this.body.setVelocityX(0);
    // }

}