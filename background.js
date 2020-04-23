export default class Background {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.layer1 = new Image();
        this.layer2 = new Image();
        this.layer3 = new Image();
        this.layer4 = new Image();
        this.layer1.src = "images/bgLayer1.png";
        this.layer2.src = "images/bgLayer2.png";
        this.layer3.src = "images/bgLayer3.png";
        this.layer4.src = "images/bgLayer4.png";

        this.pos = {
            l0x: 0,
            l1x: 0,
            l2x: 0,
            l3x: 0,
            l4x: 0,
            ly: 0,
        };
    }

    gsdraw(ctx) {
        ctx.fillStyle = "#aedecb";
        ctx.fillRect(this.pos.l0x, this.pos.ly, this.gameWidth, this.gameHeight);
        ctx.drawImage(this.layer1, this.pos.l1x, this.pos.ly);
        ctx.drawImage(this.layer2, this.pos.l2x, this.pos.ly);
        ctx.drawImage(this.layer3, this.pos.l3x, this.pos.ly);
        ctx.drawImage(this.layer4, this.pos.l4x, this.pos.ly);
    }

    gpdraw(ctx) {
        ctx.fillStyle = "#aedecb";
        ctx.fillRect(this.pos.l0x, this.pos.ly, this.gameWidth, this.gameHeight);
        for (var i = 0; i < 2; i++) {
            ctx.drawImage(this.layer1, this.pos.l1x + this.gameWidth * i, this.pos.ly);
            ctx.drawImage(this.layer2, this.pos.l2x + this.gameWidth * i, this.pos.ly);
            ctx.drawImage(this.layer3, this.pos.l3x + this.gameWidth * i, this.pos.ly);
            ctx.drawImage(this.layer4, this.pos.l4x + this.gameWidth * i, this.pos.ly);
        }
        if (this.pos.l1x < -800) {
            this.pos.l1x = 800;
        } else if (this.pos.l1x > 800) {
            this.pos.l1x = -800;
        }
        if (this.pos.l2x < -800) {
            this.pos.l2x = 800;
        } else if (this.pos.l2x > 800) {
            this.pos.l2x = -800;
        }
        if (this.pos.l3x < -800) {
            this.pos.l3x = 800;
        } else if (this.pos.l3x > 800) {
            this.pos.l3x = -800;
        }
        if (this.pos.l4x < -800) {
            this.pos.l4x = 800;
        } else if (this.pos.l4x > 800) {
            this.pos.l4x = -800;
        }
    }

    update(deltaTime) {
        if (!deltaTime) {
            return;
        }
    }
}
