/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 - 2019 digitsensitive
 * @license      Digitsensitive
 */
import {Player} from "../gameobjects/Player";
import {Pipe} from "../gameobjects/Pipe";
import {Grass} from "../gameobjects/Grass";
import {KE} from "../gameobjects/KE";
import {GameOverMenu} from "../gameobjects/GameOverMenu";

export class MainScene extends Phaser.Scene {


    private player2: Player;
    private static pipe: [Pipe, Pipe, Pipe];
    private grass: Grass;
    private timedEvent: Phaser.Time.TimerEvent;
    public static total: integer;
    private scoreText: Phaser.GameObjects.BitmapText;
    private scoreText2: Phaser.GameObjects.BitmapText;
    private bounds: BitmapTextSize;
    public static alive: boolean;
    static gameStart: boolean;
    public static hitPipe: boolean;
    private fallSound : Phaser.Sound.BaseSound;

    constructor() {
        super({
            key: KE.SCENE_MAIN
        });
    }
    preload(): void {
        this.load.bitmapFont('flappyscore', './src/boilerplate/assets/text.png', './src/boilerplate/assets/text.xml');
    };

    create(): void {
        this.scoreText = this.add.bitmapText( 67, 10, 'flappyscore', '0', 12).setOrigin(0.5);
        if (this.data.get('score') === undefined) {this.data.set('score', 0)};
        //this.scoreText2 = this.add.bitmapText( 67, 25, 'flappyscore', 'best: ' + this.data.get('score'), 12).setOrigin(0.5);
        MainScene.alive = true;
        var background = this.add.sprite(68, 136, 'gs', 'bg.png');

        MainScene.hitPipe = false;
        this.fallSound = this.sound.add(KE.S_FALL);

        MainScene.total = 0;
        this.cameras.main.setBackgroundColor('#375064');
        this.player2 = new Player(this, 33, 135 / 2 - 5, 'birdanim')
        MainScene.pipe = [new Pipe(this, 163), new Pipe(this, 243), new Pipe(this, 323)];
        var earth = this.add.sprite(68, 188, KE.SP_EARTH);
        this.grass = new Grass(this, 68, 163, 'gs', 'grass.png');
        earth.depth = 1;
        this.player2.depth = 1;
         this.physics.add.collider(this.player2 ,MainScene.pipe,function (ob1, ob2) {
                 MainScene.hitPipe = true;
                 this.fallSound.play();
            },null, this);
        this.physics.add.collider(this.player2 ,this.grass, function (e) {
            if( MainScene.alive )
            {
                this.endGame();
                MainScene.alive = false;
                this.timedEvent.paused = true;
            }
        },null,this);
        this.player2.body.isCircle = true;
        //this.timedEvent = this.time.addEvent({ delay: 1, callback: this.callbackMove, callbackScope:this, repeat: -1 });



    }

   startGame():void
   {
       this.timedEvent = this.time.addEvent({ delay: 1, callback: this.callbackMove, callbackScope:this, repeat: -1 });
   }

    callbackMove(): void {
        if (!MainScene.hitPipe){
            MainScene.pipe.forEach(function (pipe) { this.movePipe(pipe);}, this);
            this.grass.moveGrass();
        } else
        {MainScene.pipe.forEach(function (pipe) { this.pipeBodiesOff(pipe);}, this);}
    }

    endGame(): void {
        if (MainScene.alive) {this.cameras.main.fadeIn(200, 255, 255, 255);}
            this.add.existing(new GameOverMenu(this));
            this.input.keyboard.on('keydown_SPACE', function (event) {
                this.scene.restart();
                this.timedEvent.paused = true;
                MainScene.gameStart = false;
                console.log('GAME END');
            },this);
    }

    pipeBodiesOff(pipe): void {
       pipe.children.iterate(function (tpipe) {
           if (tpipe instanceof Phaser.Physics.Arcade.Sprite) {
               let pipech = <Phaser.Physics.Arcade.Sprite> tpipe;
                   pipech.disableBody(true);
           }
       }, this);
   }

   movePipe(pipe): void {
       pipe.children.iterate(function (tpipe) {
           if (tpipe instanceof Phaser.Physics.Arcade.Sprite) {
               let pipech = <Phaser.Physics.Arcade.Sprite> tpipe;
               pipech.x-=1;
               pipech.refreshBody();
               if (pipech.x < -110) {
                   pipe.replacepipe();
           }
       }
           else {
               let pipech = <Phaser.GameObjects.Zone> tpipe;
               pipech.x-=1;
                   if (!pipech.body.touching.none) {
                       MainScene.total++;
                       console.log(MainScene.total);
                       pipech.body.checkCollision.none = true;
                       this.scoreText.setText(MainScene.total);
                       this.scoreText.visible = true;
                       this.scoreText.setDepth(2);
                       if (MainScene.total > this.data.get('score')){
                           this.data.set('score', MainScene.total);
                       };
                   }
               };
       }, this);
   };
}
