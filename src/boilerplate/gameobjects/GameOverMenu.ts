import {KE} from "./KE";
import {MainScene} from "../scenes/mainScene";

export class GameOverMenu extends Phaser.GameObjects.Container{
    private palestar:Phaser.GameObjects.Sprite[];
    private shiningstar:Phaser.GameObjects.Sprite[];

    constructor(scene)
    {

        super(scene)

        var gameover = this.scene.make.sprite({x:68,y:65,key:KE.SP_GAMEOVER,frame: KE.SP_GAMEOVER_FRAME });//   this.create(68, 65, KE.SP_GAMEOVER,  KE.SP_GAMEOVER_FRAME);
        var rating =   this.scene.make.sprite({x:68,y:95,key:KE.SP_RATING,frame: KE.SP_RATING_FRAME   });//  this.create(68, 95,  KE.SP_RATING   ,    KE.SP_RATING_FRAME      );
        var retry =    this.scene.make.sprite({x:68,y:125,key:KE.SP_RETRY,frame: KE.SP_RETRY_FRAME    });//  this.create(68, 125, KE.SP_RETRY    ,     KE.SP_RETRY_FRAME      );

        this.palestar = [];
        this.shiningstar = [];
        this.add([gameover,rating,retry]);

        var gap = 75;
        for (let i = 0; i < 5; i++) {
            this.palestar[i] = this.scene.make.sprite({x:gap,y:98,key:KE.SP_PALESTAR,frame:  KE.SP_PALESTAR_FRAME });
            this.shiningstar[i]=this.scene.make.sprite({x:gap,y:98,key:KE.SP_SHININGSTAR,frame:  KE.SP_SHININGSTAR_FRAME });
            this.shiningstar[i].visible=false;
            gap-=12;
        }

        this.add(this.palestar);
        this.add(this.shiningstar);

         gameover.setScale(2);
         retry.setScale(2);
         retry.setDepth(1);
        let stars = (total) => {if (MainScene.total >= 6) {let result = Math.floor(MainScene.total/3-1); return result;}};

        for (var i = 0; i < stars(MainScene.total); i++) {
            this.shiningstar[i].visible = true;
        }
        console.log(stars(MainScene.total));
         var finalscore =  this.scene.make.bitmapText( {x:101-1, y:90-3, font:'flappyscore', text:''+MainScene.total, size:8});//.setOrigin(0.5);
         var bestscore =  this.scene.make.bitmapText( {x:101-1, y:106-3, font:'flappyscore', text:''+this.scene.data.get('score'),size:8});//.setOrigin(0.5);
         finalscore.setDepth(1);
         bestscore.setDepth(1);
    }


}
