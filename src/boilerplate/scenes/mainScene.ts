/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 - 2019 digitsensitive
 * @license      Digitsensitive
 */
import {Player} from "../gameobjects/Player";

export class MainScene extends Phaser.Scene {


  private phaserSprite: Player;


  constructor() {
    super({
      key: "MainScene"
    });
  }

  preload(): void {
    //this.load.image("logo", "./src/boilerplate/assets/phaser.png");
    this.load.atlas('gs', './src/boilerplate/assets/gamesprites.png','./src/boilerplate/assets/gamesprites.json' );

  }

  create(): void {
   // this.phaserSprite = new Player(this,400, 300, "logo");

    var background = this.add.sprite(68, 136, 'gs', 'bg.png');
    this.cameras.main.setBackgroundColor('#375064');

   // this.phaserSprite.lo

  }
}
