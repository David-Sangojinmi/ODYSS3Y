export default class Enemy {
    constructor(x, y, xLBound, xRBound, yTBound, yBBound, xSpd, ySpd) {
        this.x = x;
        this.y = y;
        this.xLBound = xLBound;
        this.xRBound = xRBound;
        this.yTBound = yTBound;
        this.yBBound = yBBound;
        this.xSpd = xSpd;
        this.ySpd = ySpd;
        this.enemySprite = new Image();
        this.enemySprite.src = "images/enemy.png";
    }

    display(ctx) {
        ctx.drawImage(this.enemySprite, this.x, this.y);
    }

    patrol() {
        // Horizontal //
        this.x -= this.xSpd;
        if (this.x >= this.xRBound) {
            this.xSpd *= -1;
        }
        if (this.x <= this.xLBound) {
            this.xSpd *= -1;
        }
        // Vertical //
        this.y -= this.ySpd;
        if (this.y <= this.yTBound) {
            this.ySpd *= -1;
        }
        if (this.y >= this.yBBound) {
            this.ySpd *= -1;
        }
    }
}