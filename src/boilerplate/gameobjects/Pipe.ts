export class Pipe extends Phaser.GameObjects.Group {

    constructor(scene,x,y) {
        super(scene,x,y);
        var toppipebody = this.create(113, 26, 'gs', 'pipebody.png');
        var toppipehead = this.create(113, 46, 'gs', 'pipe.png');
        var bottompipebody = this.create(113, 137, 'gs', 'pipebody.png');
        var bottompipehead = this.create(113, 90, 'gs', 'pipe.png');

        toppipehead.flipY = true;
        toppipebody.scaleY = 13;
        bottompipebody.scaleY = 20;
    }

    preload(): void {

    }
}