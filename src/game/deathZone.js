/* @type {Phaser.GameObjects.GameObject} */
import Character from './character.js';
export default class DeadZone extends Character
{
    constructor(scene, x, y, w, h){
        super(scene, x + w * 0.5, y + h * 0.5,'');
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this, true);
        this.setVisible(false);

        this.setSize(w,h);
    }
     
    preUpdate(t,dt) 
    {
        this.checkMagic();
        super.preUpdate(t,dt) // for animation and player detection (¡puede ser destruido!)
    }

    /** @override */
    effect() {
        this.scene.handleGameLose(this);
    }

    /*
     * Método ir hacia el jugador (si lo toca le disminuye la vida)
     * @param {GameObject} target lo que persigue
     */

    rangeCheck()
    {
        if(wh >= this.target.y)
        {
            if(ht < this.target.x )
            {
                return true;
            }
        }
        return false;
    }

    checkMagic()
    {
        if(this.scene.physics.overlap(this, this.scene.playerContainer.magic))
        {
            this.playerContainer.carryMagic(this.scene.playerContainer.magic);
        }
    }


}