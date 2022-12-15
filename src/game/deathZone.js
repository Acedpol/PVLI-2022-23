/* @type {Phaser.GameObjects.GameObject} */
import Character from './character.js';
export default class DeadZone extends Character
{
    constructor(scene, x, y, wh, ht){
        super(scene, x, y,'');
        this.setVisible(false);
        //this.body.setSize(wh,ht,true);
        this._player = this.scene.playerContainer;
        this._magic = this.scene.playerContainer.magic;
        //this._enemy = this.playerContainer;
        this.init(wh,ht)
    }

    init(wh,ht)
    {
        this.timer = this.scene.time.addEvent({
            delay: 200,
            callback: sizeChange,
            callbackScope: this
        });

        function sizeChange() {            
            this.body.width = wh;
            this.body.height = ht;
        }


    }
    preUpdate(t,dt) 
    {
        this.checkPlayer();
        super.preUpdate(t,dt) // for animation and player detection (¡puede ser destruido!)

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
    checkPlayer()
    {

        if(this.scene.physics.overlap(this, this.scene.playerContainer))
        {
            this.scene.handleGameLose(this)
        }
        else if(this.scene.physics.overlap(this, this.scene.playerContainer.magic))
        {
            this.playerContainer.carryMagic(this.scene.playerContainer.magic);
        }


    }


}