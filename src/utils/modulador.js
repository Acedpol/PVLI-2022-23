export default class Modulador
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

        this.modulador();
    }

    update(t, dt) {

    }

    getPos() {
        if (this.vertical) { return this.rect.y; } else { return this.rect.x; };
    }

    getValue() {
        let sol = 0;
        if (this.vertical) {
            let total = this.max - this.min;
            let lleno = this.max - this.rect.y;
            sol = (lleno / total * 100) + '%';
        }
        return sol;
    }

    modulador() {
        
        const{width,height} = this.scene.scale;
        let rw = 100 * 0.75;
        let rh = 25 * 0.75;
        this.max -= rh;

        let _rectStyle = { relleno: '0xffffff', contorno: '0x000000', alphaFill:  1, alphaLine:  0.85, drawFill: true, drawLine: true };
        this.rect = new Phaser.Geom.Rectangle(width/2 - rw * 0.1, height/2, rw * 1.2, rh);
        let x = this.rect.x;
        let y = this.rect.y;

        this.zone = this.scene.add.zone(x, y, this.rect.width, this.rect.height)
            .setOrigin(0)
            .setInteractive({
                hitArea: this.rect,
                useHandCursor: true
            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                this.drag = true;;
            });

        this.scene.input.on(Phaser.Input.Events.POINTER_MOVE, () => {
                if (this.drag) {
                    if (this.vertical) {
                        this.zone.y = this.scene.input.activePointer.y;
                        this.rect.y = this.newPosition(this.zone.y, this.min, this.max);                        
                    } else {
                        this.zone.x = this.scene.input.activePointer.x;
                        this.rect.x = this.newPosition(this.zone.x, this.min);
                    }
                    
                    this.scene.resetRectDisplay(this.graphics, this.rect, _rectStyle);
                }
            })
            .on(Phaser.Input.Events.POINTER_UP, () => {
                this.drag = false;
                this.zone.x = this.rect.x;
                this.zone.y = this.rect.y;
            });
        
        this.graphics = this.scene.setRectStyle(this.rect, _rectStyle);
    }

    newPosition(pos, min, max) {
        let limit = this.inLimits(pos, min, max);
        let newPos, step;
        
        switch(limit) {
            case -1:
                newPos = min;
                break;
            case 0:
                newPos = pos;
                break;
            case 1:
                newPos = max;
                break;
            default: break;
        }

        return newPos;
    }

    inLimits(pos, min, max) {
        if (pos > min && pos < max) return 0;
        else if (pos < min) return -1;
        else if (pos > max) return 1;
    }

}