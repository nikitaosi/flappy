import {KE} from "../gameobjects/KE";

export class StartScene extends Phaser.Scene {
    private startBtn: Phaser.GameObjects.Sprite;

    constructor() {
        super({
            key: KE.SCENE_START
        });
    }


    create():void
    {

        this.add.sprite(this.game.scale.width/2,this.game.scale.height/2-30,KE.SP_LOGO,KE.SP_LOGO_FRAME).setScale(0.7);
        this.startBtn = this.add.sprite(this.game.scale.width/2,this.game.scale.height/2+50,KE.SP_START_BUTTON);

        this.startBtn.setInteractive();
        //var zone = this.add.zone(this.game.scale.width/2,this.game.scale.height/2,this.game.scale.width,this.game.scale.height);
        //Phaser.Display.Align.In.BottomCenter(this.startBtn,zone);
        this.startBtn.on('pointerdown',function () {
            console.log('hello');
            this.scene.start(KE.SCENE_MAIN);
        },this)


    }



}
