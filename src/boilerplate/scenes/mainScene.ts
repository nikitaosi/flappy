/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 - 2019 digitsensitive
 * @license      Digitsensitive
 */
import {Player} from "../gameobjects/Player";
import {Pipe} from "../gameobjects/Pipe";
import {Grass} from "../gameobjects/Grass";

export class MainScene extends Phaser.Scene {


    player2: Player;
    private static pipe: [Pipe, Pipe, Pipe];
    private grass: Grass;
    private timedEvent: Phaser.Time.TimerEvent;
    public physics2 : Phaser.Physics.Arcade.World;

  constructor() {
    super({
      key: "MainScene"
    });
  }

  preload(): void {
    this.load.atlas('gs', './src/boilerplate/assets/gamesprites.png','./src/boilerplate/assets/gamesprites.json' );
        this.load.spritesheet('birdanim','./src/boilerplate/assets/bird.png',{ frameWidth: 17, frameHeight: 12 });
    this.load.image('123', './src/boilerplate/assets/earth.png');
    };
    create(): void {

    var background = this.add.sprite(68, 136, 'gs', 'bg.png');
    var earth = this.add.image(68, 188, '123', './src/boilerplate/assets/earth.png');
    earth.depth = 1;
        this.player2 = new Player(this, 33, 135 / 2 - 5, 'birdanim')
    MainScene.pipe = [new Pipe(this, 113), new Pipe(this, 193), new Pipe(this, 273)];

    this.grass = new Grass(this, 68, 163, 'gs', 'grass.png');
    this.cameras.main.setBackgroundColor('#375064');

      //     this.physics.add.collider(this.player2 ,MainScene.pipe,function (e) {this.timedEvent.paused = true; this.scene.restart();},null,this);
        this.physics.add.collider(this.player2 ,this.grass,function (e) {this.timedEvent.paused = true; /*this.scene.restart();*/},null,this);

        this.timedEvent = this.time.addEvent({ delay: 1, callback: this.callbackMove, callbackScope:this, repeat: -1 });

        this.input.keyboard.on('keydown_G', function (event) {
            console.log(this.timedEvent.paused);
            if (this.timedEvent.paused)
                {this.timedEvent.paused = false;} else
                {this.timedEvent.paused = true};
        },this );

    }

    callbackMove(): void {
        MainScene.pipe.forEach(function (pipe) { this.movePipe(pipe);}, this);
        this.grass.moveGrass();


    }

    movePipe(pipe): void {
        pipe.children.iterate(function (tpipe) {

            if(tpipe instanceof Phaser.GameObjects.Zone)
            {

                let pipech = <Phaser.GameObjects.Zone> tpipe;

                //pipech.x-=1;



              // pipech.setActive(false);
              // pipech.setVisible(false);

                //console.log(tpipe.x);
                 pipech.x-=1;
            }

            if(tpipe instanceof Phaser.Physics.Arcade.Sprite)
            {
                let pipech = <Phaser.Physics.Arcade.Sprite> tpipe;
                pipech.setX(pipech.x-1);
                pipech.refreshBody();
                if (pipech.x < -110) {
                    pipe.replacepipe();
                }
            }


        },this);
    };
}
