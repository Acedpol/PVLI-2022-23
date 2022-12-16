import Character from './character.js'

export default class Magic extends Character
{
    /** @type {boolean} */  stop
    /** @type {boolean} */  onRotation
    /** @type {Number} */   incRot

    /**
     * Constructor del objeto combustible
     * @param {Phaser.Scene} scene Escena a la que pertenece el combustible
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     * @param {Phaser.Textures.Texture} texture Textura usada para el combustible (image)
     */
    constructor(scene, x, y) 
    {
        super(scene, x, y, 'aureolaSprite', 3)
        this.stop = false;
        this.rotation = false;
        this.incRot = 0;
        this.setScale(0.5);

        //variable de daño
        this.damage = false;

        // set active and visible
        this.setActive(true);
        this.setVisible(true);
    }

    preUpdate(t,dt) 
    {
        super.preUpdate(t,dt) // for animation
        this.playerFlipDetect();

        if (this.stop) {
            this.stopInertia();
        }
        if (this.onRotation) {
            this.angle += this.incRot;
        }
    }

    /** @override */
    effect()
    {
        this.playerContainer.carryMagic(this, false);
        this.scene.sound.play('pick', this.scene.sfxConfig);
    }

    playerFlipDetect() {
        if (this.playerContainer.carriesMagic) {
            if (this.playerContainer.player.flipX) {
                this.flipX = true;
            } else {
                this.flipX = false;
            }
        }
    }

    /** @listens */
    onStop() { this.stop = true; };
    offStop() { this.stop = false; };

    setIncRot(inc) {
        this.incRot = inc;
    }

    toggleRotation() {
        this.onRotation = !this.onRotation;
    }
    stopRotation() {
        this.onRotation = false;
    }

    stopInertia() {
        if (this.stop && this.body.velocity.y == 0 && this.body.onFloor()) {
            this.offStop();
            this.damage = false;
            this.scene.sound.play('player_magic', this.scene.sfxConfig);
            this.stopRotation();
            this.scene.time.delayedCall(250, () => {
                this.setVelocityX(0);
            });
        }
    }
    
    canDamage()
    {
        return this.damage;
    }

}