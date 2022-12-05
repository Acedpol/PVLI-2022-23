export default class Modulador
{
    /**
     * Constructor de enemigo
     * @param {Phaser.Scene} scene escena a la que pertenece
     */
    constructor(scene, pos, dims, min, max, vertical = true)
    {
        this.scene = scene;
        this.pos = pos;
        this.vertical = vertical;
        this.min = min;
        this.max = max;

        let _rw, _rh;
        if (this.vertical) {
            _rw = dims.rw;
            _rh = 25 * 0.75 * scene.coeWidth;
            this.max -= _rh;
        } 
        else {
            _rw = 25 * 0.75 * scene.coeHeight;
            _rh = dims.rh;
            this.max -= _rw;
        }
        this.dims = { rw: _rw, rh: _rh};
        this.dom = this.max - this.min;

        this.modulador();
        this.dist = 0;
        this.point = this.getPos();

        this.lastValue = 100;
        this.saveValue = 100;
    }

    update(t, dt) {
        if (Phaser.Input.Events.POINTER_MOVE) {
            if (this.drag) {
                if (this.vertical) {
                    this.zone.y = this.scene.input.activePointer.y;
                    this.rect.y = this.newPosition(this.zone.y, this.min, this.max);                        
                } else {
                    this.zone.x = this.scene.input.activePointer.x;
                    this.rect.x = this.newPosition(this.zone.x, this.min, this.max);
                }
                
                this.scene.resetRectDisplay(this.graphics, this.rect, this.rectStyle);
                this.lastValue = this.getValue();
            }
        }
    }

    getPos() {
        if (this.vertical) { return this.rect.y; } else { return this.rect.x; };
    }

    getValue() {
        let sol = 0;
        if (this.vertical) {
            let total = this.max - this.min;
            let lleno = this.max - this.rect.y;
            sol = (lleno / total * 100);
        }
        return sol;
    }

    modulador() {
        
        const{width,height} = this.scene.scale;
        const{rw,rh} = this.dims;

        this.rectStyle = { relleno: '0xffffff', contorno: '0x000000', alphaFill:  1, alphaLine:  0.85, drawFill: true, drawLine: true };
        this.rect = new Phaser.Geom.Rectangle(this.pos - rw * 0.1, height * 0.6, rw * 1.2, rh);
        let x = this.rect.x;
        let y = this.rect.y;

        this.zone = this.scene.add.zone(x, y, this.rect.width, this.rect.height)
            .setOrigin(0)
            .setInteractive({
                hitArea: this.rect,
                useHandCursor: true
            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                this.drag = true;
            });

        this.scene.input.on(Phaser.Input.Events.POINTER_UP, () => {
                this.drag = false;
                this.zone.x = this.rect.x;
                this.zone.y = this.rect.y;
            });
        
        this.graphics = this.scene.setRectStyle(this.rect, this.rectStyle);
    }

    setPos(pos) {
        let newPos = pos +  (100 - this.lastValue) * (this.max - this.min) / 100;
        if (this.vertical) {
            this.rect.y = newPos;
            this.zone.y = this.rect.y;
        } else {
            this.rect.x = newPos;
            this.zone.x = this.rect.x;
        }
        this.scene.resetRectDisplay(this.graphics, this.rect, this.rectStyle);
    }

    setValue(value) {
        this.lastValue = value;
        let newPos = this.min +  (100 - value) * (this.max - this.min) / 100;
        if (this.vertical) {
            this.rect.y = newPos;
        } else {
            this.rect.x = newPos;
        }
        this.scene.resetRectDisplay(this.graphics, this.rect, this.rectStyle);
    }

    toggleMute(mute) {
        if (mute) {
            this.saveValue = this.getValue();
            this.setValue(0);
        }
        else this.setValue(this.saveValue);
    }

    newPosition(pos, min, max) {
        let limit = this.inLimits(pos, min, max);
        let newPos;
        
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