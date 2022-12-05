/**
 * Clase Entidad. Todas las entidades que pertenecen al entorno del juego,
 * que pueden moverse y que pueden cambiar su apariencia.
 */

export default class Entity extends Phaser.Physics.Arcade.Sprite
{
    /**
     * Constructor de enemigo
     * @param {Phaser.Scene} scene Escena del enemigo
     * @param {number} x Coordenada x
     * @param {number} y Coordenada y
     * @param {String} spritesheet Spritesheet
     * @param {number} n nº de frame dentro del spritesheet
     */
    constructor(scene, x, y, spritesheet, n = 0){
        super(scene, x, y, spritesheet, n);
        this.setOrigin(0.5);
    }

    preUpdate(t,dt) 
    {
        super.preUpdate(t,dt);  // for animation
    }

    /**
     * Atrapa horizontalmente esta entidad dentro de los límites del canvas.
     * Realiza el traslado dejando un margen de traspaso del 75%.
     */
    horizontalWrap()
    {
        const halfWidth = this.body.width * 0.25;
        const gameWidth = this.scene.scale.width;

        if (this.x < (-1) * halfWidth * 3)
        {
            this.x = gameWidth - halfWidth;
        }
        else if (this.x > gameWidth - halfWidth)
        {
            this.x = (-1) * halfWidth * 3;
        }
    }
    
}
