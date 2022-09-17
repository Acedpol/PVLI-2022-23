export default class MenuGeom extends Phaser.Scene 
{
    /**
     * Constructor de la escena
     */
    constructor() 
    {
        super({
            key: 'menuGeomGame'
        });
    }

    preload() 
    {
        console.log("Menu Geometric scene")
    }

    create() 
    {
        // gets the sizes of the screen
        const{width,height} = this.scale

        // compone el titulo y subtitulo del menu principal del juego
        this.add.text(width * 0.5, 25, 'JetPac Game', {
                fontSize: 14,
                fontFamily: 'Pixeled',
                fontStyle: 'bold', 
                color: '#FFFFFF'
            })
            .setOrigin(0.5)

        this.add.text(width * 0.5, 45, 'Selecciona un nivel de dificultad', {
                fontSize: 8,
                fontFamily: 'Pixeled',
                color: '#FFFFFF'
            })
            .setOrigin(0.5)

        // Three buttons, Three Levels on Difficulty //

        // easy
        let rect1 = new Phaser.Geom.Rectangle(width * 0.5, height * 0.4, width * 0.4, height * 0.125)
        this.createButtonGameRect(rect1, 'Fácil', 1)

        // medium
        let rect2 = new Phaser.Geom.Rectangle(width * 0.5, height * 0.55, width * 0.4, height * 0.125)
        this.createButtonGameRect(rect2, 'Intermedio', 2)

        // hard
        let rect3 = new Phaser.Geom.Rectangle(width * 0.5, height * 0.7, width * 0.4, height * 0.125)
        this.createButtonGameRect(rect3, 'Difícil', 3)

        // pointer click event: buen intento!
        /*
        this.input.on('pointerdown', function (pointer) {

            var isInside = Phaser.Geom.Rectangle.ContainsPoint(rect1, pointer)
            var isInside2 = Phaser.Geom.Rectangle.ContainsPoint(rect2, pointer)
            var isInside3 = Phaser.Geom.Rectangle.ContainsPoint(rect3, pointer)

            if (isInside) scene.start('jetpacGame', 1)
            else if (isInside2) this.initGame(2)
            else if (isInside3) this.initGame(3)
        });
        */  
       
        // pointer click event
        this.setInteractiveZone(rect1, 1)
        this.setInteractiveZone(rect2, 2)
        this.setInteractiveZone(rect3, 3)
    }

    update() 
    {

    }

    /**
    * @param {number} lv Nivel de dificultad
     */
    initGame(lv)
    {
        // inits the game main scene
        this.scene.start('jetpacGame', lv)
    }

    /**
     * Hace la zona que corresponde al rectangulo interactiva
     * @param {Phaser.Geom.Rectangle} rect Rectangulo usado en el fondo del button
     * @param {Number} lv Nivel de dificultad
     */
    setInteractiveZone(rect, lv)
    {
        let x = rect.x + rect.width * 0.5
        let y = rect.y + rect.height * 0.5

        // sets the zone that is interactive
        var zone = this.add.zone(x, y, rect.width, rect.height)
            .setInteractive({
                hitArea: rect,
                useHandCursor: true
            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, ()=>{
                this.initGame(lv)
            })
    }

    /**
     * Constructor del button con geometría de phaser (rectangle)
     * @param {Phaser.Geom.Rectangle} rect Rectangulo usado en el fondo del button
     * @param {String} name Texto ubicado en en el button
     * @param {number} lv Nivel de dificultad
     */
    createButtonGameRect(rect, name, lv)
    {
        // gets the sizes of the screen
        const{width,height} = this.scale

        // selecciona el color del texto, del relleno y del borde
        let _color, _fill, _line
        if (lv == 1) 
        {
            _color = '#0000FF' //
            _fill = 0xffffff
            _line = 0x0000ff
        }
        else if (lv == 2) 
        {
            _color = '#00FF00' //
            _fill = 0x440044
            _line = 0x00ff00
        }
        else if (lv == 3) 
        {
            _color = '#FF0000' //
            _fill = 0x111111
            _line = 0xff0000
        }

        // compone el button con un texto
        this.add.text(rect.x, rect.y, name, {
                fontSize: 14,
                fontFamily: 'Pixeled',
                fontStyle: 'bold', 
                color: _color
            })
            .setOrigin(0.5)
            .setDepth(1)

        // reposiciona el rectangulo
        rect.setPosition(rect.x - rect.width * 0.5, rect.y - rect.height * 0.475)

        /** @type {Phaser.GameObjects.Graphics} */
        let graphics = this.add.graphics({ 
            lineStyle: {
                width: 2,
                color: _line,
                alpha: 0.75
            },
            fillStyle: { 
                color: _fill, alpha: 0.85 
            } 
        })

        // how to paint/fill this rectangle
        graphics.fillRectShape(rect)
        graphics.strokeRectShape(rect)
    }
}
