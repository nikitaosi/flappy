/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 - 2019 digitsensitive
 * @license      Digitsensitive
 */
import {Player} from "../gameobjects/Player";
import {Pipe} from "../gameobjects/Pipe";
import {Grass} from "../gameobjects/Grass";

export class MainScene extends Phaser.Scene {


    private player: Player;
    private static pipe: Pipe;
    private grass: Grass;

  private player2 : Phaser.Physics.Arcade.Sprite;


    constructor() {
    super({
      key: "MainScene"
    });
    }

    preload(): void {
    this.load.atlas('gs', './src/boilerplate/assets/gamesprites.png','./src/boilerplate/assets/gamesprites.json' );
        this.load.spritesheet('birdanim','./src/boilerplate/assets/bird.png',{ frameWidth: 17, frameHeight: 12 });
    }

    create(): void {

    var background = this.add.sprite(68, 136, 'gs', 'bg.png');
    MainScene.pipe = new Pipe(this);
    this.grass = new Grass(this, 68, 163, 'gs', 'grass.png');
    this.cameras.main.setBackgroundColor('#375064');
    //this.player = new Player(this,100,100,'gs','')

        var config = {
            key: 'fly',
            frames: this.anims.generateFrameNumbers('birdanim', { frames: [ 0, 1, 2 ] }),
            frameRate: 10,
            repeat: -1
        };

        this.anims.create(config);

        this.player2 = this.physics.add.sprite(33, 135/2-5, 'birdanim');
        this.player2.play('fly');

        this.input.keyboard.on('keydown_SPACE', function (event) {

            // console.log('GAME BEGIN');
            // block.setVelocity(Phaser.Math.Between(200, 400), Phaser.Math.Between(200, 400));
            //this.gameBegin = true;
            this.player2.body.setVelocityY(-100);
        },this );

    }

    shouldtFlap():boolean {

        return this.player2.body.velocity.y > 70;
    }

    isFalling():boolean {

        return this.player2.body.velocity.y > 100;
    }


    update(): void {
//        Phaser.Actions.IncX(MainScene.pipe.getChildren(),-1);

        MainScene.pipe.children.iterate(function (tpipe) {
           var pipech = <Phaser.Physics.Arcade.Sprite> tpipe;
           pipech.setX(pipech.x-1);
              pipech.refreshBody();
           if (pipech.x < -25) {
               MainScene.pipe.replacepipe()
           }
        });

        if(this.isFalling())
        {


        }

    }


}
