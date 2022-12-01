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
    constructor(scene, pos, min, max, vertical = true)
    {
        this.scene = scene;
        this.pos = pos;
        this.vertical = vertical;
        this.min = min;
        this.max = max;

        this.bar();
        this.mod = new modulador(scene, min, max, vertical);
        this.limitsLines();
    }

    update(t, dt) {
        this.updateRelleno();
    }

    updateRelleno() {
        if (this.vertical) {
            this.relleno.y = this.mod.getPos();
            this.relleno.height = this.max - this.relleno.y;
        } else {
            this.relleno.x = this.mod.getPos();
            this.relleno.width = this.max - this.relleno.x;
        }
        this.scene.resetRectDisplay(this.graphics2, this.relleno, this.rectStyle2);
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

        let _rectStyle1 = { relleno: '0x000033', contorno: '0xffffff', alphaFill:  0.85, alphaLine:  0.75, drawFill: true, drawLine: true };
        this.rectStyle2 = { relleno: '0x0000ff', contorno: '0xffffff', alphaFill:  0.85, alphaLine:  0.75, drawFill: true, drawLine: true };
        
        if (this.vertical) {
            var _fondo = new Phaser.Geom.Rectangle(this.pos + rw * 0.1, this.min, rw * 0.8, rh);
            this.relleno = new Phaser.Geom.Rectangle(this.pos + rw * 0.1, this.min, rw * 0.8, rh * 0.5);
        }
        else {
            var _fondo = new Phaser.Geom.Rectangle(this.min, this.pos + rh * 0.1, rw, rh * 0.8);
            this.relleno = new Phaser.Geom.Rectangle(this.min, this.pos + rh * 0.1, rw * 0.5, rh * 0.8);
        }

        this.graphics1 = this.scene.setRectStyle(_fondo, _rectStyle1, 2);
        this.graphics2 = this.scene.setRectStyle(this.relleno, this.rectStyle2, 2);
    }

    limitsLines() {
        const{width,height} = this.scene.scale;

        let _rectStyle = { relleno: '0x000033', contorno: '0xffffff', alphaFill:  0.85, alphaLine: 0.8, drawFill: false, drawLine: true };
        let _minLine, _maxLine;

        if (this.vertical) {
            _minLine = new Phaser.Geom.Rectangle(width * 0.1, this.min, width * 0.8, 0);
            _maxLine = new Phaser.Geom.Rectangle(width * 0.1, this.max, width * 0.8, 0);
            this.scene.addText(width * 0.95, this.min, '100%', 8, '#ffffff', 'Greconian', 'bold');
            this.scene.addText(width * 0.95, this.max, '  0%', 8, '#ffffff', 'Greconian', 'bold');
        }
        else {
            _minLine = new Phaser.Geom.Rectangle(this.min - 2, height * 0.1, 0, height * 0.8);
            _maxLine = new Phaser.Geom.Rectangle(this.max + 2, height * 0.1, 0, height * 0.8);
            this.scene.addText(this.min, height * 0.95, '100%', 8, '#ffffff', 'Greconian', 'bold');
            this.scene.addText(this.max, height * 0.95, '  0%', 8, '#ffffff', 'Greconian', 'bold');
        }

        this.graphics3 = this.scene.setRectStyle(_minLine, _rectStyle, 2);
        this.graphics4 = this.scene.setRectStyle(_maxLine, _rectStyle, 2);

        
    }

}
