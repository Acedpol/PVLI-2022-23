import Character from './character.js';

export default class Potion extends Character
{
    /**
     * Constructor del objeto
     * @param {Phaser.Scene} scene Escena a la que pertenece
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     * @param {Phaser.Textures.Texture} texture Textura usada (image)
     */
    constructor(scene, x, y) 
    {
        super(scene, x, y, 'potiSprite');
        this.setScale(1);
    }

    preUpdate(t,dt) 
    {
        super.preUpdate(t,dt); // for animation and player detection
    }

    /** @override */
    effect()
    {
        this.playerContainer.player.heal(1);
        this.scene.sound.play('pick', this.scene.sfxConfig);   // sound feedback
        this.destroy();
    }

}