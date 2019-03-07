import {KE} from "./KE";
import {MainScene} from "../scenes/mainScene";
import ScaleModes = Phaser.ScaleModes;


export class Player extends Phaser.Physics.Arcade.Sprite {

private flap : boolean;
private flapSound : Phaser.Sound.BaseSound;
private mainScene : MainScene;
private tween : Phaser.Tweens.Tween;
private tweens: Phaser.Tweens.Tween[];

private tweenline: Phaser.Tweens.Timeline;

    constructor(scene,x,y,texture) {
        super(scene,x,y,texture);
        scene.sys.updateList.add(this);
        scene.sys.displayList.add(this);
        scene.physics.world.enableBody(this);
        //this.setScaleMode(ScaleModes.LINEAR);
        this.mainScene = scene;
        this.tweens = [];
        scene.children.add(this);
        // @ts-ignore
        this.body.allowGravity = false;
        this.setAnimation();
        this.setInput();
        this.flapSound = this.scene.sound.add(KE.S_FLAP);
       // music.play();

        //this.tweenline = this.mainScene.tweens.timeline({targets:this,ease:'Power1',duration:500,
        //tweens:[
        //    {
        //        angle: {
        //                       getEnd: function (target, key, value)
        //                       {
        //                           return -30;
        //                       },
////
        //                       getStart: function (target, key, value)
        //                       {
        //                           return target.angle;
        //                       }
        //        }
        //    },
        //    {
        //        angle: {
        //            getEnd: function (target, key, value)
        //            {
        //                return 90;
        //            },
////
        //            getStart: function (target, key, value)
        //            {
        //                return target.angle;
        //            }
        //        }
        //    },
        //]
        //})
    }

    setAnimation():void
    {
        this.play('fly');
    }

    setInput():void
    {
           this.scene.input.keyboard.on('keydown_SPACE', function (event) {
              if(!MainScene.gameStart)
              {
                  this.mainScene.startGame();
                  // @ts-ignore
                  this.body.allowGravity = true;
                  MainScene.gameStart = true;
                  console.log("GAME START");
              }
               if(MainScene.alive  && !MainScene.hitPipe && this.y>0) {
               this.body.setVelocityY(-100);

                this.flapSound.play();
                 //  this.tweenline.stop();

                   //this.tweenline.resetTweens(true);
                   // this.tweenline.play();
                //this.tweens.push(this.getRotationTween(-30, (function() {this.tweens.push(this.getRotationTween(90));}).bind(this)));
               }

               }
           ,this );

    }


    //getRotationTween(angle:integer,fn?: Function ):Phaser.Tweens.Tween
    //{
    //    var tween = this.mainScene.tweens.add({
    //        targets: this,
    //        duration: 600,
    //        delay:400,
    //        angle: {
    //            getEnd: function (target, key, value)
    //            {
    //                return angle;
    //            },
//
    //            getStart: function (target, key, value)
    //            {
    //                return target.angle;
    //            }
    //        },
    //        onComplete:fn
    //    });
    //    return tween;
    //}
//

    moveDown():void
    {

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


    }




}
