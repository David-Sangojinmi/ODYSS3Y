export default class Block {
    constructor(x, y, w, h, id) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.id = id;
        this.terrainSet = new Image();
        this.coin = new Image();
        this.coin2 = new Image();
        this.terrainSet.src = "images/terrainset.png";
        this.coin.src = "images/coin.png";
        this.coin2.src = "images/coin2.png";
        this.coinActive = true;
        this.terrainScale = 2.5;
    }

    drawBlock(ctx) {
        switch (this.id) {
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
            case 9: // Coin 1
                if (this.coinActive == true) {
                    ctx.drawImage(this.coin, this.x + 5, this.y + 5);
                    break;
                }
            case 10: // Coin 2
                if (this.coinActive == true) {
                    ctx.drawImage(this.coin2, this.x + 5, this.y + 5);
                    break;
                }
        }
    }

    // drawBlock(ctx, posX, posY) {
    //     ctx.drawImage(this.terrainSet, posX, posY, 16, 16, this.x, this.y, this.w, this.h);
    // }

    active(ctx, blockNum) {
        ctx.font = "15px arial";
        ctx.fillStyle = "white";
        ctx.fillText(blockNum, this.x + 8, this.y + 25);
    }
}

// export class Block4 extends Block {
//     constructor(x, y, w, h, id) {
//         super(x, y, w, h, id);
//         this.pposX = 0;
//         this.pposY = 80;
//     }

//     drawBlock(ctx) {
//         ctx.drawImage(this.terrainSet, this.pposX, this.pposY, 16, 16, this.x, this.y, this.w, this.h);
//     }
// }

// export class Block1 extends Block {
//     constructor(x, y, w, h, id) {
//         super(x, y, w, h, id);
//         this.pposX = 160;
//         this.pposY = 80;
//     }

//     drawBlock(ctx) {
//         ctx.drawImage(this.terrainSet, this.pposX, this.pposY, 16, 16, this.x, this.y, this.w, this.h);
//     }

//     // active();
// }

// export class Block6 extends Block {
//     constructor(x, y, w, h, id) {
//         super(x, y, w, h, id);
//         this.pposX = 32;
//         this.pposY = 80;
//     }

//     drawBlock(ctx) {
//         if (this.id === 3) {
//             ctx.drawImage(this.terrainSet, this.pposX, this.pposY, 16, 16, this.x, this.y, this.w, this.h);
//         }
//     }
// }

// export class Block5 extends Block {
//     constructor(x, y, w, h, id) {
//         super(x, y, w, h, id);
//         this.pposX = 0;
//         this.pposY = 96;
//     }

//     drawBlock(ctx) {
//         ctx.drawImage(this.terrainSet, this.pposX, this.pposY, 16, 16, this.x, this.y, this.w, this.h);
//     }
// }

// export class Block2 extends Block {
//     constructor(x, y, w, h, id) {
//         super(x, y, w, h, id);
//         this.pposX = 160;
//         this.pposY = 96;
//     }

//     drawBlock(ctx) {
//         ctx.drawImage(this.terrainSet, this.pposX, this.pposY, 16, 16, this.x, this.y, this.w, this.h);
//     }
// }

// export class Block7 extends Block {
//     constructor(x, y, w, h, id) {
//         super(x, y, w, h, id);
//         this.pposX = 32;
//         this.pposY = 96;
//     }

//     drawBlock(ctx) {
//         ctx.drawImage(this.terrainSet, this.pposX, this.pposY, 16, 16, this.x, this.y, this.w, this.h);
//     }
// }

// export class Block3 extends Block {
//     constructor(x, y, w, h, id) {
//         super(x, y, w, h, id);
//         this.pposX = 16;
//         this.pposY = 128;
//     }

//     drawBlock(ctx) {
//         ctx.drawImage(this.terrainSet, this.pposX, this.pposY, 16, 16, this.x, this.y, this.w, this.h);
//     }
// }

// export class Block9 extends Block {
//     constructor(x, y, w, h, id) {
//         super(x, y, w, h, id);
//         this.pposX = 16;
//         this.pposY = 64;
//     }

//     drawBlock(ctx) {
//         ctx.drawImage(this.terrainSet, this.pposX, this.pposY, 16, 16, this.x, this.y, this.w, this.h);
//     }
// }

// export class Block10 extends Block {
//     constructor(x, y, w, h, id) {
//         super(x, y, w, h, id);
//     }

//     drawBlock(ctx) {
//         if (this.coinActive == true) {
//             ctx.drawImage(this.coin, this.x + 5, this.y + 5);
//         }
//     }
// }

// export class Block11 extends Block {
//     constructor(x, y, w, h, id) {
//         super(x, y, w, h, id);
//     }

//     drawBlock(ctx) {
//         if (this.coinActive == true) {
//             ctx.drawImage(this.coin2, this.x + 5, this.y + 5);
//         }
//     }
// }
