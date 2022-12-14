/** @type {Phaser.GameObjects.GameObject} */
export default class DeadZone extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene, x, y, wh, ht){
        super(scene, x, y,'');
        this.setDepth(0);
        this.body.setSize(wh,ht,true);
        this._player = this.playerContainer;
        this._magic = this.playerContainer;
        this._enemy = this.playerContainer;


    }

    preUpdate(t,dt) 
    {
        this.checkPlayer();
        super.preUpdate(t,dt) // for animation and player detection (¡puede ser destruido!)
        
    }

    /**
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

        if (this.scene.physics.overlap(this, this.scene.playerContainer))
        {        
            this.scene.handleGameLose(this)
        }


    }


}

