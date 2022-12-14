import PlayerContainer from '../game/playerContainer.js'
import blankScene from './blankScene.js'
import { gameOver } from '../utils/callbacks.js'
import PlayerLogic from '../game/player.js'


export default class blankGame extends blankScene
{
    // --- PLAYER --- 
    /** @type {Phaser.GameObjects.Sprite} */            player
    /** @type {Phaser.GameObjects.Container} */         playerContainer

    // --- SCENE --- 
    /** @type {Phaser.Physics.Arcade.StaticBody} */     platform
    /** @type {Phaser.Tilemaps.Tilemap} */              map
    /** @type {Phaser.Tilemaps.TilemapLayer} */         groundLayer

    // --- UI --- 
    /** @type {Phaser.Scene} */                         UI
    
    // --- GAME LOGIC --- 
    /** @type {Number} */                               level

    // --- GAME OBJECTS --- 
    /** @type {Array} */                                objects

    /**
     * Constructor de la escena
     */
    constructor(keyname) 
    {
        super(keyname);
    }

    init(args)
    {
        super.init(args);
        this.objects = [];

        // UI interface
        this.scene.launch('UI', args);
        this.events.on('resume', (scene, args) => { this.scene.resume('UI', args); console.log('--> resume UI!'); });
        this.UI = this.game.scene.getScene('UI');
    }

    preload() 
    {
        console.log(" - blankGame scene - ")
    }

    create() 
    {
        // Nothing to create here
    }

    update(t, dt) 
    {
        super.update(t,dt);
    }

    // --- --- MACHINE --- --- 

    /**
     * Game Lose, the player is died
     * @param {Phaser.GameObjects.GameObject} object The object that kill the player
    */
    handleGameLose()
    {
        // kill object and play feedback
        this.sound.stopAll();
        this.playerContainer.destroy();
        gameOver(this);
    }

    // --- --- --- 

    // --- --- PLAYER --- --- 

    /**
     * Creates and positions the Player, by a container
     * @param {Number} x horizontal position
     * @param {Number} y vertical position
     * @param {String} sprite name of the sprite asset
     * @param {Number} args par??metros de juego
     */
    createPlayer(x, y, sprite, args)
    {
        // A??ade al jugador como Sprite
        this.player = this.add.existing(new PlayerLogic(this, 0, 0, sprite, 0, args), false);

        // creates the player container in the middle of the screen
        let container = new PlayerContainer(this, x, y, this.player);
        this.playerContainer = this.add.existing(container, false);

        // a??ade el jugador al contenedor: '1, 2, 3 ...fusi??n!!'
        this.playerContainer.addPlayer(this.player);
        this.playerContainer.setDepth(3);
        return container;
    }

    initPlayer(follow = false)
    {        
        // main camera sigue al jugador
        if (follow) this.cameras.main.startFollow(this.playerContainer);

        // se le a??aden las f??sicas
        this.addToPhysx(this.playerContainer);
        this.resetGroundCollider(this.playerContainer);

        // establece el tama??o del body
        this.playerContainer.setPlayerSize();
    }

    // --- --- --- 

    // --- --- WORLD --- --- 

    /**
     * Sets the condition for all edges in the game to avoid or not collisions
     * @param {Boolean} up condition for the top edge
     * @param {Boolean} down condition for the btoom edge
     * @param {Boolean} left condition for the left edge
     * @param {Boolean} right condition for the right edge
     */
    checkCollisions(up = true, down = true, left = true, right = true) {
        this.physics.world.checkCollision.up = up;
        this.physics.world.checkCollision.down = down;
        this.physics.world.checkCollision.left = left;
        this.physics.world.checkCollision.right = right;
    }

    /**
     * Constructor del mapa
     * @param {String} clave Nombre dado al 'mapa.json' en 'boot.js'
     * @param {number} tileWidth Tama??o horizontal en pixeles de cada tile
     * @param {number} tileHeight Tama??o vertical en pixeles de cada tile
     * @param {String} tileset Nombre dado al 'tileset' en 'mapa.json'
     * @param {String} tileset2 Nombre dado al 'tileset' en 'mapa.json'
     * @param {String} tilesetImg Nombre dado a la imagen asociada al 'tileset' en 'boot.js'
     * @param {String} tilesetImg2 Nombre dado a la imagen asociada al 'tileset' en 'boot.js'
     * @param {String} layer Nombre dado a la capa de tiles (tilemap) en 'mapa.json'
     * @param {String} layer2 Nombre dado a la capa de tiles (tilemap) en 'mapa.json'
     */
    createMap(clave, tileWidth, tileHeight, tileset,tileset2, tilesetImg,tilesetImg2, layer, layer2) 
    {
        // creaci??n del mapa:
        const map = this.make.tilemap({
          key: clave,
          tileWidth: tileWidth,
          tileHeight: tileHeight
        });
    
        // asignaci??n de imagenes
        const _tileset = map.addTilesetImage(tileset, tilesetImg);
        const _tileset2 = map.addTilesetImage(tileset2, tilesetImg2);
    
        // creaci??n de layers: 3 principales (fondo, fore y colliders)
        this.backgroundLayer = map.createLayer(layer2, [_tileset2]).setDepth(1);    //fondo
        this.groundLayer = map.createLayer(layer, [_tileset]).setDepth(2);  // Suelo,paredes        
    
        // definici??n de colisiones: -> con propiedad en TILED
        this.groundLayer.setCollisionByProperty({ suelo: true });

        // guarda las dimensiones del mapa
        this.mapWidth = map.width * map.tileWidth;
        this.mapHeight = map.height * map.tileHeight;
        this.map = map; // <--
    }

    /**
     * Constructor del mapa, cada capa usa un ??nico tileset
     * @param {String} clave Nombre dado al 'mapa.json' en 'boot.js'
     * @param {number} tileWidth Tama??o horizontal en pixeles de cada tile
     * @param {number} tileHeight Tama??o vertical en pixeles de cada tile
     * @param {number} N N??mero de layers que definen el mapa
     * @param {String} tileset Nombre dado al 'tileset' en 'mapa.json'
     * @param {String} tilesetIMG Nombre dado a la imagen asociada al 'tileset' en 'boot.js'
     * @param {String} layer Nombre dado a la capa de tiles (tilemap) en 'mapa.json'
     */

    // --- --- --- 

    // --- --- CAMERA --- --- 

    /**
     * Configura todo lo relativo a la c??mara y el mundo de juego.
     * @param {Tuple} scale dimensiones a tener en cuenta
     */
    startCamera(scale) {
        this.configCamera();            // zoom and viewport
        this.centerOnMap(scale);        // center midpoint
        this.worldBounds(scale);        // limits of the world
    }

    /**
     * Ajusta los l??mites del mundo de juego y
     * los par??metros de seguimiento de la c??mara
     * al tama??o del mapa ya creado
     * @param {Phaser.Tilemaps.Tilemap} map Mapa del juego ya creado
     */ 
    configCamera(debug = false)
    {
        // relaci??n de aspecto
        var z = 2.625; // CTE
        let mw = 0; let mh = 0;
        if(this.mw) mw = this.mw;
        if(this.mh) mh = this.mh;
        let zx = z * this.zw / this.logicWidth;
        let zy = z * this.zh / this.logicHeight;

        // establece el zoom y el viewport de la c??mara principal
        this.cameras.main
            .setZoom(zx,zy)
            .setViewport(mw,mh,this.zw,this.zh);

        // debugger: datos del canvas y la c??mara
        if (debug) this.debugCameraAndViewport(z);
    }

    /**
     * Centra y posiciona la c??mara en el centro del mapa
     * @param {Tuple} scale dimensiones a tener en cuenta
     */ 
    centerOnMap(scale) {
        // posiciona la c??mara en el centro del mapa
        let vec2 = this.cameras.main.getScroll(scale.width/2, scale.height/2);
        this.cameras.main.setScroll(vec2.x, vec2.y); 
    }

    /**
     * Ajusta los l??mites f??sicos del mundo de juego
     * @param {Tuple} scale dimensiones a tener en cuenta
     */ 
    worldBounds(scale) {
        // tama??o f??sico del mundo de juego
        this.physics.world.setBounds(scale.width * (-0.25), 0, scale.width * 1.5, scale.height);
    }

    /**
     * Muestra por consola toda la informaci??n relevante de la c??mara y el viewport
     * @param {Number} z N??mero m??gico para la configuraci??n
     */ 
    debugCameraAndViewport(z) {
        const{width,height} = this.scale
        console.log("window.width: " + window.innerWidth + ", window.height: " + window.innerHeight);
        if (this.map) console.log("map.width: " + this.mapWidth + ", map.height: " + this.mapHeight);
        console.log("canvas.width: " + this.canvasWidth + ", canvas.height: " + this.canvasHeight);
        console.log("Game zoom: " + this.game.config.zoom);
        console.log("Camera zoom: " + z);
        console.log("Camera zoom coords: { zx: " + this.cameras.main.zoomX + ", zy: " + this.cameras.main.zoomY + " }");
        console.log("Camera midpoint: { x: " + this.cameras.main.midPoint.x + ", y: " + this.cameras.main.midPoint.y + " }");
        console.log("margen: { mw: "+ this.mw + ", mh: " + this.mh + " }");
    }

    // --- --- --- 

    // --- --- FACTORY --- --- 

    /**
     * Adds a created GameObject to the scene and apply physics.
     * @param {Phaser.GameObjects.GameObject} mob GameObject to add to scene
     * @param {Boolean} physx whether if the will apply physx
     */
    addToScene(mob, physx = false)
    {  
        this.objects.push(mob);
        this.add.existing(mob);
        if (physx) {
            this.physics.add.existing(mob);
            this.physics.add.collider(mob, this.groundLayer);
            mob.body.collideWorldBounds = true;
        }
        return mob;
    }

    addToPhysx(mob){
        this.physics.add.existing(mob);
        mob.body.collideWorldBounds = true;
        return mob;
    }

    resetGroundCollider(mob) {
        if (this.playerGroundCollider) this.playerGroundCollider.destroy();
        this.playerGroundCollider = this.physics.add.collider(mob, this.groundLayer);
    }

    /**
     * Adds a created GameObject to the scene and apply physics.
     * @param {Phaser.GameObjects.GameObject} mob GameObject to add to scene
     * @param {Boolean} physx whether if the will apply physx
     */
    deleteFromScene(mob, physx = false)
    {
        mob.removedFromScene();
        if (physx) mob.disableBody(true, true);
        return mob;
    }

    /**
     * Creates a new random position within the map of the scene.
    */
    randomMapPosition()
    { 
        // position
        let x = Phaser.Math.Between(20, this.mapWidth - 20);
        let y = Phaser.Math.Between(20, this.mapHeight - 20);
         
        return {x,y};
    }

    /**
     * Sets the new position of the GameObject to a random one.
     * @param {Phaser.GameObjects.GameObject} mob GameObject to be positioned
     */
    setRandomMapPosition(mob) {
        const {x,y} = this.randomMapPosition();
        mob.setPosition(x,y);
    }
        
    // --- --- --- 
}
