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
    private timedEvent: any;

    public static gameStart :boolean;

    constructor() {
        super({
            key: KE.SCENE_MAIN
        });
    }



    create(): void {


        var background = this.add.sprite(68, 136, 'gs', 'bg.png');


        var earth = this.add.image(68, 188, KE.SP_EARTH, KE.SP_EARTH_PATH);
        earth.depth = 1;
        MainScene.pipe = [new Pipe(this, 113), new Pipe(this, 193), new Pipe(this, 273)];
        this.grass = new Grass(this, 68, 163, 'gs', 'grass.png');
        this.cameras.main.setBackgroundColor('#375064');
        this.player2 = new Player(this, 33, 135 / 2 - 5, 'birdanim')
        this.physics.add.collider(this.player2 ,MainScene.pipe,function (e) {this.timedEvent.paused = true;},null,this);
        this.physics.add.collider(this.player2 ,this.grass,function (e) {this.timedEvent.paused = true;},null,this);
        this.input.keyboard.on('keydown_G', function (event) {
            console.log(this.timedEvent.paused);
            if (this.timedEvent.paused)
            {this.timedEvent.paused = false} else
            {this.timedEvent.paused = true};
        },this );
       // this.startGame();
       // this.
    }

    startGame():void
    {
        this.timedEvent = this.time.addEvent({ delay: 1, callback: this.callbackMove, callbackScope:this, repeat: -1 });
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
