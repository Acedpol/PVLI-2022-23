import Character from './character.js';

export default class Portal extends Character {

    constructor(scene, x, y, w, h, properties){
        super(scene, x + w * 0.5, y + h * 0.5, '');
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this, true);
        this.setVisible(false);
                
        for (const { name, value } of properties) {
            if (name === 'enlace') {
                this.origen = parseInt(value / 10);
                this.destino = value % 10;
            }
        }
        
        this.setSize(w,h);
    }

    preUpdate(t,dt) 
    {
        super.preUpdate(t,dt);  // for animation and player detection
    }

    /** @override */
    effect() {
        console.log('origen: ' + this.origen + ', destino: ' + this.destino);
        this.scene.switchMap(this.destino);
    }
}