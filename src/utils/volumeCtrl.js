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
    constructor(scene, title, pos, min, max, vertical = true)
    {
        this.scene = scene;
        this.title = title;
        this.pos = pos;
        this.vertical = vertical;
        this.min = min;
        this.max = max;

        let _rw, _rh;
        if (this.vertical) {
            _rw = 100 * 0.75 * scene.coeWidth;
            _rh = this.max - this.min;
            this.pos -= _rw/2;
        } 
        else {
            _rw = this.max - this.min;
            _rh = 100 * 0.75 * scene.coeHeight;
            this.pos -= _rh/2;
        }
        this.dims = { rw: _rw, rh: _rh};

        this.bar();
        this.mod = new modulador(scene, this.pos, this.dims, min, max, vertical);
    }

    update(t, dt, min) {
        this.mod.min = min;
        this.mod.dom = this.max - min;
        this.mod.dom = this.mod.max - this.mod.min;
        this.mod.update(t,dt);
        this.updateRelleno();
        if (this.mod.drag) this.valText.setVisible(true);
        else this.valText.setVisible(false);
        this.getValue();
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
        const{rw,rh} = this.dims;

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

        if (this.vertical) {
            this.valText = this.scene.addText(this.pos + rw/2, this.min - width / 40, '0.00%', 8, '#ffffff', 'Greconian', 'bold');
            this.typeText = this.scene.addText(this.pos + rw/2, this.max + width / 40, this.title, 8, '#ffffff', 'Greconian', 'normal');
        }
        else {
            this.valText = this.scene.addText(this.max - width / 40, this.pos + rh/2, '0.00%', 8, '#ffffff', 'Greconian', 'bold');
            this.typeText = this.scene.addText(this.max + width / 40, this.pos + rh/2, this.title, 8, '#ffffff', 'Greconian', 'normal');
        }
    }

    getValue() {
        let val = this.mod.getValue().toFixed(0);
        this.valText.text = val;
        return this.mod.getValue();
    }

    getPos() {
        return this.mod.getPos();
    }

}
