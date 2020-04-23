export default class Sprite {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.dX = 5;
        this.dY = 70;
        this.gravity = 3;
        this.width = 28;
        this.height = 70;
        this.position = {
            x: 250,
            y: 300,
        };

        this.sprite = new Image();
        this.sprite.src = "images/spritesheet.png";
        this.srcX = 0;
        this.srcY = 0;
        this.spritesheetWidth = 112;
        this.spritesheetHeight = 70;
        this.spriteWidth = 28;
        this.totalFrames = 4;
        this.currentFrame = 0;
    }

    updateFrame() {
        this.currentFrame = ++this.currentFrame % this.totalFrames;
        this.srcX = this.currentFrame * this.spriteWidth;
        this.srcY = 0;
    }

    drawSprite(ctx) {
        this.updateFrame();
        ctx.drawImage(this.sprite, this.srcX, this.srcY, this.spriteWidth, this.spritesheetHeight, this.position.x, this.position.y, this.spriteWidth, this.spritesheetHeight);
        
        this.position.y += this.gravity;
        if (this.position.y >= this.gameHeight - 80 - this.height) {
            this.position.y = 470;
        }
    }

    displaySprite(ctx) {
        setInterval(this.drawSprite(ctx), 500000);
        this.position.y += this.gravity;
        if (this.position.y >= this.gameHeight - 80 - 70) {
            this.position.y = 450;
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

    update(deltaTime) {
        if (!deltaTime) return;
    }
}
