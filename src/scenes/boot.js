import { startMain } from "../utils/callbacks.js";

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
        console.log("- boot scene -")

        // --- PLAYER --- 
        // player spritesheets
        this.load.spritesheet('angelF', "./assets/sprites/jugador/victoriaSinCorona.png", //Final 
        { frameWidth: 122, frameHeight: 95 }) 
       
        this.load.spritesheet('angel0', "./assets/sprites/jugador/victoriaSinBrazos.png", //con nada 
        { frameWidth: 122, frameHeight: 95 }) 
        
        this.load.spritesheet('angel1', "./assets/sprites/jugador/victoriaSinAlas.png", //sin Alas
        { frameWidth: 122, frameHeight: 95 }) 
        
        this.load.spritesheet('angel2', "./assets/sprites/jugador/victoriaSinCabeza.png", //sin Cabeza 
        { frameWidth: 122, frameHeight: 95 }) 
              
        // player attack
        this.load.spritesheet('attackSpr', './assets/sprites/jugador/attack1.png',
        { frameWidth: 32, frameHeight: 32 }) 

        // player lives 
        this.load.image('lifeSpr', './assets/sprites/jugador/stoneHeart.png');

        // player jump power
        this.load.image('jumpBar', './assets/sprites/jugador/barrita.png');

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


        // guard - idle
        this.load.spritesheet('guardIdleSprite', "./assets/sprites/guardSprites/idle.png",
        { frameWidth: 19, frameHeight: 25 })

        // guard - shoot
        this.load.spritesheet('guardShootSprite', "./assets/sprites/guardSprites/shoot.png",
        { frameWidth: 54, frameHeight: 39 })

        // guard - charge
        this.load.spritesheet('guardChargeSprite', "./assets/sprites/guardSprites/charge.png",
        { frameWidth: 35, frameHeight: 39 })

        // guard - wake
        this.load.spritesheet('guardWakeSprite', "./assets/sprites/guardSprites/wake.png",
        { frameWidth: 31, frameHeight: 38 })

        // guard - sleep
        this.load.spritesheet('guardSleepSprite', "./assets/sprites/guardSprites/sleep.png",
        { frameWidth: 31, frameHeight: 38 })

        // guard - damaged
        this.load.spritesheet('guardDamagedSprite', "./assets/sprites/guardSprites/damaged.png",
        { frameWidth: 31, frameHeight: 39 })
        
        // guard - death
        this.load.spritesheet('guardDeathSprite', "./assets/sprites/guardSprites/death.png",
        { frameWidth: 44, frameHeight: 39 })

        // guard - proyectile
        this.load.spritesheet('guardProyectile', "./assets/sprites/guardSprites/proyectile.png",
        { frameWidth: 23, frameHeight: 13 })

        // skeleton - idle
        this.load.spritesheet('skeletonIdleSprite', "./assets/sprites/Skeleton/SkeletonIdle.png",
        { frameWidth: 24, frameHeight: 37 })

        // skeleton - walk
        this.load.spritesheet('skeletonWalkSprite', "./assets/sprites/Skeleton/SkeletonWalk.png",
        { frameWidth: 22, frameHeight: 37 })

        // skeleton - attack
        this.load.spritesheet('skeletonAttackSprite', "./assets/sprites/Skeleton/SkeletonAttack.png",
        { frameWidth: 43, frameHeight: 37 })

        // skeleton - hit
        this.load.spritesheet('skeletonHitSprite', "./assets/sprites/Skeleton/SkeletonHit.png",
        { frameWidth: 30, frameHeight: 32 })

        // skeleton - dead
        this.load.spritesheet('skeletonDeadSprite', "./assets/sprites/Skeleton/SkeletonDead.png",
        { frameWidth: 33, frameHeight: 32 })
        


        // // guard - walk
        // this.load.spritesheet('guardMoveSprite', "./assets/sprites/guardSprites/move.png",
        // { frameWidth: 41, frameHeight: 39 })

        // --- OBJECTS --- 
        // object
        //this.load.image('object', './assets/sprites/fuel.png') // brazos
        //this.load.image('object', './assets/sprites/fuel.png') // cabeza
        //this.load.image('object', './assets/sprites/fuel.png') // alas

        // pocion
        this.load.spritesheet('potiSprite', "./assets/sprites/llena.png",
        { frameWidth: 16, frameHeight: 16 })
		    
        //alas
        this.load.spritesheet('alasSprite', "./assets/sprites/jugador/alas.png", 
        { frameWidth: 32, frameHeight: 32 })
        
        //aureola
        this.load.spritesheet('aureolaSprite', "./assets/sprites/jugador/aureola.png", 
        { frameWidth: 32, frameHeight: 32 })
        
        //aureola
        this.load.spritesheet('brazoSprite', "./assets/sprites/jugador/brazo.png",
        { frameWidth: 32, frameHeight: 31 })
        
        // --- SCENE --- 

        // background
        this.load.image('img_back', './assets/images/background.jpg')
        this.load.image('img_back2', './assets/images/fondo-ladrillos.jpg')
        this.load.image('img_back3', './assets/images/victoria-de-samotracia__1080x567v2.png')

        // map
        this.load.image('img_tilemap', './assets/sprites/escenario/old-dark-castle-interior-tileset.png')
        this.load.image('img_tilemap2', './assets/sprites/escenario/gothic-castle-background.png')

        this.load.tilemapTiledJSON('nivel', './assets/map/nivel03.json')

        // --- UI --- 
        // button background
        this.load.image('button', './assets/images/btn-piedra.png')//Esto igual cambiar texto y resultado
        this.load.spritesheet('controls', "./assets/images/controles.png",
        { frameWidth: 308, frameHeight: 168 })
        
        this.load.spritesheet('speaker', "./assets/images/speaker3.png",
        { frameWidth: 256, frameHeight: 235 })

        //Audios
        // pick audio
        this.load.audio('pick', './assets/sounds/pick.wav')//yo lo dejaria

        // pick audio
        this.load.audio('musica_menu', './assets/sounds/musicafondocastelvania.mp3')//yo lo dejaria

        // explode audio
        this.load.audio('explode', './assets/sounds/explosion.wav')

        // player attack audio
        this.load.audio('player_attack', './assets/sounds/attack.wav')//

        // player magic audio
        this.load.audio('player_magic', './assets/sounds/magic.wav')//
        
        // player hit audio
        this.load.audio('player_hit', './assets/sounds/hit.wav')//

        // player death audio
        this.load.audio('player_dead', './assets/sounds/death.wav')//

        // wolf audio 
        this.load.audio('bark', './assets/sounds/barking.wav') //

        // bone audio
        this.load.audio('bone', './assets/sounds/bone.wav')   //
        
        // blaster audio
        this.load.audio('blaster', './assets/sounds/blaster.wav')

        // metal audio
        this.load.audio('metal', './assets/sounds/metal.wav')
        
        // win audio
        this.load.audio('win', './assets/sounds/win.wav')
        
        // lose audio
        this.load.audio('lose', './assets/sounds/lose.wav')
        
        /*------------------------------------------------------------------------*/
        
    }

    create() 
    {      
        // --- PLAYER --- 
        // creates walk animation for player
        this.anims.create({
          key: 'idle0',
          frames: this.anims.generateFrameNames('angel0', { start: 0, end: 0 }),
          frameRate: 2,
          repeat: -1
      })

      // creates walk animation for player
      this.anims.create({
          key: 'walk0',
          frames: this.anims.generateFrameNames('angel0', { start: 20, end: 27 }),
          frameRate: 8,
          repeat: -1
      })

      // creates jump animation for player
      this.anims.create({
        key: 'jump0',
        frames: this.anims.generateFrameNames('angel0', { start: 10, end: 18 }),
        frameRate: 9,
        repeat: -1
      })

      // creates hit animation
      this.anims.create({
        key: 'hit0',
        frames: this.anims.generateFrameNames('angel0', { start: 50, end: 51 }),
        frameRate: 6,
        repeat: 1
      })

      // creates death animation
      this.anims.create({
        key: 'death0',
        frames: this.anims.generateFrameNames('angel0', { start: 60, end: 65 }),
        frameRate: 4,
        repeat: 0
      })

      // creates walk animation for player
      this.anims.create({
        key: 'idle1',
        frames: this.anims.generateFrameNames('angel1', { start: 0, end: 0 }),
        frameRate: 2,
        repeat: -1
      })

    // creates walk animation for player
    this.anims.create({
        key: 'walk1',
        frames: this.anims.generateFrameNames('angel1', { start: 20, end: 27 }),
        frameRate: 8,
        repeat: -1
    })

    // creates jump animation for player
    this.anims.create({
      key: 'jump1',
      frames: this.anims.generateFrameNames('angel1', { start: 10, end: 18 }),
      frameRate: 9,
      repeat: -1
    })

    // creates attack animation
    this.anims.create({
      key: 'attack1',
      frames: this.anims.generateFrameNames('angel1', { start: 40, end: 43 }),
      frameRate: 8,
      repeat: 0
    })

    // creates hit animation
    this.anims.create({
      key: 'hit1',
      frames: this.anims.generateFrameNames('angel1', { start: 50, end: 51 }),
      frameRate: 6,
      repeat: 1
    })

    // creates death animation
    this.anims.create({
      key: 'death1',
      frames: this.anims.generateFrameNames('angel1', { start: 60, end: 65 }),
      frameRate: 4,
      repeat: 0
    })

    // creates walk animation for player
    this.anims.create({
      key: 'idle2',
      frames: this.anims.generateFrameNames('angel2', { start: 0, end: 0 }),
      frameRate: 2,
      repeat: -1
  })

  // creates walk animation for player
  this.anims.create({
      key: 'walk2',
      frames: this.anims.generateFrameNames('angel2', { start: 20, end: 27 }),
      frameRate: 8,
      repeat: -1
  })

  // creates jump animation for player
  this.anims.create({
    key: 'jump2',
    frames: this.anims.generateFrameNames('angel2', { start: 10, end: 18 }),
    frameRate: 9,
    repeat: -1
  })

  // creates attack animation
  this.anims.create({
    key: 'attack2',
    frames: this.anims.generateFrameNames('angel2', { start: 40, end: 43 }),
    frameRate: 8,
    repeat: 0
  })

  // creates hit animation
  this.anims.create({
    key: 'hit2',
    frames: this.anims.generateFrameNames('angel2', { start: 50, end: 51 }),
    frameRate: 6,
    repeat: 1
  })

  // creates death animation
  this.anims.create({
    key: 'death2',
    frames: this.anims.generateFrameNames('angel2', { start: 60, end: 65 }),
    frameRate: 4,
    repeat: 0
  })

  // creates walk animation for player
  this.anims.create({
    key: 'idle3',
    frames: this.anims.generateFrameNames('angelF', { start: 0, end: 0 }),
    frameRate: 2,
    repeat: -1
  })

// creates walk animation for player
this.anims.create({
    key: 'walk3',
    frames: this.anims.generateFrameNames('angelF', { start: 20, end: 27 }),
    frameRate: 8,
    repeat: -1
})

// creates jump animation for player
this.anims.create({
  key: 'jump3',
  frames: this.anims.generateFrameNames('angelF', { start: 10, end: 18 }),
  frameRate: 9,
  repeat: -1
})

// creates attack animation
this.anims.create({
  key: 'attack3',
  frames: this.anims.generateFrameNames('angelF', { start: 40, end: 43 }),
  frameRate: 8,
  repeat: 0
})

// creates hit animation
this.anims.create({
  key: 'hit3',
  frames: this.anims.generateFrameNames('angelF', { start: 50, end: 51 }),
  frameRate: 6,
  repeat: 1
})

// creates death animation
this.anims.create({
  key: 'death3',
  frames: this.anims.generateFrameNames('angelF', { start: 60, end: 65 }),
  frameRate: 4,
  repeat: 0
})

  // creates animation of players spell
  this.anims.create({
    key: 'attack',
    frames: this.anims.generateFrameNames('attackSpr', { start: 0, end: 4 }),
    frameRate: 7,
    repeat: 0
  })

  // --- Enemigos --- cuadriplicar para cada cosa que se pilla
  // Hound animations
  // creates idle animation
  this.anims.create({
    key: 'wolf_idle',
    frames: this.anims.generateFrameNames('houndIdleSprite', { start: 0, end: 5 }),
    frameRate: 5,
    repeat: -1
  })
  // creates run animation
  this.anims.create({
    key : 'wolf_running',
    frames : this.anims.generateFrameNumbers('houndRunSprite', {start: 0, end: 4}),
    frameRate: 10,
    repeat: -1 // Bucle de animación
  });
  // creates walk animation
  this.anims.create({
    key : 'wolf_walk',
    frames : this.anims.generateFrameNumbers('houndWalkSprite', {start: 0, end : 11}),
    frameRate : 10,
    repeat: -1
  });
  
  // //Guard
  // creates idle animation
  this.anims.create({
    key : 'guard_idle',
    frames : this.anims.generateFrameNumbers('guardIdleSprite', {start: 0, end : 0}),
    frameRate : 10,
    repeat: -1
  });

  // creates shoot animation
  this.anims.create({
    key : 'guard_shoot',
    frames : this.anims.generateFrameNumbers('guardShootSprite', {start: 0, end : 3}),
    frameRate : 5,
    repeat: 0
  });

  // creates charge animation
  this.anims.create({
    key : 'guard_charge',
    frames : this.anims.generateFrameNumbers('guardChargeSprite', {start: 0, end : 3}),
    frameRate : 5,
    repeat: -1
  });

  // creates wake animation
  this.anims.create({
    key : 'guard_wake',
    frames : this.anims.generateFrameNumbers('guardWakeSprite', {start: 0, end : 4}),
    frameRate : 5,
    repeat: 0
  });
  // creates sleep animation
  this.anims.create({
    key : 'guard_sleep',
    frames : this.anims.generateFrameNumbers('guardSleepSprite', {start: 0, end : 4}),
    frameRate : 5,
    repeat: 0
  });
  // creates damaged animation
  this.anims.create({
    key : 'guard_damaged',
    frames : this.anims.generateFrameNumbers('guardDamagedSprite', {start: 0, end : 1}),
    frameRate : 5,
    repeat: 1
  });
  // creates death animation
  this.anims.create({
    key : 'guard_death',
    frames : this.anims.generateFrameNumbers('guardDeathSprite', {start: 0, end : 5}),
    frameRate : 7,
    repeat: 0
  });

  //Skeleton
  // creates idle animation
  this.anims.create({
    key : 'skeleton_idle',
    frames : this.anims.generateFrameNumbers('skeletonIdleSprite', {start: 0, end : 10}),
    frameRate : 15,
    repeat: -1
  });

  // creates walk animation
  this.anims.create({
    key : 'skeleton_walk',
    frames : this.anims.generateFrameNumbers('skeletonWalkSprite', {start: 0, end : 12}),
    frameRate : 15,
    repeat: -1
  });

  // creates attack animation
  this.anims.create({
    key : 'skeleton_attack',
    frames : this.anims.generateFrameNumbers('skeletonAttackSprite', {start: 0, end : 17}),
    frameRate : 15,
    repeat: 0
  });

  // creates hit animation
  this.anims.create({
    key : 'skeleton_hit',
    frames : this.anims.generateFrameNumbers('skeletonHitSprite', {start: 0, end : 7}),
    frameRate : 10,
    repeat: 0
  });

  // creates dead animation
  this.anims.create({
    key : 'skeleton_dead',
    frames : this.anims.generateFrameNumbers('skeletonDeadSprite', {start: 0, end : 14}),
    frameRate : 15,
    repeat: 0
  });


  // creates bullet-explosion animation 
  // this.anims.create({
  //   key: 'explote',
  //   frames: this.anims.generateFrameNames('explosion', { start: 0, end: 2 }),
  //   frameRate: 5,
  //   repeat: -1
  // })


  // --- START POINT --- 
  // inits the game menu scene
  this.optA = true; 
  this.optB = false; 
  this.volGen = 20;
  this.volAmb = 80;
  this.volSFX = 80;
  this.mute = false;
  startMain(this);
}
}
