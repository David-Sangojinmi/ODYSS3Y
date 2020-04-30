export default class Block {
    constructor(x, y, w, h, i) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.i = i;
        this.terrainSet = new Image();
        this.terrainSet.src = "images/terrainset.png";
        this.terrainScale = 2.5;
    }

    drawBlock(ctx) {
        switch (this.i) {
            case 1:
                ctx.drawImage(this.terrainSet, 160, 80, 16, 16, this.x, this.y, this.w, this.h);
                break;
            case 2:
                ctx.drawImage(this.terrainSet, 160, 96, 16, 16, this.x, this.y, this.w, this.h);
                break;
            case 3:
                ctx.drawImage(this.terrainSet, 48, 80, 16, 16, this.x, this.y, this.w, this.h);
                break;
            case 4: // Ground top left
                ctx.drawImage(this.terrainSet, 0, 80, 16, 16, this.x, this.y, this.w, this.h);
                break;
            case 5: // Ground bottom left
                ctx.drawImage(this.terrainSet, 0, 96, 16, 16, this.x, this.y, this.w, this.h);
                break;
            case 6: // Ground top right
                ctx.drawImage(this.terrainSet, 32, 80, 16, 16, this.x, this.y, this.w, this.h);
                break;
            case 7: // Ground bottom right
                ctx.drawImage(this.terrainSet, 32, 96, 16, 16, this.x, this.y, this.w, this.h);
                break;
        }
    }

    active(ctx, blockNum) {
        ctx.font = "15px arial";
        ctx.fillStyle = "white";
        ctx.fillText(blockNum, this.x + 8, this.y + 25);
    }
}
