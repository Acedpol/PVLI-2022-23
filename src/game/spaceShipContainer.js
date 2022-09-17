/** @type {Phaser.GameObjects.GameObject} */
export default class SpaceShip extends Phaser.GameObjects.Container
{
    /** @type {Phaser.Scene} */
    scene

    /** @type {Boolean} */
    listaParaDespegue

    /** @type {Phaser.Physics.Arcade.Image} */
    spaceShip

    /** @type {Phaser.Physics.Arcade.Sprite} */
    combustion

    /** @type {Phaser.Sound.BaseSound} */
    burst

    /** @type {Phaser.Sound.BaseSound} */
    win

    /**
     * Constructor del objeto combustible
     * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     * @param {Phaser.Physics.Arcade.Image} aspecto Imagen que representa a la nave espacial
     */
    constructor(scene, x, y, aspecto) 
    {        
        // Constructor del container //
        super(scene, x, y, aspecto)
        this.scene = scene
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)

        // set active and visible
        this.setActive(true)
        this.setVisible(true)

        // colisiona con los limites del mundo
        this.body.collideWorldBounds = true

        // ajustes de la nave
        this.spaceShip = aspecto
        this.body.setSize(this.spaceShip.width, this.spaceShip.height)
        this.spaceShip.setOrigin(0)
        
        // inicialización de variables
        this._aceleration = -250
        this._velocity = -75
        this.listaParaDespegue = false

        // inicialización de audios fx
        this.burst = this.scene.sound.add('burst')
        this.win = this.scene.sound.add('win')
    }

    preUpdate(t,dt) 
    {
        // this.iterate( (child) => child.preUpdate(t,dt) ) // for animations

        /** @type {PlayerContainer} */
        let player = this.scene.playerContainer

        // checks if the player overlap with this GameObject
        if (player.carriesObject && this.scene.physics.overlap(this, player))
        {
            player.dropObject()
            this.scene.sound.play('drop')   // sound feedback
            this.body.setVelocityY(this._velocity)
            this._velocity -= 25
        }

        // Cuando finaliza el juego: Despega!
        if (this.listaParaDespegue && !this.win.isPlaying)
        {
            this.Fly()
        }

        if (this.burst.isPlaying && this.body.y < -this.body.height -this.combustion.height * 2)
        {
            this.burst.pause()
            // inits the game final scene
            this.scene.scene.start('GameOver')
        }
    }

    /**
     * Prepara la nave para el depegue...
     */
    prepareToFlight()
    {
        // Sonido de victoria y activa el final
        this.listaParaDespegue = true
        this.win.play()
    }

    /**
     * Lanza la nave al depegue!!
     */
    Fly()
    {
        // set the acceleration to fly out y avisa
        this.body.setVelocityY(-20)
        this.body.setAccelerationY(this._aceleration)
        this.listaParaDespegue = false

        // sfx
        this.burst.play({
            volume: 5,
            rate: 1
        })

        // Aparece la combustion del motor de la nave
        this.combustion = this.scene.add.sprite(0, 0, this.body.width, this.body.width)
        this.add(this.combustion)
        this.combustion.setPosition(0, this.body.height)
        this.combustion.setOrigin(0)
        this.combustion.play('fly')

        // El jugador "sube" a la nave
        this.scene.playerContainer.destroy()
    }

}