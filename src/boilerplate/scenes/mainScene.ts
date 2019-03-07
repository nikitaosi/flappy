/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 - 2019 digitsensitive
 * @license      Digitsensitive
 */
import {Player} from "../gameobjects/Player";
import {Pipe} from "../gameobjects/Pipe";
import {Grass} from "../gameobjects/Grass";
import {KE} from "../gameobjects/KE";

export class MainScene extends Phaser.Scene {


    private player2: Player;
    private static pipe: [Pipe, Pipe, Pipe];
    private grass: Grass;
    private timedEvent: Phaser.Time.TimerEvent;
    private total: integer;
    private scoreText: Phaser.GameObjects.BitmapText;
    private scoreText2: Phaser.GameObjects.BitmapText;
    private bounds: BitmapTextSize;
    public static alive: boolean;
    static gameStart: boolean;
    private ghost: Phaser.GameObjects.Sprite;
    private tap: Phaser.GameObjects.Sprite;
    private scoreSound: Phaser.Sound.BaseSound;
    private deadSound: Phaser.Sound.BaseSound;

    constructor() {
        super({
            key: KE.SCENE_MAIN
        });
    }
    preload(): void {
        this.load.bitmapFont('flappyscore', './src/boilerplate/assets/text.png', './src/boilerplate/assets/text.xml');
    };

    create(): void {

        this.scoreSound = this.sound.add(KE.S_SCORE);
        this.deadSound = this.sound.add(KE.S_DEAD);
        this.scoreText = this.add.bitmapText( 67, 10, 'flappyscore', '0', 12).setOrigin(0.5);
        this.scoreText.visible = false;
        if (this.data.get('score') === undefined) {this.data.set('score', 0)};
       // this.scoreText2 = this.add.bitmapText( 67, 25, 'flappyscore', 'best: ' + this.data.get('score'), 12).setOrigin(0.5);
        MainScene.alive = true;

        var background = this.add.sprite(68, 136,KE.SP_BG,KE.SP_BG_FRAME);


        this.total = 0;
        this.cameras.main.setBackgroundColor('#375064');
        this.player2 = new Player(this, 33, 135 / 2 - 5, KE.SPH_BIRD)
        MainScene.pipe = [new Pipe(this, 163), new Pipe(this, 243), new Pipe(this, 323)];
        var earth = this.add.sprite(68, 188, KE.SP_EARTH);
        this.grass = new Grass(this, 68, 163, 'gs', 'grass.png');

         earth.depth = 1;
        this.physics.add.collider(this.player2 ,MainScene.pipe,function (e) {
            if( MainScene.alive )
            {
                this.deadSound.play();
                this.endGame();
                MainScene.alive = false;
                this.timedEvent.paused = true;
            }

           },null, this);
        this.physics.add.collider(this.player2 ,this.grass,function (e) {
            if( MainScene.alive )
            {
                this.deadSound.play();
                this.endGame();
                MainScene.alive = false;
                this.timedEvent.paused = true;
            }



        },null,this);
        this.player2.body.isCircle = true;
        //this.timedEvent = this.time.addEvent({ delay: 1, callback: this.callbackMove, callbackScope:this, repeat: -1 });

        this.cameras.main.fadeIn(300,0,0,0).on('camerafadeincomplete',function () {
            //this.scene.start(KE.SCENE_MAIN);
            console.log('MAIN_SCENE');
        },this)


        this.tap = this.add.sprite(this.game.scale.width/2+12,100,KE.SP_TAPBTN,);
        this.ghost = this.add.sprite(this.game.scale.width/2,65,KE.SP_GHOST_BIRD);

        this.tweens.add({
            targets: this.tap,
            y: this.tap.y-5,
            duration: 1000,
            ease: function (t) {
                return Math.pow(Math.sin(t * 3), 3);
            },
            delay: 100,
            loop:-1
        });
    }

   startGame():void
   {
       this.timedEvent = this.time.addEvent({ delay: 1, callback: this.callbackMove, callbackScope:this, repeat: -1 });
       this.tap.setVisible(false);
       this.ghost.setVisible(false);
       this.scoreText.visible = true;
   }

    callbackMove(): void {
        MainScene.pipe.forEach(function (pipe) { this.movePipe(pipe);}, this);
        this.grass.moveGrass();


    }

    endGame(): void {
        if (MainScene.alive == true) {this.cameras.main.fadeIn(200, 255, 255, 255);}
            this.input.keyboard.on('keydown_SPACE', function (event) {
                this.scene.restart();
                MainScene.gameStart = false;
                console.log('GAME END');

            },this);
    }

   movePipe(pipe): void {
       pipe.children.iterate(function (tpipe) {
           if (tpipe instanceof Phaser.Physics.Arcade.Sprite) {
               let pipech = <Phaser.Physics.Arcade.Sprite> tpipe;
               pipech.x-=1;
               pipech.refreshBody();
               if (pipech.x < -110) {
                   pipe.replacepipe();
           }}
           else {
               let pipech = <Phaser.GameObjects.Zone> tpipe;
               pipech.x-=1;
                   if (!pipech.body.touching.none) {
                       this.scoreSound.play();
                       this.total++;
                       console.log(this.total);
                       pipech.body.checkCollision.none = true;
                       this.scoreText.setText(this.total);
                       if (this.total > this.data.get('score')){
                           this.data.set('score', this.total);
                       };
                   }
               };
       }, this);
   };
}
