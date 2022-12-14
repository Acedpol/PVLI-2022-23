import PlayerLogic from "./player.js";
import Enemy from './enemy.js';
import Proyectile from './proyectile.js';

/** @type {Phaser.GameObjects.GameObject} */
export default class DeadZone
{
    constructor(scene, x, y) 
    {
        super(scene, x, y);

    }   

    preUpdate(t,dt) 
    {
        this.checkPlayer();
        super.preUpdate(t,dt) // for animation and player detection (¡puede ser destruido!)
        if(this.shooting && this.canBeDamaged &&(this.shootTime <= this.scene.time.now - this.lastAttack))
        {
            this.scene.handleGameLose(); // <<<
        }
    }

    /**
     * Método ir hacia el jugador (si lo toca le disminuye la vida)
     * @param {GameObject} target lo que persigue
     */

    rangeCheck()
    {
        if(this.y >= this.target.y)
        {
            if(this.x < this.target.x )
            {
                return true;
            }
        }
        return false;
    }
    checkPlayer()
    {

        if(this.rangeCheck())
        { 
            this.scene.handleGameLose(); // <<<
        }

    }


}

