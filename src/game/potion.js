import Object from './object.js'

export default class Potion extends Object
{

    /**
     * Constructor del objeto combustible
     * @param {Phaser.Scene} scene Escena a la que pertenece el combustible
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     * @param {Phaser.Textures.Texture} texture Textura usada para el combustible (image)
     */
    constructor(scene, x, y) 
    {
        super(scene, x, y, 'potiSprite', 0)
        this.scene = scene
    }

    preUpdate(t,dt) 
    {
        super.preUpdate(t,dt) // for animation

    }
    effect()
    {
        container.heal(3)
        this.scene.sound.play('pick')   // sound feedback
        this.destroy()
    }


}