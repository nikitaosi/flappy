import {KE} from "../gameobjects/KE";

export class PreloadScene extends Phaser.Scene {

    constructor() {
        super({
            key: KE.SCENE_PRELOAD
        });
    }

    preload(): void {
        this.load.atlas(KE.AT_GS, KE.AT_GS_PATH,KE.AT_GS_JSON,);
        this.load.atlas(KE.AT_UI, KE.AT_UI_PATH,KE.AT_UI_JSON,);
        this.load.spritesheet(KE.SPH_BIRD,KE.SPH_BIRD_PATH,{ frameWidth: 17, frameHeight: 12 });
        this.load.audio(KE.S_FLAP,KE.S_FLAP_PATH);
        this.load.audio(KE.S_SCORE,KE.S_SCORE_PATH);
        this.load.audio(KE.S_DEAD,KE.S_DEAD_PATH);
        this.load.audio(KE.S_FALL,KE.S_FALL_PATH);
        this.load.image(KE.SP_EARTH, KE.SP_EARTH_PATH);
        this.load.image(KE.SP_GHOST_BIRD, KE.SP_GHOST_BIRD_PATH);
        this.load.image(KE.SP_TAPBTN, KE.SP_TAPBTN_PATH);
        this.load.image(KE.SP_START_BUTTON, KE.SP_START_BUTTON_PATH);



        var progress = this.add.graphics();

        this.load.on('progress', function (value) {

            progress.clear();
            progress.fillStyle(0xffffff, 1);
            progress.fillRect(10, 100, 115 * value, 20);

        });

        this.load.on('complete', function () {

            progress.destroy();

        });

    };

    create(): void
    {

        this.scene.start(KE.SCENE_START);
    }



}
