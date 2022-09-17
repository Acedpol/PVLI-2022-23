import PlayerContainer from './playerContainer.js'

export default class SpaceShip extends Phaser.Physics.Arcade.Image
{
    /** @type {Phaser.Scene} */
    scene

    /** @type {Boolean} */
    lista

    /**
     * Constructor del objeto combustible
     * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     * @param {Phaser.Textures.Texture} texture Textura usada en el jugador (spritesheet)
     */
    constructor(scene, x, y, texture) 
    {
        super(scene, x, y, texture)
        this.scene = scene
        this.scene.add.existing(this)
        // this.scene.physics.add.existing(this)
        this.scene.physics.world.enable(this)

        console.log('new spaceShip x:' + x + ', y:' + y + ', texture:' + texture) // print info

        // set active and visible
        this.setActive(true)
        this.setVisible(true)
 
        // colisiona con los limites del mundo
        this.body.collideWorldBounds = true
    }

    preUpdate(t,dt) 
    {
        /** @type {PlayerContainer} */
        let player = this.scene.playerContainer

        // checks if the player overlap with this GameObject
        if (player.carriesObject && this.scene.physics.overlap(this, player))
        {
            player.dropObject()
            this.scene.sound.play('drop')   // sound feedback
        }
    }

}