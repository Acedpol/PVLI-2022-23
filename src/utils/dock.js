/**
 * Clase Dock. Representación horizontal de un grupo de iconos.
 */

import Pool from "./pool.js";

export default class Dock extends Pool
{
    /**
     * Constructor de enemigo
     * @param {Phaser.Scene} scene escena a la que pertenece
     * @param {Phaser.Physics.Arcade.World} world physx simulation
     * @param {Phaser.Physics.Arcade.Sprite} typeObj tipo de objetos anidados
     */
    constructor(scene, world, typeObj = Phaser.Physics.Arcade.Sprite)
    {
        super(scene, world, { classType: typeObj });
        this.setOrigin(0.5);
    }

    update(value, key) {
        this.reset(value, key);
    }

    /** @override */
    addToGroup(key) {
        let x = this.args.x;
        let y = this.args.y;
        if (this.getLength() > 0) {
            let last = this.getChildren()[this.getLength() - 1];
            x = last.x + this.args.stepX;
            y = last.y + this.args.stepY;
        }
        super.addToGroup(key, x, y);
    }

    setArgs(args) {
        this.args = args;
    }

    reset(N, key) {
        // limpia
        this.clear(true, true);

        // restaura
        if (this.player) {
            for (let i = 0; i < N; i++) {
                this.addToGroup(key);
            }
        }
        
    }

    setDisplay(direction, args) {

        // fija el punto de referencia general
        switch(direction) {
            case 'up': this.setOrigin(0.5, 1); break;
            case 'down': this.setOrigin(0.5, 0); break;
            case 'left': this.setOrigin(0, 0.5); break;
            case 'right': this.setOrigin(1, 0.5); break;
            case 'center': this.setOrigin(0.5, 0.5); break;
            default: break;
        }

        // posiciona los elementos
        this.setXY(args.x, args.y, args.stepX, args.stepY);
    }

    addObjects(N, key) {
        for (let i = 0; i < N; i++) {
            this.addToGroup(key);
        }

    }

    deleteObjects(N) {
        let length_ = this.getLength();
        for (let i = 1; i <= N; i++) {
            if (length_ - i >= 0) {
                let obj_ = this.getChildren()[length_ - i];
                this.deleteFromGroup(obj_, true);
            }
        }

        return (this.getLength() > 0);
    }
    
}
