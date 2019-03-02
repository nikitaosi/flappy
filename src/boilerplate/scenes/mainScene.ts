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
    MainScene.pipe = new Pipe(this);
    this.grass = new Grass(this, 68, 163, 'gs', 'grass.png');
    this.cameras.main.setBackgroundColor('#375064');
    //this.player = new Player(this,100,100,'gs','')
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
    }
}
