export class Grass extends Phaser.Physics.Arcade.StaticGroup {



    constructor(scene,x,y,texture,frame) {
        super(scene.physics.world, scene);
        super.create(x,y,texture,frame);
        super.create(x+165,y,texture,frame);

    }

    preload(): void {

    }

    create(): void {

    }

    moveGrass(): void {
        this.children.iterate(function (tpipe) {
            var pipech = <Phaser.Physics.Arcade.Sprite> tpipe;
            pipech.setX(pipech.x-1);
            pipech.refreshBody();
            if (pipech.x < -100) {
                this.replaceGrass(pipech);
            }
        }, this);
        };

    replaceGrass(grass): void {
        grass.setX(229);
        };

}