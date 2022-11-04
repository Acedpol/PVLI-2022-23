import PlayerContainer from './playerContainer.js'

export default class Object extends Phaser.Physics.Arcade.Sprite
{
    /**
     * Constructor del objeto combustible
     * @param {Phaser.Scene} scene Escena a la que pertenece el combustible
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     * @param {Phaser.Textures.Texture} texture Textura usada para el combustible (image)
     */
    constructor(scene, x, y, texture) 
    {
        super(scene, x, y, texture)
        this.scene = scene
        this.scene.add.existing(this)

        // colisiona con los limites del mundo
        this.scene.physics.world.enable(this)
        this.setScale(0.5,0.5);
        this.body.collideWorldBounds = true
    }

    preUpdate(t,dt) 
    {
        super.preUpdate(t,dt) // for animation

        let container = this.scene.playerContainer

        // checks if the player overlap with this GameObject
        if (this.scene.physics.overlap(this, container))
        {            
            this.effect();
        }
    }
    effect()
    {
        
    }
}