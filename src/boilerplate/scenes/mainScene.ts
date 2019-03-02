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
  private  pipe: Pipe;
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
    this.pipe = new Pipe(this);
    this.grass = new Grass(this, 68, 163, 'gs', 'grass.png');
    this.cameras.main.setBackgroundColor('#375064');

    //this.add.group(this.pipe);

   // this.player = new Player(this,100,50,'birdanim')
  //  this.children.add(this.player);

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






    //this.add.sprite(55, 135/2-5, 'birdanim').play('fly');


  }
    shouldtFlap():boolean {

        return this.player2.body.velocity.y > 70;
    }

    isFalling():boolean {

      return this.player2.body.velocity.y > 100;
  }

update(): void {
    //  Phaser.Actions.IncX(this.pipe.getChildren(),-1,);


    this.pipe.children.iterate(function (pipe) {
        var tpipe = <Phaser.Physics.Arcade.Sprite> pipe;
        tpipe.setX(tpipe.x-1);
        tpipe.refreshBody();
        if (tpipe.x<-12) {
            tpipe.x = 145;
        }
    });

   //if(this.player2.body.velocity.y <0)
   //{

   //}

    if(this.isFalling())
    {


    }

}
}
