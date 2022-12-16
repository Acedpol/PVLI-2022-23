import Character from './character.js';

export default class Wings extends Character
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
        super(scene, x, y, 'alasSprite');
        this.setScale(1);
    }

    preUpdate(t,dt) 
    {
        super.preUpdate(t,dt) // for animation

    }
    effect()
    {
        this.playerContainer.player.changeMaxJumps();
        this.scene.sound.play('pick', this.scene.sfxConfig)   // sound feedback
        this.destroy()
    }
}