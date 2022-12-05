/**
 * Clase Character. Todas las entidades que pueden potencialmente interactuar con el jugador. 
 * De momento tanto los enemigos como los pinchos heredan de esta clase, 
 * ya que necesitan tener puntero del jugador.
 */

import Entity from "./entity.js";

export default class Character extends Entity
{
    /**
     * Constructor de enemigo
     * @param {Phaser.Scene} scene Escena del enemigo
     * @param {number} x Coordenada x
     * @param {number} y Coordenada y
     * @param {String} spritesheet Spritesheet key at boot
     * @param {number} n nº de frame dentro del spritesheet
     */
    constructor(scene, x, y, spritesheet, n = 0){
        super(scene, x, y, spritesheet, n);
        this.playerContainer = this.scene.playerContainer;
    }

    preUpdate(t,dt) 
    {
        super.preUpdate(t,dt);  // for animation
        this.playerCollide();   // detect player
    }

    /** @template */
    effect() {};

    /**
     * Detecta al jugador y si colisiona con él.
     * Si colisiona ejecuta un método modificable.
     */
    playerCollide()
    {
        if (this.scene.physics.overlap(this, this.playerContainer))
        {
            this.effect();
        }
    }
}
