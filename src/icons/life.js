import Entity from "../game/entity.js";

export default class Life extends Entity
{
    /**
     * Constructor de enemigo
     * @param {Phaser.Scene} scene Escena del enemigo
     * @param {number} x Coordenada x
     * @param {number} y Coordenada y
     */
    constructor(scene, x, y)
    {
        super(scene, x, y, 'object');
    }

    preUpdate(t,dt) 
    {
        super.preUpdate(t,dt);  // for animation
    }
}
