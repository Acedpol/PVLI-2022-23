import Magic from '../game/magic.js'
import PlayerContainer from '../game/playerContainer.js'
import Bullet from '../game/bullet.js'
import Hound from '../game/hound.js'
import blankGame from './blankGame.js'
import Potion from '../game/potion.js'
import Wings from '../game/wings.js'
import Aura from '../game/aura.js'

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
        this.createMap('nivel', 16, 16, 'mapa', 'img_tilemap2', 'plataformas');//esto esta 28 21
        
        // Create background image
        this.createMapBackground('img_back', this.map);

        // Creates the player
        this.createPlayer(this.mapWidth * 0.5, this.mapHeight * 0.5, 'angel', this.args, true);
        this.initPlayer(true); // allow camara to follow

        // Creates the enemy
        this.addToScene(new Hound(this, 30, 100), true);

        // Crea un objeto para recoger en la escena
        this.addToScene(new Magic(this, 150, 150), true);
        this.addToScene(new Potion(this, 300, 100), true);
        this.addToScene(new Wings(this, 500, 200), true);
        this.addToScene(new Aura(this, 700, 150), true);

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
}
