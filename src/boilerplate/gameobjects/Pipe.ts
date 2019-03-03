export class Pipe extends Phaser.Physics.Arcade.StaticGroup {

    private toppipepos: integer;
    private toppipehead: Phaser.Physics.Arcade.Sprite;
    private toppipebody: Phaser.Physics.Arcade.Sprite;
    private bottompipebody: Phaser.Physics.Arcade.Sprite;
    private bottompipehead: Phaser.Physics.Arcade.Sprite;

    constructor(scene, x) {
        super(scene.physics.world, scene);
        this.toppipepos = Phaser.Math.Between(30, 80);
        this.toppipehead = this.create(x-1,  this.toppipepos, 'gs', 'pipe.png');
        this.toppipebody = this.create(x,  this.toppipepos, 'gs', 'pipebody.png');
        this.bottompipebody = this.create(x,  this.toppipepos+73, 'gs', 'pipebody.png');
        this.bottompipehead = this.create(x-1,  this.toppipepos+73, 'gs', 'pipe.png');



        this.toppipehead.flipY = true;
        this.toppipebody.scaleY = 50;
        this.bottompipebody.scaleY = 50;
        this.toppipebody.setOrigin(0,1);
        this.toppipehead.setOrigin(0,0);
        this.bottompipebody.setOrigin(0,0);
        this.bottompipehead.setOrigin(0,1);

    }

    preload(): void {

    }
    replacepipe(): void {
        this.toppipepos = Phaser.Math.Between(30, 80);
        this.toppipehead.setX(133);
        this.toppipebody.setX(135);
        this.bottompipehead.setX(134);
        this.bottompipebody.setX(135);
        this.toppipehead.setY(this.toppipepos);
        this.toppipebody.setY(this.toppipepos);
        this.bottompipebody.setY(this.toppipepos+73);
        this.bottompipehead.setY(this.toppipepos+73);
    }
}