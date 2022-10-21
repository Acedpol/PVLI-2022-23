import Object from '../game/object.js'
import PlayerContainer from '../game/playerContainer.js'
import Bullet from '../game/bullet.js'

export default class pvliGame extends Phaser.Scene 
{
    // --- PLAYER --- 
    /** @type {Phaser.GameObjects.Container} */
    playerContainer

    // --- SCENE --- 
    /** @type {Phaser.Physics.Arcade.StaticBody} */
    platform

    /** @type {Phaser.Tilemaps.Tilemap} */
    map

    /** @type {Phaser.Tilemaps.TilemapLayer} */
    groundLayer

    // --- OBJECTS --- 
    /** @type {Phaser.Physics.Arcade.StaticGroup} */
    bullets

    /** @type {Object} */
    object

    // --- TIMER --- 
    /** @type {Number} */
    timeLapsed
    cooldownAsteroids

    // --- UI --- 
    /** @type {Phaser.GameObjects.Text} */
    objectCollectedText
    
    // --- GAME LOGIC --- 
    /** @type {Number} */
    level
    objectCollected
    objectToFinish

    /**
     * Constructor de la escena
     */
    constructor() 
    {
        super({
            key: 'pvliGame'
        });
    }

    init(level)
    {
        // Level select assignment
        this.level = level
        console.log('Level = ' + this.level)

        // Level parameters by difficulty
        this.objectCollected = 0
        this.objectToFinish = 2

        if (this.level == 1)
        {
            this.objectToFinish = 2
            this.cooldownAsteroids = 2 * 1000
        }
        else if (this.level == 2)
        {
            this.objectToFinish = 3
            this.cooldownAsteroids = 1 * 1000
        }
        else if (this.level == 3)
        {
            this.objectToFinish = 5
            this.cooldownAsteroids = 0.5 * 1000
        }

        // cancela las colisiones con el techo
        this.physics.world.checkCollision.up = false
    }

    preload() 
    {
        console.log("pvliGame scene")
    }

    create() 
    {
        // Create background image
        this.background = this.createBackground('img_back');

        // Creates the Game Map
        this.map = this.createMap('nivel', 8, 8, 'platform', 'img_tilemap', 'platforms')

        // Grupo de Bullets
        this.bullets = this.physics.add.group({
            classType: Bullet
        })

        this.physics.add.collider(this.bullets, this.groundLayer)

        // Creates the player
        this.createPlayer(this.map)

        // Crea un objeto para recoger en la escena
        this.createRandomObject(this.map)

        // Creates the Score UI
        this.createScoreUI()

        // Inits the timer
        this.timeLapsed = 0
        this.createRandomBullet(this.map)
    }

    update(t, dt) 
    {
        // actualiza el timer
        this.timeLapsed = this.timeLapsed + dt

        // Cooldown to create a new bullet
        if (this.timeLapsed > this.cooldownAsteroids)
        {
            this.createRandomBullet(this.map)
            this.timeLapsed = 0
        }
    }

    /**
     * Constructor del mapa
     * @param {String} clave Nombre dado al 'mapa.json' en 'boot.js'
     * @param {number} tileWidth Tamaño horizontal en pixeles de cada tile
     * @param {number} tileHeight Tamaño vertical en pixeles de cada tile
     * @param {String} tileset Nombre dado al 'tileset' en 'mapa.json'
     * @param {String} tilesetImg Nombre dado a la imagen asociada al 'tileset' en 'boot.js'
     * @param {String} layer Nombre dado a la capa de tiles (tilemap) en 'mapa.json'
     */
    createMap(clave, tileWidth, tileHeight, tileset, tilesetImg, layer) 
    {
        // creación del mapa:
        const map = this.make.tilemap({
          key: clave,
          tileWidth: tileWidth,
          tileHeight: tileHeight
        });
    
        // asignación de imagenes
        const _tileset = map.addTilesetImage(tileset, tilesetImg)
    
        // creación de layers: 3 principales (fondo, fore y colliders)
        this.groundLayer = map.createLayer(layer, [_tileset]).setDepth(1)  // 'GroundLayer'        
    
        // definición de colisiones: -> con propiedad en TILED
        this.groundLayer.setCollisionByProperty({ suelo: true })
        
        return map
    }

    /**
     * Crea una imagen y la ajusta al fondo
     * @param {String} keymap Nombre dado a la imagen del fondo en boot 
     */
    createBackground(keymap){
        // gets the sizes of the screen
        const{width,height} = this.scale

        this.add.image(width/2, height/2, keymap)
    }

    /**
     * Ajusta los límites del mundo de juego y
     * los parámetros de seguimiento de la cámara
     * al tamaño del mapa ya creado
     * @param {Phaser.Tilemaps.Tilemap} map Mapa del juego ya creado
     */ 
    worldBoundsNCameraDeadZones(map)
    {
        // dimensiones del mapa
        const mapWidth = map.width * map.tileWidth
        const mapHeight = map.height * map.tileHeight
    
        // tamaño del mundo de juego
        this.physics.world.setBounds(mapWidth * (-0.5), 0, mapWidth * 2, mapHeight)

        // set the horizontal dead zone to 1.5x game width         
        this.cameras.main.setDeadzone(mapWidth * 1.25, mapHeight * 0.655)
    }

    /**
     * Creates a new random positioned object
     * @param {Phaser.Tilemaps.Tilemap} map Mapa del juego ya creado
     */
    createRandomObject(map)
    {
        // dimensiones del mapa
        const mapWidth = map.width * map.tileWidth
        const mapHeight = map.height * map.tileHeight

        if (this.objectCollected < this.objectToFinish)
        {
            // creates new object object to pick up
            this.object = new Object(this, Phaser.Math.Between(12, mapWidth - 12), Phaser.Math.Between(12, mapHeight - 12), 'object')
            this.physics.add.collider(this.object, this.groundLayer)
        }
        else
        {
            // --- COULD BE THE GAME COMPLETE RESPONSE --- 
            // this.spaceShip.prepareToFlight() // practically-end-scene
        }

        return this.object;
    }

    /**
     * Creates and positions the Player
     * @param {Phaser.Tilemaps.Tilemap} map Mapa del juego ya creado
     */
    createPlayer(map)
    {
        // gets the sizes of the screen
        const{width,height} = this.scale

        // dimensiones del mapa
        const mapWidth = map.width * map.tileWidth
        const mapHeight = map.height * map.tileHeight

        // Añade al jugador como Sprite
        let player = this.add.sprite(0, 0, 'jetpac', 7)

        // creates the player in the middle of the screen
        this.playerContainer = new PlayerContainer(this, mapWidth * 0.2, mapHeight * 0.75, player)

        // Adds main physics
        this.physics.add.collider(this.playerContainer, this.groundLayer)

        // follow the player
        // this.cameras.main.startFollow(this.playerContainer)

        // World Bounds and Camera dead zones properties
        this.worldBoundsNCameraDeadZones(this.map)
    }

     /**
     * Creates a new random positioned bullet
     * @param {Phaser.Tilemaps.Tilemap} map Mapa del juego ya creado
     */
    createRandomBullet(map)
    {
        // dimensiones del mapa
        const mapWidth = map.width * map.tileWidth
        const mapHeight = map.height * map.tileHeight

        // position
        let x = Phaser.Math.Between(10, mapWidth - 10)
        let y = Phaser.Math.Between(10, mapHeight * -0.15)

        let bullet = this.bullets.create(x, y, 'bullet')
        this.physics.add.collider(bullet, this.groundLayer)
    }

    /**
     * Creates the Game Score UI for collectionable objects
     */
    createScoreUI() 
    {
        // gets the sizes of the screen
        const{width,height} = this.scale

        // text score for fuels	
        const style = { color: '#fff', fontSize: 8, fontFamily: 'Pixeled' }	
        const x = width / 2;
        const y = height / 30;

        this.objectCollectedText = this.add.text(x, y, '0/' + this.objectToFinish, style)	
            .setScrollFactor(0)	
            .setOrigin(0.5, 0)
    }

    /**
     * Game Lose, the has die
     * @param {Phaser.GameObjects.GameObject} object The object that kill the player
     */
    handleGameLose(object)
    {
        // kill object and play feedback
        this.playerContainer.destroy()
        this.bullets.killAndHide(object)
        this.sound.play('lose')

        // inits the game final scene
        this.scene.start('GameOver')
    }
}
