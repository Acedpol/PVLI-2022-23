export default class Attack extends Phaser.Physics.Arcade.Sprite {
    /**
     * Constructor de Heal
     * @param {Scene} scene Escena en la que aparece el bate
     * @param {number} x coordenada x
     * @param {number} y coordenada y
     */
    constructor(scene, x, y) {
        super(scene, x, y, 'attack');
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.allowGravity = false;
        this.setScale(0.75);
    }
    preUpdate(t, dt) {
        super.preUpdate(t, dt);
    }

    disable(){
        this.disableBody(true, true);
    }
}