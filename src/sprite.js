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
        this.sprite.src = "images/spritesheet.png";
        this.srcX = 0;
        this.srcY = 0;
        this.spritesheetWidth = 112;
        this.spritesheetHeight = 70;
        this.spriteWidth = 28;
        this.totalFrames = 4;
        this.currentFrame = 0;
        this.fpsCount = 0;
        this.scale = 1.3;
    }

    updateFrame() {
        this.fpsCount++;
        if (this.fpsCount % 10 == 0) {
            this.currentFrame = ++this.currentFrame % this.totalFrames;
        }
        this.srcX = this.currentFrame * this.spriteWidth;
        this.srcY = 0;
    }

    drawIdleSprite(ctx) {
        this.updateFrame();
        ctx.drawImage(
            this.sprite,
            this.srcX,
            this.srcY,
            this.spriteWidth,
            this.spritesheetHeight,
            this.position.x,
            this.position.y,
            this.spriteWidth * this.scale,
            this.spritesheetHeight * this.scale
        );
    }

    drawMovingLeft(ctx) {
        this.updateFrame();
        ctx.drawImage(
            this.sprite,
            this.srcX,
            this.srcY,
            this.spriteWidth,
            this.spritesheetHeight,
            this.position.x,
            this.position.y,
            this.spriteWidth * this.scale,
            this.spritesheetHeight * this.scale
        );
    }

    drawMovingRight(ctx) {
        this.updateFrame();
        ctx.drawImage(
            this.sprite,
            this.srcX,
            this.srcY,
            this.spriteWidth,
            this.spritesheetHeight,
            this.position.x,
            this.position.y,
            this.spriteWidth * this.scale,
            this.spritesheetHeight * this.scale
        );
    }

    drawJumpingSprite(ctx) {
        // Draw jumping
    }

    displaySprite(ctx) {
        if (this.jumping === false && this.movingLeft === false && this.movingRight === false) {
            this.drawIdleSprite(ctx);
        }
        if (this.jumping === true) {
            // this.drawJumpingSprite(ctx);
            this.drawIdleSprite(ctx);
        }
        if (this.movingRight === true) {
            // this.drawMovingRight(ctx);
            this.drawIdleSprite(ctx);
        }
        if (this.movingLeft === true) {
            // this.drawMovingRight(ctx);
            this.drawIdleSprite(ctx);
        }
    }

    update(deltaTime) {
        if (!deltaTime) return;
    }
}