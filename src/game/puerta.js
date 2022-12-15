import Character from './character.js';

export default class Puerta extends Character {

    constructor(scene, x, y, w, h, properties){
        super(scene, x + w * 0.5, y + h * 0.5, '');
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this, true);
        this.setVisible(false);
        this.bloqueado = false;

        for (const { name, value } of properties) {
            if (name === 'enlace') {
                this.origen = parseInt(value / 10);
                this.destino = value % 10;
            }
            if(name === 'bloqueado')
                this.bloqueado = true;
        }

        this.overlapping = true;
        
        this.setSize(w,h);
        this.name = 'puerta';
    }

    preUpdate(t,dt) 
    {
        super.preUpdate(t,dt);  // for animation and player detection
    }

    /** @override */
    effect() {
        if (!this.overlapping && (!this.bloqueado || this.scene.playerContainer.magic!=null)) {
            console.log('origen: ' + this.origen + ', destino: ' + this.destino);
            this.scene.switchMap(this.origen, this.destino);
        }
    }

    /** @override */
    anti_effect() {
        this.overlapping = false;
    }
}