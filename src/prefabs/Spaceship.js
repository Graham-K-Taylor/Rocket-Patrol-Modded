class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue, speed){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.points = pointValue;
        this.moveSpeed = speed;

    }

    update() {
        this.x -= this.moveSpeed;
        if(this.x <= 0 - this.width) {
            this.x = game.config.width;

        }


    }

    reset() {

        this.x = game.config.width;
    }
    updateSpeed(speed){
        this.moveSpeed=speed;
    }

}