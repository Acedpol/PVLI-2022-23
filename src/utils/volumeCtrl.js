/**
 * Clase Pool. Maneja grupos de objetos.
 * Si al añadir un objeto no tiene 'body' se hace estático por defecto.
 */

import modulador from "./modulador.js";

export default class volumeCtrl
{
    /**
     * Constructor de enemigo
     * @param {Phaser.Scene} scene escena a la que pertenece
     */
    constructor(scene, min, max, vertical = true)
    {
        this.scene = scene;
        this.vertical = vertical;
        this.min = min;
        this.max = max;

        this.bar();
        this.mod = new modulador(scene, min, max, vertical);
    }

    update(t, dt) {

    }

    bar() {
        const{width,height} = this.scene.scale;
        let rw = 100 * 0.75;
        let rh = 25 * 0.75;

        if (this.vertical) {
            rw = 100 * 0.75;
            rh = this.max - this.min;
        } 
        else {
            rw = this.max - this.min;
            rh = 100 * 0.75;
        }

        let _rectStyle1 = { relleno: '0x000033', contorno: '0xffffff', alphaFill:  0.85, alphaLine:  0.85, drawFill: true, drawLine: true };
        let _fondo = new Phaser.Geom.Rectangle(width/2 + rw * 0.1, height/2  - rh * 0.5, rw * 0.8, rh);

        let _rectStyle2 = { relleno: '0x0000ff', contorno: '0xffffff', alphaFill:  0.85, alphaLine:  0.85, drawFill: true, drawLine: true };
        let _relleno = new Phaser.Geom.Rectangle(width/2 + rw * 0.1, height/2 + _fondo.height - rh * 0.3 - rh * 0.5, rw * 0.8, rh * 0.3);

        this.graphics1 = this.scene.setRectStyle(_fondo, _rectStyle1, 2);
        this.graphics2 = this.scene.setRectStyle(_relleno, _rectStyle2, 2);
    }

}
