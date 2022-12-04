import blankMenu from "./menu.js";
import { startGame, backFromSonido } from "../utils/callbacks.js";
import volumeCtrl from "../utils/volumeCtrl.js";
import { Speaker } from "../utils/icons.js";

export default class SoundMenu extends blankMenu
{
    constructor() 
    {
        super('menuSonido');
    }

    init() {
        super.init();       
    }

    preload() 
    {
        console.log(" - Sonido scene - ")
    }

    create() 
    {        
        // gets the sizes of the screen
        const{width,height} = this.scale; // canvas size

        
        // Create background image
        this.background = this.createBackground('img_back3');
        this.colorBackGround(width * 0.5, height * 0.5, width * 0.975, height * 0.95, true, false, true, 4);
        
        // compone el titulo y subtitulo del menu principal del juego
        // this.addText(width * 0.8, height * 0.1, 'Configuración', 14, '#000');
        
        // play and options buttons
        this.createDefaultGeoButtonGame(this, width * 0.15, height * 0.1, 'Sonido', backFromSonido, true, 4);
        
        // volume control
        this.limitsLines(height * 0.4, height * 0.8, true);
        this.general = new volumeCtrl(this, 'General', width * 0.25, height * 0.4, height * 0.8, true);
        this.ambience = new volumeCtrl(this, 'Ambience', width * 0.5, height * 0.4, height * 0.8, true);
        this.sfx = new volumeCtrl(this, 'SFX', width * 0.75, height * 0.4, height * 0.8, true);
        this.ambience.lastValue = 100;
        this.sfx.lastValue = 100;
        this.initMainMark();
        this.initMainLine(this.general.vertical);

        // speaker icon
        this.speaker = new Speaker(this, width * 0.845, height * 0.115, 0);
        this.add.existing(this.speaker);
    }

    update(t, dt) 
    {
        super.update(t, dt);

        this.general.update(t, dt, this.general.min);
        let min = this.general.getPos();

        this.ambience.update(t, dt, min);
        this.sfx.update(t, dt, min);

        let pos = this.general.getPos();
        this.ambience.mod.setPos(pos);
        this.sfx.mod.setPos(pos);

        if (this.ambience.mod.getPos() === this.general.mod.getPos()) this.ambience.mod.lastValue = 100;
        if (this.sfx.mod.getPos() === this.general.mod.getPos()) this.sfx.mod.lastValue = 100;

        if (!this.speaker.mute) {
            this.speaker.update(this.general.getValue());
        }

        this.updateMainMark();
        this.updateMainline(this.general.vertical);
    }

    colorBackGround(x, y, rw, rh, fill = true, stroke = false, setColor = false, lv = 1) {
        // rectángulo
        let _rect = new Phaser.Geom.Rectangle(x - rw/2, y - rh/2, rw, rh);
        let _rectStyle = new this.rectStyle('0x000000', '0x000000', 0.75, 0.85, fill, stroke);

        // fija el color
        if (setColor) { 
            const{color, relleno, contorno} = this.btnColor(lv);
            _rectStyle.relleno = relleno;
            _rectStyle.contorno = contorno;
        } 

        // fija el estilo
        this.setRectStyle(_rect, _rectStyle);
    }

    limitsLines(min, max, vertical) {
        const{width,height} = this.scale;

        let _rectStyle = { relleno: '0x000033', contorno: '0xffffff', alphaFill:  0.85, alphaLine: 0.8, drawFill: false, drawLine: true };
        let _minLine, _maxLine;

        if (vertical) {
            _minLine = new Phaser.Geom.Rectangle(width * 0.1, min, width * 0.8, 0);
            _maxLine = new Phaser.Geom.Rectangle(width * 0.1, max, width * 0.8, 0);
            this.addText(width * 0.95, min, '100%', 8, '#ffffff', 'Greconian', 'bold');
            this.addText(width * 0.95, max, '  0%', 8, '#ffffff', 'Greconian', 'bold');
        }
        else {
            _minLine = new Phaser.Geom.Rectangle(min - 2, height * 0.1, 0, height * 0.8);
            _maxLine = new Phaser.Geom.Rectangle(max + 2, height * 0.1, 0, height * 0.8);
            this.addText(min, height * 0.95, '100%', 8, '#ffffff', 'Greconian', 'bold');
            this.addText(max, height * 0.95, '  0%', 8, '#ffffff', 'Greconian', 'bold');
        }

        this.graphics3 = this.setRectStyle(_minLine, _rectStyle, 2);
        this.graphics4 = this.setRectStyle(_maxLine, _rectStyle, 2);
    }

    initMainMark() {
        const{width,height} = this.scale;
        let _textStyle = { fontSize: 24, color: '#fff', fontFamily: 'Greconian', fontStyle: 'bold' };
        this.genVol = this.addText_s(width * 0.9275, height * 0.115, this.general.getValue(), _textStyle)
            .setDisplaySize(width * 0.5, height * 0.12);
    }
    updateMainMark() {
        let vol = this.general.getValue().toFixed(0);
        this.genVol.text = vol;
    }

    initMainLine(vertical) {
        const{width,height} = this.scale;
        const{rw,rh} = this.general.mod.dims;
        let pos = this.general.getPos();

        this.rectStyle = { relleno: '0xaaaaaa', contorno: '0x000000', alphaFill:  0.25, alphaLine: 0.25, drawFill: true, drawLine: true };
        this.mainLine;

        if (vertical) {
            this.mainLine = new Phaser.Geom.Rectangle(width * 0.1, pos - 1, width * 0.8, rh);
        }
        else {
            this.mainLine = new Phaser.Geom.Rectangle(pos - 1, height * 0.1, rw, height * 0.8);
        }

        this.graphics5 = this.setRectStyle(this.mainLine, this.rectStyle, 1);
    }
    updateMainline(vertical) {
        let pos = this.general.getPos();

        if (vertical) {
            this.mainLine.setPosition(this.mainLine.x, pos);
        }
        else {
            this.mainLine.setPosition(pos, this.mainLine.y);
        }

        this.resetRectDisplay(this.graphics5, this.mainLine, this.rectStyle);
    }

}
