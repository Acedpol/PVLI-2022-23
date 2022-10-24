/**
 * Clase del enemigo. En principio para la demo sólo va a atacar al jugador con el
 * contacto físico, pero el futuro se podrá dejar con los parámetros básicos y heredar 
 * los diferentes enemigos con distintos ataques y estadísticas.
 */

export default class Enemy extends Phaser.GameObjects.Sprite{
    /**
     * Constructor de enemigo
     * @param {Phaser.Scene} scene Escena del enemigo
     * @param {number} x Coordenada x
     * @param {number} y Coordenada y
     * @param {number} width Ancho
     * @param {number} height Alto
     * @param {spritesheet} spritesheet Spritesheet
     */

    constructor(scene, x, y, width, height, spritesheet){
        super(scene, x, y, width, height);
        this.scene.add.existing(this);
        this.scene = scene;
        this.spritesheet = spritesheet;
        this.speed = 300;
        this.play('wolf_walk');
    }

    /**
     * Método ir hacia el jugador (si lo toca le disminuye la vida)
     * @param {number} x_player
     */

    attackPlayer(x_player){
        let dir = x_player - x;
        if (dir > 0) this.body.setVelocityX(this.speed);
        else if (dir < 0) this.body.setVelocityX(-this.speed);
        else this.body.setVelocityX(0);
    }

    /**
     * Método que se encarga de las animaciones (las descritas aquí sirven
     * para el lobo con ataque físico)
     */
    animator(){
        this.scene.anims.create({
            key : 'wolf_running',
            frames : this.anims.generateFrameNumbers('wolf', {start: 12, end: 16}),
            frameRate: 10,
            repeat: -1 // Bucle de animación
        });
        this.scene.anims.create({
            key : 'wolf_idle',
            frames : this.anims.generateFrameNumbers('wolf', {start: 0, end : 5}),
            frameRate : 10,
            repeat: -1
        });
        this.scene.anims.create({
            key : 'wolf_walk',
            frames : this.anims.generateFrameNumbers('wolf', {start: 24, end : 35}),
            frameRate : 10,
            repeat: -1
        });
    }
}