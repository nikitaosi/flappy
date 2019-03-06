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


        this.total = 0;
        this.cameras.main.setBackgroundColor('#375064');
        this.player2 = new Player(this, 33, 135 / 2 - 5, 'birdanim')
        MainScene.pipe = [new Pipe(this, 163), new Pipe(this, 243), new Pipe(this, 323)];
        var earth = this.add.sprite(68, 188, KE.SP_EARTH);
        this.grass = new Grass(this, 68, 163, 'gs', 'grass.png');

        earth.depth = 1;
         this.physics.add.collider(this.player2 ,MainScene.pipe,function (e) {
             if( MainScene.alive )
             {
                 this.endGame();
                 MainScene.alive = false;
                 this.timedEvent.paused = true;
             }

            },null, this);
        this.physics.add.collider(this.player2 ,this.grass,function (e) {
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
        MainScene.pipe.forEach(function (pipe) { this.movePipe(pipe);}, this);
        this.grass.moveGrass();


    }

    endGame(): void {
        if (MainScene.alive) {this.cameras.main.fadeIn(200, 255, 255, 255);}
            var gameover = this.add.sprite(68, 65, KE.SP_GAMEOVER, KE.SP_GAMEOVER_FRAME);
            var rating = this.add.sprite(68, 95, KE.SP_RATING, KE.SP_RATING_FRAME);
            var retry = this.add.sprite(68, 125, KE.SP_RETRY, KE.SP_RETRY_FRAME);
            var palestar = this.add.sprite(75, 98, KE.SP_PALESTAR, KE.SP_PALESTAR_FRAME);
            var palestar = this.add.sprite(63, 98, KE.SP_PALESTAR, KE.SP_PALESTAR_FRAME);
            var palestar = this.add.sprite(51, 98, KE.SP_PALESTAR, KE.SP_PALESTAR_FRAME);
            var palestar = this.add.sprite(39, 98, KE.SP_PALESTAR, KE.SP_PALESTAR_FRAME);
            var palestar = this.add.sprite(27, 98, KE.SP_PALESTAR, KE.SP_PALESTAR_FRAME);
            switch (true) {
                case this.total<3:
                    break;

                case this.total<6:
                    var shiningstar = this.add.sprite(75, 98, KE.SP_SHININGSTAR, KE.SP_SHININGSTAR_FRAME);
                    break;

                case this.total<9:
                    var shiningstar = this.add.sprite(75, 98, KE.SP_SHININGSTAR, KE.SP_SHININGSTAR_FRAME);
                    var shiningstar = this.add.sprite(63, 98, KE.SP_SHININGSTAR, KE.SP_SHININGSTAR_FRAME);
                    break;

                case this.total<12:
                    var shiningstar = this.add.sprite(75, 98, KE.SP_SHININGSTAR, KE.SP_SHININGSTAR_FRAME);
                    var shiningstar = this.add.sprite(63, 98, KE.SP_SHININGSTAR, KE.SP_SHININGSTAR_FRAME);
                    var shiningstar = this.add.sprite(51, 98, KE.SP_SHININGSTAR, KE.SP_SHININGSTAR_FRAME);
                    break;

                case this.total<15:
                    var shiningstar = this.add.sprite(75, 98, KE.SP_SHININGSTAR, KE.SP_SHININGSTAR_FRAME);
                    var shiningstar = this.add.sprite(63, 98, KE.SP_SHININGSTAR, KE.SP_SHININGSTAR_FRAME);
                    var shiningstar = this.add.sprite(51, 98, KE.SP_SHININGSTAR, KE.SP_SHININGSTAR_FRAME);
                    var shiningstar = this.add.sprite(39, 98, KE.SP_SHININGSTAR, KE.SP_SHININGSTAR_FRAME);
                    break;

                case this.total<18:
                    var shiningstar = this.add.sprite(75, 98, KE.SP_SHININGSTAR, KE.SP_SHININGSTAR_FRAME);
                    var shiningstar = this.add.sprite(63, 98, KE.SP_SHININGSTAR, KE.SP_SHININGSTAR_FRAME);
                    var shiningstar = this.add.sprite(51, 98, KE.SP_SHININGSTAR, KE.SP_SHININGSTAR_FRAME);
                    var shiningstar = this.add.sprite(39, 98, KE.SP_SHININGSTAR, KE.SP_SHININGSTAR_FRAME);
                    var shiningstar = this.add.sprite(27, 98, KE.SP_SHININGSTAR, KE.SP_SHININGSTAR_FRAME);
                    break;
            };
            gameover.setScale(2);
            retry.setScale(2);
            retry.setDepth(1);
            this.scoreText.visible = false;
            var finalscore = this.add.bitmapText( 101, 90, 'flappyscore', ''+this.total, 6).setOrigin(0.5);
            var bestscore = this.add.bitmapText( 101, 106, 'flappyscore', ''+this.data.get('score'), 6).setOrigin(0.5);
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
