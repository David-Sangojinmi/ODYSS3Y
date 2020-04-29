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
        if (this.s === 1 || this.i === 2) {
            ctx.drawImage(this.terrainSet, 160, 80, 16, 16, this.x, this.y, this.w, this.h);
        }
        // switch(this.i) {
        //     case 1:
        //         ctx.drawImage(
        //             this.terrainSet,
        //             160,
        //             80,
        //             16,
        //             16,
        //             this.x,
        //             this.y,
        //             this.w,
        //             this.h
        //         );
        //         break;
        // }
    }
}