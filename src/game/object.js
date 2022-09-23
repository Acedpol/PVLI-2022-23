import PlayerContainer from './playerContainer.js'

export default class Object extends Phaser.Physics.Arcade.Image
{
    /** @type {Phaser.Scene} */
    scene

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
        // this.scene.physics.add.existing(this)
        this.scene.physics.world.enable(this)

        console.log('new object x:' + x + ', y:' + y + ', texture:' + texture) // print info

        // set active and visible
        this.setActive(true)
        this.setVisible(true)
 
        // colisiona con los limites del mundo
        this.body.collideWorldBounds = true
    }

    preUpdate(t,dt) 
    {
        /** @type {PlayerContainer} */
        let container = this.scene.playerContainer

        // checks if the player overlap with this GameObject
        if (this.scene.physics.overlap(this, container))
        {            
            container.carryObject(this)
            this.scene.sound.play('pick')   // sound feedback
        }
    }

}