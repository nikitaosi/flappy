/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 - 2019 digitsensitive
 * @license      Digitsensitive
 */
import {Player} from "../gameobjects/Player";
import {Pipe} from "../gameobjects/Pipe";
import {Grass} from "../gameobjects/Grass";

export class MainScene extends Phaser.Scene {


    private player2: Player;
    private static pipe: Pipe;
    private grass: Grass;
    private gameStart : boolean;
    private rotation : number;
    private speed : number;

  //private player2 : Phaser.Physics.Arcade.Sprite;


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
        this.gameStart = false;
        var background = this.add.sprite(68, 136, 'gs', 'bg.png');
        MainScene.pipe = new Pipe(this);
        this.grass = new Grass(this, 68, 163, 'gs', 'grass.png');
        this.cameras.main.setBackgroundColor('#375064');
        this.player2 = new Player(this, 33, 135 / 2 - 5, 'birdanim')

        this.physics.add.collider(this.player2 ,MainScene.pipe,function (e) {this.gameStart = false;},null,this);
        this.speed = Phaser.Math.GetSpeed( 600, 12);
    }


    update(time,delta): void {

        if(true)
        {
            MainScene.pipe.children.iterate(function (tpipe) {
                var pipech = <Phaser.Physics.Arcade.Sprite> tpipe;
                pipech.x-=this.speed*delta;
                pipech.refreshBody();
                if (pipech.x < -25) {
                  //  MainScene.pipe.replacepipe()
                }
            },this);

        }
    }


}
