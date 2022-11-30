export default class Boot extends Phaser.Scene 
{
    /**
     * Constructor de la escena
     */
    constructor() {
      super({
        key: 'boot'
      });
    }

    preload() 
    {
        console.log("Boot scene")

        // --- PLAYER --- 
        // player spritesheet
        this.load.spritesheet('angel', "./assets/sprites/jugador/victoria.png", //cambiar el sprite para la animacion 
        { frameWidth: 122, frameHeight: 95 }) 
        // player proyectile
        this.load.image('object', './assets/sprites/jugador/calabaza.png')
        // player attack
        this.load.spritesheet('attackSpr', './assets/sprites/jugador/attack1.png',
        { frameWidth: 32, frameHeight: 32 }) 
        // player jump power
        this.load.image('jump', './assets/sprites/jugador/barrita.png');

        // --- ENEMIGOS ---
        // Lobo - idle
        this.load.spritesheet('houndIdleSprite', "./assets/sprites/houndSprites/hound-idle.png",
        { frameWidth: 42, frameHeight: 24 })
        // Lobo - walk
        this.load.spritesheet('houndWalkSprite', "./assets/sprites/houndSprites/hound-walk.png",
        { frameWidth: 45, frameHeight: 26 })
        // Lobo - run
        this.load.spritesheet('houndRunSprite', "./assets/sprites/houndSprites/hound-run.png",
        { frameWidth: 42, frameHeight: 24 })

        // --- OBJETOS ---


        // // jetpack audio
        // this.load.audio('jetpack', './assets/sounds/jetpack2.wav')//cambio mas tarde
    
        // // walking audio
        // this.load.audio('walk-audio', './assets/sounds/soldier-walk.wav')//cambio mas tarde
        

        // --- SCENE --- 
        // platform
        this.load.image('platform', './assets/sprites/escenario/ground.png')

        // background
        this.load.image('img_back', './assets/images/background.jpg')
        this.load.image('img_back2', './assets/images/fondo-ladrillos.jpg')
        this.load.image('img_back3', './assets/images/victoria-de-samotracia__1080x567v2.png')

        // map
        this.load.image('img_tilemap', './assets/sprites/escenario/ground.png')
        this.load.tilemapTiledJSON('nivel', './assets/map/nivel0.json')


        // --- OBJECTS --- 
        // object
        //this.load.image('object', './assets/sprites/fuel.png') // brazos
        //this.load.image('object', './assets/sprites/fuel.png') // cabeza
        //this.load.image('object', './assets/sprites/fuel.png') // alas

        // pocion
        this.load.spritesheet('potiSprite', "./assets/sprites/llena.png",
        { frameWidth: 16, frameHeight: 16 })

        // pick audio
        this.load.audio('pick', './assets/sounds/pick.wav')//yo lo dejaria

        /*Todo esto para ataques a distancia*/
        // bullet spritesheet
        // this.load.spritesheet('bullet', "./assets/sprites/meteor.png", 
        //     { frameWidth: 16, frameHeight: 14 }) 
        
        // explosion spritesheet
        // this.load.spritesheet('explosion', "./assets/sprites/explosion.png", 
        //     { frameWidth: 24, frameHeight: 17 }) 

        // explode audio
        this.load.audio('explode', './assets/sounds/explosion.wav')
        /*------------------------------------------------------------------------*/

        // --- UI --- 
        // button background
        this.load.image('button', './assets/images/btn-piedra.png')//Esto igual cambiar texto y resultado

        // win audio
        this.load.audio('win', './assets/sounds/win.wav')

        // lose audio
        this.load.audio('lose', './assets/sounds/lose.wav')

        this.load.spritesheet('controls', "./assets/images/controles.png",
          { frameWidth: 308, frameHeight: 168 })

    }

    create() 
    {      
        // --- PLAYER --- 
        // creates walk animation for player
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNames('angel', { start: 0, end: 0 }),
            frameRate: 2,
            repeat: -1
        })

        // creates walk animation for player
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNames('angel', { start: 20, end: 27 }),
            frameRate: 8,
            repeat: -1
        })

        // creates jump animation for player
        this.anims.create({
          key: 'jump',
          frames: this.anims.generateFrameNames('angel', { start: 10, end: 18 }),
          frameRate: 9,
          repeat: -1
        })
        // creates attack animation for player
        this.anims.create({
          key: 'attack',
          frames: this.anims.generateFrameNames('attackSpr', { start: 0, end: 5 }),
          frameRate: 5,
          repeat: 0
        })

        // --- Enemigos --- cuadriplicar para cada cosa que se pilla
        // creates walk animation for hound
        this.anims.create({
          key: 'wolf_idle',
          frames: this.anims.generateFrameNames('houndIdleSprite', { start: 0, end: 5 }),
          frameRate: 5,
          repeat: -1
        })
        this.anims.create({
          key : 'wolf_running',
          frames : this.anims.generateFrameNumbers('houndRunSprite', {start: 0, end: 4}),
          frameRate: 10,
          repeat: -1 // Bucle de animación
        });
        this.anims.create({
          key : 'wolf_walk',
          frames : this.anims.generateFrameNumbers('houndWalkSprite', {start: 0, end : 11}),
          frameRate : 10,
          repeat: -1
        });

        // --- BULLET --- duplicar esto disparo enemigo y disparo player
        // creates bullet animation 
        // this.anims.create({
        //   key: 'fly-bullet',//cambio para decir que es municion
        //   frames: this.anims.generateFrameNames('bullet', { start: 0, end: 3 }),
        //   frameRate: 6,
        //   repeat: -1
        // })

        // creates bullet-explosion animation 
        // this.anims.create({
        //   key: 'explote',
        //   frames: this.anims.generateFrameNames('explosion', { start: 0, end: 2 }),
        //   frameRate: 5,
        //   repeat: -1
        // })


        // --- START POINT --- 
        // inits the game menu scene
        this.scene.start('menuGame');
    }
}