export default class Boot extends Phaser.Scene {
    /**
     * Constructor de la escena
     */
    constructor() {
        super({
            key: 'boot'
        });
    }

    preload() {
        console.log("Boot scene")


        // --- PLAYER --- 
        // player spritesheet
        this.load.spritesheet('angel', "./assets/sprites/angel3.png", //cambiar el sprite para la animacion 
            { frameWidth: 91, frameHeight: 72 })
        /*this.load.spritesheet('jetpac', "./assets/sprites/jetpac.png", //cambiar el sprite para la animacion 
            { frameWidth: 17, frameHeight: 24 })*/

        // // jetpack audio
        // this.load.audio('jetpack', './assets/sounds/jetpack2.wav')//cambio mas tarde

        // // walking audio
        // this.load.audio('walk-audio', './assets/sounds/soldier-walk.wav')//cambio mas tarde


        // --- SCENE --- 
        // platform
        this.load.image('platform', './assets/sprites/ground.png')

        // map
        this.load.image('img_tilemap', './assets/sprites/ground.png')
        this.load.image('img_back', './assets/images/donde_sin_ed_menu.jpg')
        this.load.tilemapTiledJSON('nivel', './assets/map/space-jetpac.json')


        // --- OBJECTS --- 
        // object
        this.load.image('object', './assets/sprites/fuel.png')//poti
        //this.load.image('object', './assets/sprites/fuel.png') // brazos
        //this.load.image('object', './assets/sprites/fuel.png') // cabeza
        //this.load.image('object', './assets/sprites/fuel.png') // alas

        // pick audio
        this.load.audio('pick', './assets/sounds/pick.wav')//yo lo dejaria

        /*Todo esto para ataques a distancia*/
        // bullet spritesheet
        this.load.spritesheet('bullet', "./assets/sprites/meteor.png",
            { frameWidth: 16, frameHeight: 14 })

        // explosion spritesheet
        this.load.spritesheet('explosion', "./assets/sprites/explosion.png",
            { frameWidth: 24, frameHeight: 17 })

        // explode audio
        this.load.audio('explode', './assets/sounds/explosion.wav')
        /*------------------------------------------------------------------------*/

        // --- UI --- 
        // button background
        this.load.image('button', './assets/images/button.png')//Esto igual cambiar texto y resultado

        // win audio
        this.load.audio('win', './assets/sounds/win.wav')

        // lose audio
        this.load.audio('lose', './assets/sounds/lose.wav')

    }

    create() {
        // --- PLAYER --- cuadriplicar para cada cosa que se pilla
        // creates walk animation for player
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNames('angel', { start: 4, end: 7 }),
            frameRate: 10,
            repeat: -1
        })

        // creates jump animation for player
        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNames('angel', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        })


        // --- BULLET --- duplicar esto disparo enemigo y disparo player
        // creates bullet animation 
        this.anims.create({
            key: 'fly-bullet',//cambio para decir que es municion
            frames: this.anims.generateFrameNames('bullet', { start: 0, end: 3 }),
            frameRate: 6,
            repeat: -1
        })

        // creates bullet-explosion animation 
        this.anims.create({
            key: 'explote',
            frames: this.anims.generateFrameNames('explosion', { start: 0, end: 2 }),
            frameRate: 5,
            repeat: -1
        })


        // --- START POINT --- 
        // inits the game menu scene
        this.scene.start('menuGame')
    }
}