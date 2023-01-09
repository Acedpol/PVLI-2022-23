import GameObject from './gameObject.js';

export default class Arm extends GameObject
{

    /**
     * Constructor del objeto
     * @param {Phaser.Scene} scene Escena a la que pertenece el objeto
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     * @param {Phaser.Textures.Texture} texture Textura usada para (image)
     */
    constructor(scene, x, y) 
    {
        super(scene, x, y, 'brazoSprite');
        this.setDepth(3);
    }

    preUpdate(t,dt) 
    {
        super.preUpdate(t,dt) // for animation

    }
    effect()
    {
        this.playerContainer.player.setAttack();
        this.scene.sound.play('pick', this.scene.sfxConfig)   // sound feedback
        this.destroy()
    }
}