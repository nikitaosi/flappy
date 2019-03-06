import {KE} from "./KE";
import {MainScene} from "../scenes/mainScene";


export class Player extends Phaser.Physics.Arcade.Sprite {

private flap : boolean;
private flapSound : Phaser.Sound.BaseSound;

    constructor(scene,x,y,texture) {
        super(scene,x,y,texture);
        scene.sys.updateList.add(this);
        scene.sys.displayList.add(this);
        scene.physics.world.enableBody(this);

        scene.children.add(this);
        // @ts-ignore
        this.body.allowGravity = false;
        this.setAnimation();
        this.setInput();

        this.flapSound = this.scene.sound.add(KE.S_FLAP);


       // music.play();
    }


    setAnimation():void
    {
        var config = {
            key: 'fly',
            frames: this.scene.anims.generateFrameNumbers('birdanim', { frames: [ 0, 1, 2 ] }),
            frameRate: 10,
            repeat: -1
        };
        this.scene.anims.create(config);
        this.play('fly');
    }



    setInput():void
    {
       if(MainScene.alive == true) {
           this.scene.input.keyboard.on('keydown_SPACE', function (event) {
               this.body.setVelocityY(-100);
               console.log(MainScene.alive);
               this.flapSound.play();
           },this );
       }
    }


    isFalling():boolean {

        return this.body.velocity.y > 80;
    }

    protected preUpdate(time: number, delta: number): void {
        super.preUpdate(time,delta);
       //console.log(this.body.velocity.y);
       //console.log(this.isFalling());

        if(this.isFalling())
        {
            this.anims.pause();
           // this.flap = true;
        }
        else
        {
            this.anims.resume();
         //   this.flap = false;
        }
//

    }




}
