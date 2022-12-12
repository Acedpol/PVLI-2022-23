import Character from './character.js';
export default class Proyectile extends Character {
    /**
     * Constructor de Heal
     * @param {Scene} scene Escena en la que aparece el bate
     * @param {number} x coordenada x
     * @param {number} y coordenada y
     */
    constructor(scene, x, y, dir) {
        super(scene, x, y, 'guardProyectile');
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.allowGravity = false;
        this.dir = dir;
        if(dir === -1)
            this.flipX = true;
        this.timer = this.scene.time.addEvent({
            delay: 1200,
            callback: damageTimer,
            callbackScope: this
        });

        function damageTimer() {
            this.destroyed = true;
        }
    }
    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        this.setVelocity(125*this.dir,0)
        if(this.destroyed)
            this.destroy();
    }

    disable(){
        this.disableBody(true, true);
    }
    effect() {
        this.playerContainer.player.hurt(1);
        this.destroyed = true;
    }
}