
export default class Object extends Phaser.Physics.Arcade.Sprite
{    /** @type {Phaser.Scene} */
        scene

    /**
     * Constructor del objeto combustible
     * @param {Phaser.Scene} scene Escena a la que pertenece el combustible
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     * @param {Phaser.Textures.Texture} texture Textura usada para el combustible (image)
     * @param {Playercontainer} container Jugador
     */
    constructor(scene, x, y, texture) 
    {
        super(scene, x, y, texture)
        this.scene = scene
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)

        // colisiona con los limites del mundo
        this.scene.physics.world.enable(this)
        this.setScale(0.5,0.5);
        this.body.collideWorldBounds = true
        this.container = this.scene.playerContainer
    }

    preUpdate(t,dt) 
    {
        super.preUpdate(t,dt) // for animation

        // checks if the player overlap with this GameObject
        if (this.scene.physics.overlap(this, this.container))
        {            
            this.effect();
        }
    }
    effect()
    {
        
    }
}