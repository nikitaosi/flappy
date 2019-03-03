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
    private static pipe: [Pipe, Pipe, Pipe];
    private grass: Grass;
    private timedEvent: any;
    private player2 : Phaser.Physics.Arcade.Sprite;


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

    MainScene.pipe = [new Pipe(this, 113), new Pipe(this, 193), new Pipe(this, 273)];

    this.grass = new Grass(this, 68, 163, 'gs', 'grass.png');
    console.log(this.grass);
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

        this.timedEvent = this.time.addEvent({ delay: 1, callback: this.callbackMove, callbackScope:this, repeat: -1 });

        this.input.keyboard.on('keydown_G', function (event) {
            console.log(this.timedEvent.paused);
            if (this.timedEvent.paused)
                {this.timedEvent.paused = false} else
                {this.timedEvent.paused = true};
        },this );

    }

    shouldtFlap():boolean {

        return this.player2.body.velocity.y > 70;
    }

    isFalling():boolean {

        return this.player2.body.velocity.y > 100;
    }


    update(time): void {
//        Phaser.Actions.IncX(MainScene.pipe.getChildren(),-1);


        if(this.isFalling())
        {


        }

    }
    callbackMove(): void {
        MainScene.pipe.forEach(function (pipe) { this.movePipe(pipe);}, this);
        this.grass.moveGrass();


    }

    movePipe(pipe): void {
        pipe.children.iterate(function (tpipe) {
            var pipech = <Phaser.Physics.Arcade.Sprite> tpipe;
            pipech.setX(pipech.x-1);
            pipech.refreshBody();
            if (pipech.x < -110) {
                pipe.replacepipe();
            }
        });


};

}
