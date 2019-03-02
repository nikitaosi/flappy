/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 - 2019 digitsensitive
 * @license      Digitsensitive
 */
import {Player} from "../gameobjects/Player";
import {Pipe} from "../gameobjects/Pipe";
import {Grass} from "../gameobjects/Grass";

export class MainScene extends Phaser.Scene {


  //private player: Player;
  private pipe: Pipe;
  private grass: Grass;


  constructor() {
    super({
      key: "MainScene"
    });
  }

  preload(): void {
    this.load.atlas('gs', './src/boilerplate/assets/gamesprites.png','./src/boilerplate/assets/gamesprites.json' );
  }

  create(): void {

    var background = this.add.sprite(68, 136, 'gs', 'bg.png');
    this.pipe = new Pipe(this, 68, 136);
    this.grass = new Grass(this, 68, 163, 'gs', 'grass.png');
    this.cameras.main.setBackgroundColor('#375064');
    //this.player = new Player(this,100,100,'gs','')
  }

update(): void {
      Phaser.Actions.IncX(this.pipe.getChildren(),-1);
      this.pipe.children.iterate(function (pipe) {
          var tpipe = <Phaser.Physics.Arcade.Sprite> pipe;
          if (tpipe.x<-12) {
              tpipe.x = 145;
          }
      });
}
}
