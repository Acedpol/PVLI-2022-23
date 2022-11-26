import Magic from '../game/magic.js'
import PlayerContainer from '../game/playerContainer.js'
import Bullet from '../game/bullet.js'
import Hound from '../game/hound.js'
import blankGame from './blankGame.js'
import Potion from '../game/potion.js'

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
    
    init(optA)
    {
        super.init(optA);
        this.optA = optA;
        console.log("wasd: " + this.optA);
        this.checkCollisions(false);
    }

    preload() 
    {
        console.log(" - pvliGame scene - ")
    }

    create() 
    {
        // Creates the Game Map
        this.createMap('nivel', 18, 21, 'platform', 'img_tilemap', 'plataformas');
        
        // Create background image
        this.createMapBackground('img_back', this.map);
        
        // Creates the player
        this.createPlayer(this.mapWidth * 0.5, this.mapHeight * 0.5, 'angel', this.optA);

        // Sets the camera view
        this.startCamera({ width: this.mapWidth, height: this.mapHeight});

        // Creates the enemy
        this.addToScene(new Hound(this, 30, 100));

        // Crea un objeto para recoger en la escena
        this.addToScene(new Magic(this, 150, 150));
        this.addToScene(new Potion(this, 300, 100));
    }

    update(t, dt) 
    {
        super.update(t,dt);
    }
}
