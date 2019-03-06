import {KE} from "../gameobjects/KE";
import {Grass} from "../gameobjects/Grass";

export class StartScene extends Phaser.Scene {
    private startBtn: Phaser.GameObjects.Sprite;
    private bird: Phaser.GameObjects.Sprite;
    private timedEvent: Phaser.Time.TimerEvent;
    private grass: Grass;

    constructor() {
        super({
            key: KE.SCENE_START
        });
    }


    create():void
    {
        this.cameras.main.setBackgroundColor('#375064');
        var bg = this.add.sprite(68, 136, KE.SP_BG, KE.SP_BG_FRAME);
        this.add.sprite(this.game.scale.width/2,this.game.scale.height/2-30,KE.SP_LOGO,KE.SP_LOGO_FRAME).setScale(0.7);
        this.startBtn = this.add.sprite(this.game.scale.width/2,this.game.scale.height/2+50,KE.SP_START_BUTTON);
        this.bird = this.add.sprite(this.game.scale.width/2,this.game.scale.height/2,KE.SPH_BIRD);
        var config = {
            key: 'fly',
            frames: this.anims.generateFrameNumbers('birdanim', { frames: [ 0, 1, 2 ] }),
            frameRate: 10,
            repeat: -1
        };
        this.anims.create(config);


        this.bird.play('fly');

        this.tweens.add({
            targets: this.bird,
            y: this.bird.y-5,
            duration: 1000,
            ease: function (t) {
                return Math.pow(Math.sin(t * 3), 3);
            },
            delay: 100,
            loop:-1
        });

        this.startBtn.setInteractive();
        //var zone = this.add.zone(this.game.scale.width/2,this.game.scale.height/2,this.game.scale.width,this.game.scale.height);
        //Phaser.Display.Align.In.BottomCenter(this.startBtn,zone);
        this.startBtn.on('pointerdown',function () {


            this.cameras.main.fadeOut(1000,0,0,0).on('camerafadeoutcomplete',function () {
                this.scene.start(KE.SCENE_MAIN);
                console.log('MAIN_SCENE');
            },this)



        },this)

        var earth = this.add.sprite(68, 188, KE.SP_EARTH);
        this.grass = new Grass(this, 68, 163, 'gs', 'grass.png');

        this.timedEvent = this.time.addEvent({ delay: 1, callback: this.move, callbackScope:this, repeat: -1 });
    }

    move()
    {
        this.grass.moveGrass();
    }




}
