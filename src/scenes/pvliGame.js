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
import Puerta from '../game/puerta.js'
import Portal from '../game/portal.js'
import { gameComplete, turnOnGameMusic } from '../utils/callbacks.js'
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
        this.sonando = false;
    }
    
    init(args)
    {
        super.init(args);

        // solucion para la musica nada mas empezar
        this.input.once('pointermove', () => {
            if (!this.sonando) {
                if (this.ambConfig.volume === 0.60) this.ambConfig.volume -= 0.35;
                turnOnGameMusic(this);
                this.sonando = true;
            }
        });

        // debugSettings();

        this.checkCollisions(false);

        this.events.on('resume', (scene, args) => { this.player.resetInput(args.optA); } );
    }

    debugSettings(){
        console.log("INITIALISING GAME...");
        console.log('> wasd: ' + (this.optA ? 'encendido' : 'apagado'));
        console.log('> cursores: ' + (this.optB ? 'encendido' : 'apagado'));
        console.log('> vol. general: ' + this.volGen + '%');
    }
    
    preload() 
    {
        console.log(" - pvliGame scene - ")
    }

    create() 
    {
        const{width,height} = this.scale;

        // Creates the player
        this.createPlayer( width * 0.5, height * 0.5, 'angel', this.args);
        
        // Creates the Game Map
        this.switchMap(-1, 0);

        // Sets the camera view
        this.startCamera({ width: this.mapWidth, height: this.mapHeight});

        // resetea la interfaz de usuario
        if (this.UI) this.UI.reset();
    }

    update(t, dt) 
    {
        super.update(t,dt);
        if (this.UI.initC && !this.UI.initP) this.UI.setPlayer(this.playerContainer);
    }

    switchMap(ori, dest) {
        if (this.map) this.clearMap();
        this.loadMap(dest);
        this.initPlayer(true);  // camera follow + groundLayer + player size
        this.createObjects();   // create objects of the actual map
    }

    puerta_switchMap(ori, dest) {
        if (dest === 4) {
            gameComplete(this); // pùerta de salida final!!
        }
        else { 
            this.switchMap(ori, dest);
            
            // busca la puerta destino y reubica al jugador
            this.objects.forEach(obj => {
                if (obj.name === 'puerta') {
                    if (obj.origen === dest && obj.destino === ori) {
                        this.playerContainer.setPosition(obj.x, obj.y - obj.height * 0.5);
                    }
                }
            });
        }
    }

    portal_switchMap(ori, dest, dist) {
        this.switchMap(ori, dest);

        // busca el portal destino y reubica al jugador
        this.objects.forEach(obj => {
            if (obj.name === 'portal') {
                if (obj.origen === dest && obj.destino === ori) {
                    let diff = 0;
                    if (this.player.velocity.y > 0) diff = this.player.height;
                    if (this.player.velocity.y < 0) diff = -this.player.height;
                    this.playerContainer.setPosition(obj.x + dist.X, obj.y + dist.Y + diff * 0.5);
                }
            }
        });
    }

    clearMap() {
        this.objects.forEach(obj => {
            obj.destroy();
        });
        this.map.destroy();
    }

    loadMap(id) {    
        switch (2) {
            case 0:
                this.createMap('nivel00', 16, 16, 'mapa', 'Fondo','img_tilemap', 'img_tilemap2', 'plataformas','fondo' );
                break;  
            case 1:
                this.createMap('nivel01', 16, 16, 'mapa', 'Fondo','img_tilemap', 'img_tilemap2', 'plataformas','fondo' );
                break; 
            case 2:
                this.createMap('nivel02', 16, 16, 'mapa', 'Fondo','img_tilemap', 'img_tilemap2', 'plataformas','fondo' );
                break; 
            case 3:
                this.createMap('nivel03', 16, 16, 'mapa', 'Fondo','img_tilemap', 'img_tilemap2', 'plataformas','fondo' );
                break;
            default:
                break;
        }        
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
                                this.addToScene(new Skeleton(this, objeto.x, objeto.y, objeto.properties), true);
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
                                this.playerContainer.setPosition(objeto.x, objeto.y);  
                                this.playerContainer.changeLevel();   
                                break;
                            case 'Dead':
                                this.objects.push(new DeathZone(this, objeto.x, objeto.y, objeto.width, objeto.height));
                                break;
                            case 'puerta':
                                this.objects.push(new Puerta(this, objeto.x, objeto.y, objeto.width, objeto.height, objeto.properties));
                                break;
                            case 'portal':
                                this.objects.push(new Portal(this, objeto.x, objeto.y, objeto.width, objeto.height, objeto.properties));
                                break;
                            default:
                                break;
                        }
                }
            }
        }
    }
}
