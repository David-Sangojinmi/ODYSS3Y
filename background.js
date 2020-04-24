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

        this.posGS = {
            l0x: 0,
            l1x: 0,
            l2x: 0,
            l3x: 0,
            l4x: 0,
            ly: 0,
        };
        this.posGP = {
            l0x: 0,
            l1x: -800,
            l2x: -800,
            l3x: -800,
            l4x: -800,
            ly: 0,
        };
    }

    gsdraw(ctx) {
        ctx.fillStyle = "#aedecb";
        ctx.fillRect(this.posGS.l0x, this.posGS.ly, this.gameWidth, this.gameHeight);
        ctx.drawImage(this.layer1, this.posGS.l1x, this.posGS.ly);
        ctx.drawImage(this.layer2, this.posGS.l2x, this.posGS.ly);
        ctx.drawImage(this.layer3, this.posGS.l3x, this.posGS.ly);
        ctx.drawImage(this.layer4, this.posGS.l4x, this.posGS.ly);
    }

    gpdraw(ctx) {
        ctx.fillStyle = "#aedecb";
        ctx.fillRect(this.posGP.l0x, this.posGP.ly, this.gameWidth, this.gameHeight);
        for (var i = 0; i < 4; i++) {
            ctx.drawImage(this.layer1, this.posGP.l1x + this.gameWidth * i, this.posGP.ly);
            ctx.drawImage(this.layer2, this.posGP.l2x + this.gameWidth * i, this.posGP.ly);
            ctx.drawImage(this.layer3, this.posGP.l3x + this.gameWidth * i, this.posGP.ly);
            ctx.drawImage(this.layer4, this.posGP.l4x + this.gameWidth * i, this.posGP.ly);

            // if (this.posGP.l1x + this.gameWidth * i < -800) {
            //     this.posGP.l1x = 800;
            // } else if (this.posGP.l1x + this.gameWidth * i > 800) {
            //     this.posGP.l1x = -800;
            // }
            // if (this.posGP.l2x + this.gameWidth * i < -800) {
            //     this.posGP.l2x = 800;
            // } else if (this.posGP.l2x + this.gameWidth * i > 800) {
            //     this.posGP.l2x = -800;
            // }
            // if (this.posGP.l3x + this.gameWidth * i < -800) {
            //     this.posGP.l3x = 800;
            // } else if (this.posGP.l3x + this.gameWidth * i > 800) {
            //     this.posGP.l3x = -800;
            // }
            // if (this.posGP.l4x + this.gameWidth * i < -800) {
            //     this.posGP.l4x = 800;
            // } else if (this.posGP.l4x + this.gameWidth * i > 800) {
            //     this.posGP.l4x = -800;
            // }
        }
    }

    update(deltaTime) {
        if (!deltaTime) {
            return;
        }
    }
}
