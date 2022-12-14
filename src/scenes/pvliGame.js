import Magic from '../game/magic.js'
import PlayerContainer from '../game/playerContainer.js'
import Hound from '../game/hound.js'
import Guard from '../game/guard.js'
import Skeleton from '../game/skeleton.js'
import blankGame from './blankGame.js'
import Potion from '../game/potion.js'
import Wings from '../game/wings.js'
import Aura from '../game/aura.js'
import Arm from '../game/arm.js'
import DeathZone from '../game/deathZone.js'
//import Trigger from '../game/trigger.js'

export default class pvliGame extends blankGame
{
    // --- OBJECTS --- 
    /** @type {Phaser.Physics.Arcade.StaticGroup} */    coins

    // --- ENEMIES --- 
    /** @type {Phaser.Physics.Arcade.Group} */          enemies
    
    // --- GAME LOGIC --- 
    /** @type {Number} */                               objectCollected
    /** @type {Number} */                               objectToFinish

    /**
     * Constructor de la escena
     */
    constructor() 
    {
        super('pvliGame');
    }
    
    init(args)
    {
        super.init(args);

        // console.log("INITIALISING GAME...");
        // console.log('> wasd: ' + (this.optA ? 'encendido' : 'apagado'));
        // console.log('> cursores: ' + (this.optB ? 'encendido' : 'apagado'));
        // console.log('> vol. general: ' + this.volGen + '%');

        this.checkCollisions(false);
    }
    
    preload() 
    {
        console.log(" - pvliGame scene - ")
    }

    create() 
    {
        // Creates the Game Map
        this.createMap('nivel', 16, 16, 'mapa', 'Fondo','img_tilemap', 'img_tilemap2', 'plataformas','fondo' );//esto esta 28 21
        // Create background image
        //this.createMapBackground('img_back', this.map);
        this.backgroundLayer.forEachTile(tile => {
            if (tile.properties.permise) {
                boxTiles.push(tile)
            }
        })

        this.createObjects()

        // Creates the enemy
        //this.addToScene(new Hound(this, 30, 100), true);
        //this.addToScene(new Guard(this, 650, this.mapHeight - 50), true);
        //this.addToScene(new Skeleton(this, 620, this.mapHeight - 50), true);
        //this.addToScene(new Trigger(this, 50, 50), true);


        // Crea un objeto para recoger en la escena
        //this.addToScene(new Magic(this, 150, 150), true);
        //this.addToScene(new Potion(this, 300, 100), true);
        //this.addToScene(new Wings(this, 500, 200), true);
        //this.addToScene(new Aura(this, 700, 150), true);
        //this.addToScene(new Arm(this, 800, 150), true);

        // Sets the camera view
        this.startCamera({ width: this.mapWidth, height: this.mapHeight}); 
        
        // this.time.delayedCall(250, this.UI.setPlayer(this.playerContainer));
        // if (this.UI.initC) this.UI.setPlayer(this.playerContainer);
        if (this.UI) this.UI.reset();
    }

    update(t, dt) 
    {
        super.update(t,dt);
        if (this.UI.initC && !this.UI.initP) this.UI.setPlayer(this.playerContainer);
    }

    createObjects() {
        // el tag del ObjectLayer('...') es el mismo que TILED
        for (const objeto of this.map.getObjectLayer('entidades').objects) {
            if (objeto.properties) {
                // console.log("tiene properties");
                // console.log(objeto.properties);
                for (const { name, value } of objeto.properties) {
                    if (name === 'type')
                        switch (value) {
                            case 'hound':
                                this.addToScene(new Hound(this, objeto.x, objeto.y), true);
                                break;
                            case 'Magic':
                                this.addToScene(new Magic(this, objeto.x, objeto.y), true);
                                break;
                            case 'Potion':
                                this.addToScene(new Potion(this, objeto.x, objeto.y), true);
                                break;
                            case 'Guard':
                                this.addToScene(new Guard(this, objeto.x, objeto.y), true);
                                break;
                            case 'Skeleton':
                                this.addToScene(new Skeleton(this, objeto.x, objeto.y), true);
                                break;
                            case 'Potion':
                                this.addToScene(new Potion(this, objeto.x, objeto.y), true);
                                break;
                            case 'Halo':
                                this.addToScene(new Magic(this, objeto.x, objeto.y), true);
                                break;
                            case 'Wings':
                                this.addToScene(new Wings(this, objeto.x, objeto.y), true);
                                break;
                            case 'Arms':
                                this.addToScene(new Arm(this, objeto.x, objeto.y), true);
                                break;
                            case 'Aura':
                                this.addToScene(new Aura(this, objeto.x, objeto.y), true);
                                break;
                            case 'player':
                                // Creates the player
                                this.createPlayer( objeto.x, objeto.y, 'angel', this.args, true);
                                this.initPlayer(true); // allow camara to follow                                
                                break;
                            case 'Dead':
                                this.addToScene(new DeathZone(this, objeto.x, objeto.y, objeto.width, objeto.height), true);
                                break;
                            default:
                                break;
                        }
                }
            }
        }
    }
}
