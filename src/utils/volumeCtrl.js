/**
 * Clase Pool. Maneja grupos de objetos.
 * Si al añadir un objeto no tiene 'body' se hace estático por defecto.
 */

export default class volumeCtrl
{
    /**
     * Constructor de enemigo
     * @param {Phaser.Scene} scene escena a la que pertenece
     */
    constructor(scene)
    {
        this.scene = scene;
        this.modulador();
    }

    update(t, dt) {

    }

    modulador() {
        
        const{width,height} = this.scene.scale;
        let rw = 20;
        let rh = 10;

        let _rectStyle = { relleno: '0x000000', contorno: '0xffffff', alphaFill:  0, alphaLine:  0.85, drawFill: false, drawLine: true };
        let _rect = new Phaser.Geom.Rectangle(width/2, height/2, rw, rh);
        let _x = _rect.x + _rect.width * 0.5;
        let _y = _rect.y + _rect.height * 0.5;

        this.zone = this.scene.add.zone(_x, _y, _rect.width, _rect.height)
            .setInteractive({
                hitArea: _rect,
                useHandCursor: true
            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                this.drag = true;;
            })
            .on(Phaser.Input.Events.POINTER_MOVE, () => {
                if (this.drag) {
                    // this.zone.x = this.scene.input.activePointer.x;
                    this.zone.y = this.scene.input.activePointer.y;
                    // _rect.x = this.scene.input.activePointer.x - _rect.width * 0.5;
                    _rect.y = this.scene.input.activePointer.y - _rect.height * 0.5;
                    this.graphics.clear();
                    this.scene.resetRectDisplay(this.graphics, _rect, _rectStyle);
                }
            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                this.drag = false;
            });

        
        this.graphics = this.scene.setRectStyle(_rect, _rectStyle, 4);
    }

}
