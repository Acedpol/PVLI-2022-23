import Entity from "../game/entity.js";
import { toggleMute } from "./callbacks.js";

export class Jump extends Entity
{
    /**
     * Constructor de enemigo
     * @param {Phaser.Scene} scene Escena del enemigo
     * @param {number} x Coordenada x
     * @param {number} y Coordenada y
     */
    constructor(scene, x, y)
    {
        super(scene, x, y, 'jump');
    }

    preUpdate(t,dt) 
    {
        super.preUpdate(t,dt);  // for animation
    }
}

export class Life extends Entity
{
    /**
     * Constructor de enemigo
     * @param {Phaser.Scene} scene Escena del enemigo
     * @param {number} x Coordenada x
     * @param {number} y Coordenada y
     */
    constructor(scene, x, y)
    {
        super(scene, x, y, 'object');
    }

    preUpdate(t,dt) 
    {
        super.preUpdate(t,dt);  // for animation
    }
}

export class Speaker extends Entity
{
    /**
     * Constructor de enemigo
     * @param {Phaser.Scene} scene Escena del enemigo
     * @param {number} x Coordenada x
     * @param {number} y Coordenada y
     * @param {number} n frame
     */
    constructor(scene, x, y, n, isMuted)
    {
        super(scene, x, y, 'speaker', n);
        const{width,height} = this.scene.scale;
        this.setDisplaySize(height * 0.12, height * 0.12);

        this.mute = isMuted;
        if (isMuted) this.setFrame(4);
        else this.setFrame(3);

        this.setInteractive({
            hitArea: this,
            useHandCursor: true
        })
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            this.mute ? this.mute = false : this.mute = true;
            toggleMute(this.scene);
        });
    }

    preUpdate(t,dt) 
    {
        super.preUpdate(t,dt);  // for animation
    }

    update(value) {
        if (value > 0 && value < 25)
            this.setFrame(3);
        else if (value >= 25 && value < 50)
            this.setFrame(2);
        else if (value >= 50 && value < 75)
            this.setFrame(1);
        else if (value >= 75 && value < 100)
            this.setFrame(0);
    }
}

export class Controls extends Entity
{
    /**
     * Constructor de enemigo
     * @param {Phaser.Scene} scene Escena del enemigo
     * @param {number} n opción elegida
     */
    constructor(scene, n)
    {
        let x, y;
        const{width,height} = scene.scale;

        if (n === 0) {
            x = width * 0.2; 
            y = height/2;
        } else {
            x = width * 0.8; 
            y = height/2;
        }

        super(scene, x, y, 'controls', n);
        this.setDepth(2);
        this.setDisplaySize(this.width * scene.coeWidth, this.height * scene.coeHeight);

        // console.log("- icon dims: { w: " + this.width + ", h: " + this.height + " } ");
    }

    preUpdate(t,dt) 
    {
        super.preUpdate(t,dt);  // for animation
    }
}
