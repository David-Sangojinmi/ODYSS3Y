export default class Sprite {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.dX = 5;
        this.dY = 70;
        this.gravity = 3;
        this.width = 20;
        this.height = 50;
        this.position = {
            x: 250,
            y: 300,
        };

        this.sprite = new Image();
        this.sprite.src = "images/spritesheet.png";
        this.spritesheetWidth = 112;
        this.spritesheetHeight = 70;
        this.spriteWidth = 28;
        this.totalNumberOfFrames = 4;
        this.imageFrameNumber = 0;
    }

    displaySprite(ctx) {
        sprite.onload = function() {
                setInterval(function() {
                    ctx.clearRect(0, 0, this.gameWidth, this.gameHeight);

                    this.imageFrameNumber++;
                    this.imageFrameNumber = this.imageFrameNumber % this.totalNumberOfFrames;

                    ctx.drawImage(sprite, this.imageFrameNumber * this.spriteWidth,
                        0, this.spriteWidth, this.spritesheetHeight, this.position.x,
                        this.position.y, this.spriteWidth, this.spritesheetHeight);
                }, 100)
        }
        this.position.y += this.gravity;
        if (this.position.y >= this.gameHeight - 80 - this.height) {
            this.position.y = 470;
        }
    }

    moveLeft(ctx) {
        this.position.x -= this.dX;
    }

    moveRight(ctx) {
        this.position.x += this.dX;
    }

    jump(ctx) {
        this.position.y -= this.dY;
    }

    display(ctx) {
        ctx.fillStyle = "purple";
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        // ctx.drawImage(img, this.position.x, this.position.y);
        this.position.y += this.gravity;
        if (this.position.y >= this.gameHeight - 80 - this.height) {
            this.position.y = 470;
        }
    }

    update(deltaTime) {
        if (!deltaTime) return;
    }
}
