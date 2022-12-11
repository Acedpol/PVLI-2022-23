import Character from './character.js';

export default class Arm extends Character
{

    /**
     * Constructor del objeto combustible
     * @param {Phaser.Scene} scene Escena a la que pertenece el objeto
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     * @param {Phaser.Textures.Texture} texture Textura usada para el combustible (image)
     */
    constructor(scene, x, y) 
    {
        super(scene, x, y, 'brazoSprite');
        this.setScale(1);
    }

    preUpdate(t,dt) 
    {
        super.preUpdate(t,dt) // for animation

    }
    effect()
    {
        this.playerContainer.player.canDamaged(true);
        this.scene.sound.play('pick')   // sound feedback
        this.destroy()
    }
}