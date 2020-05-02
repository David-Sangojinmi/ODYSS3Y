export default class Sprite {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.width = 28;
        this.height = 70;
        this.position = {
            x: 250,
            y: 300,
        };

        this.jumping = true;
        this.movingLeft = false;
        this.movingRight = false;
        this.dX = 0;
        this.dY = 0;

        // Animation
        this.sprite = new Image();
        this.sprite.src = "images/terrainset1.png";
        // this.sprite.src = "images/spritesheet.png";
        this.srcX = 0;
        this.srcY = 0;
        this.spritesheetWidth = 240;
        this.spritesheetHeight = 72;
        this.spriteWidth = 30;
        this.totalFrames = this.spritesheetWidth / this.spriteWidth;
        this.currentFrame = 0;
        this.fpsCount = 0;
        this.scale = 1.2;
    }

    updateFrame() {
        this.fpsCount++;
        if (this.fpsCount % 5 == 0) {
            this.currentFrame = ++this.currentFrame % this.totalFrames;
        }
        this.srcX = this.currentFrame * this.spriteWidth;
        // if (this.jumping === false && this.movingLeft === false && this.movingRight === false) {
        //     this.srcY = 0;
        // }
        // if (this.movingLeft === true || this.movingRight === true) {
        //     this.srcY = 1;
        // }
    }

    drawIdleSprite(ctx) {
        this.updateFrame();
        ctx.drawImage(this.sprite, this.srcX, 0, this.spriteWidth, this.spritesheetHeight, this.position.x, this.position.y, this.spriteWidth, this.spritesheetHeight);
    }

    drawMovingLeft(ctx) {
        this.updateFrame();
        ctx.drawImage(this.sprite, this.srcX, 72, this.spriteWidth, this.spritesheetHeight, this.position.x, this.position.y, this.spriteWidth, this.spritesheetHeight);
    }

    drawMovingRight(ctx) {
        this.updateFrame();
        ctx.drawImage(this.sprite, this.srcX, 72, this.spriteWidth, this.spritesheetHeight, this.position.x, this.position.y, this.spriteWidth, this.spritesheetHeight);
    }

    drawJumpingSprite(ctx) {
        // Draw jumping
    }

    displaySprite(ctx) {
        if (this.jumping === false && this.movingLeft === false && this.movingRight === false) {
            this.drawIdleSprite(ctx);
        } else if (this.jumping === true) {
            this.drawIdleSprite(ctx);
        } else if (this.movingRight === true) {
            this.drawMovingRight(ctx);
        } else if (this.movingLeft === true) {
            this.drawMovingLeft(ctx);
        }
    }

    update(deltaTime) {
        if (!deltaTime) return;
    }
}
