/**
 * Clase Pool. Maneja grupos de objetos.
 * Si al añadir un objeto no tiene 'body' se hace estático por defecto.
 */

/** @type {Phaser.GameObjects.Group} */
export default class Pool extends Phaser.GameObjects.Group
{
    /**
     * Constructor de enemigo
     * @param {Phaser.Scene} scene escena a la que pertenece
     */
    constructor(scene)
    {
        super(scene, { classType: Phaser.Physics.Arcade.Sprite });
    }

    /** @async */
    setPlayer()
    {
        this.player = this.scene.playerContainer.player;
    }

    /**
     * Adds an object to te pool.
     * @param {String} key texture key
     */
    addToGroup(key, x = 0, y = 0) {
        this.create(x, y, key);
    }

    /**
     * Removes an object from the pool.
     */
    deleteLast(remove = false) {
        if (this.getLength() - 1 >= 0) {
            let obj = this.getChildren()[this.getLength() - 1];
            this.deleteFromGroup(obj, true);
        }
    }

    /**
     * Removes an object from the pool.
     * @param {Phaser.Physics.Arcade.Sprite} obj gameObject to be remove
     */
    deleteFromGroup(obj, remove = false) {
        this.killAndHide(obj);
        if (remove) this.remove(obj, true, true);
    }

    /**
     * Removes all the members of this group
     */
    deleteALL(remove = false) {
        let n = this.getLength();
        for (let i = 0; i < n; i++) {
            this.deleteFromGroup(this.getChildren()[i], remove);            
        }
    }

}
