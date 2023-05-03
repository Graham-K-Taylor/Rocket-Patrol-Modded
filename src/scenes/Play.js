class Play extends Phaser.Scene {
    constructor() {
      super("playScene");
    }
    preload() {
        // load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('particle', './assets/particle.png');
        this.load.image('invada', './assets/invada.png');
        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }
    create() {
        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*5, borderUISize*4, 'spaceship',0,30, game.settings.spaceshipSpeed).setOrigin(0,0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*2, borderUISize*5 + borderPadding*2, 'spaceship',0,20, game.settings.spaceshipSpeed).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship',0,10, game.settings.spaceshipSpeed).setOrigin(0,0);
        this.ship04 = new Spaceship(this, game.config.width+ borderUISize*7, borderUISize*6 + borderPadding*4, 'invada',0,40, game.settings.spaceshipSpeed * 1.5).setOrigin(0,0);
        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        MOUSE = this.input.mousePointer;
        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });
        // initialize score
        this.p1Score = 0;
        this.p1Time = 0;
          // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        let TimeConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
        this.timeLeft = this.add.text(borderUISize + borderPadding + 200, borderUISize + borderPadding*2, this.clock, TimeConfig);
        // GAME OVER flag
        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        /*this.clock = this.time.delayedCall(60000, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this); */ 
        this.startTime = new Date();
        if(game.twoplayer && game.playerone){
            this.secondplayer = false;
        }
        else if(game.twoplayer){
            this.secondplayer = true;
        }
        this.isSpeedy = false;
    }
    update() {
        // check key input for restart
        let currentTime = new Date();

        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 400
        }
        if(!this.gameOver){
            this.timeLeft.text = Phaser.Math.RoundTo(((game.settings.gameTimer+this.p1Time+(this.startTime.getTime() - currentTime.getTime())) * .001),0);
        }
        if(!this.isSpeedy && -(this.startTime.getTime() - currentTime.getTime()) > 30000){
            this.ship01.updateSpeed(game.settings.spaceshipSpeed * 2);
            this.ship02.updateSpeed(game.settings.spaceshipSpeed * 2);
            this.ship03.updateSpeed(game.settings.spaceshipSpeed * 2);
            this.ship04.updateSpeed(game.settings.spaceshipSpeed * 3);
            this.isSpeedy = true;
        }
        if((-(this.startTime.getTime() - currentTime.getTime())-this.p1Time) >= (game.settings.gameTimer) && !this.gameOver){
            if(!game.twoplayer){
                this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
                this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart', scoreConfig).setOrigin(0.5);
            }
            else if(!this.secondplayer){
                this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER P1', scoreConfig).setOrigin(0.5);
                this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to start P2', scoreConfig).setOrigin(0.5);
                game.playerone = false;
                game.scoreplayerone = this.p1Score;
            }
            else{
                this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
                this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart', scoreConfig).setOrigin(0.5);
                this.add.text(game.config.width/2, game.config.height/2 + 96, 'P1 Score:' + game.scoreplayerone, scoreConfig).setOrigin(0.5);
                this.add.text(game.config.width/2, game.config.height/2 + 128, 'P2 Score:' + this.p1Score, scoreConfig).setOrigin(0.5);
                game.playerone = true;

            }
            this.gameOver = true;
            if(this.p1Score > game.highScore){
               game.highScore = this.p1Score; 
            }
            
        }
        
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        if (!this.gameOver) {               
            this.p1Rocket.update();         // update rocket sprite
            this.ship01.update();           // update spaceships (x3)
            this.ship02.update();
            this.ship03.update();
            this.ship04.update();
        } 
        this.starfield.tilePositionX -= 4;
        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship04)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship04);
            this.p1Time += 4000;
        }
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
            this.p1Time += 3000;
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
            this.p1Time += 2000;
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
            this.p1Time += 1000;
        }
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
          rocket.x + rocket.width > ship.x && 
          rocket.y < ship.y + ship.height &&
          rocket.height + rocket.y > ship. y) {
          return true;
        } else {
          return false;
        }
    }

    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;
        //let particleEmitter = new particleEmitter()
        /*let emitter = this.add.particles(ship.x,ship.y, 'particle', {
            lifespan: 4000,
            speed: {min:150, max:450},
            scale: {start:1.2, end:0},
            gravityY: 150,
            blendMode:'ADD',
            emitting: false
        });*/
        let particles = this.add.particles('particle');
        let emitter = particles.createEmitter();
        emitter.setPosition(ship.x, ship.y);
        emitter.setSpeed(200);
        emitter.setBlendMode(Phaser.BlendModes.ADD);

        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');
        emitter.explode(20);             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
          ship.reset();                         // reset ship position
          ship.alpha = 1;                       // make ship visible again
          boom.destroy();
          particles.destroy();                       // remove explosion sprite
        });  
        // score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        this.sound.play('sfx_explosion');      
    }
}