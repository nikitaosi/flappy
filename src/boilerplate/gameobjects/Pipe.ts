export class Pipe extends Phaser.Physics.Arcade.Group {



    constructor(scene,x,y) {
        super(scene,x,y);
        this.create(68, 60, 'gs', 'pipebody.png');
        this.create(68, 70, 'gs', 'pipe.png');
        this.create(68, 80, 'gs', 'pipebody.png');
        this.create(68, 90, 'gs', 'pipe.png');
    }

    preload(): void {

    }
    }
