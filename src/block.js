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
        ctx.drawImage(this.terrainSet, 160, 80, 16, 16, this.x, this.y, this.w, this.h);
    }

    active(ctx, blockNum) {
        ctx.font = "15px arial";
        ctx.fillStyle = "white";
        ctx.fillText(blockNum, this.x + 8, this.y + 25);
    }
}

export class grassBlock extends Block {
    constructor(x, y, w, h, id) {
        super(x, y, w, h, id);
    }

    drawBlock(ctx) {
        ctx.drawImage(this.terrainSet, 160, 80, 16, 16, this.x, this.y, this.w, this.h);
    }
}

export class grassTLBlock extends grassBlock {
    constructor(x, y, w, h, id) {
        super(x, y, w, h, id);
    }

    drawBlock(ctx) {
        ctx.drawImage(this.terrainSet, 0, 80, 16, 16, this.x, this.y, this.w, this.h);
    }
}

export class grassTMBlock extends grassBlock {
    constructor(x, y, w, h, id) {
        super(x, y, w, h, id);
    }

    drawBlock(ctx) {
        ctx.drawImage(this.terrainSet, 160, 80, 16, 16, this.x, this.y, this.w, this.h);
    }
}

export class grassTRBlock extends grassBlock {
    constructor(x, y, w, h, id) {
        super(x, y, w, h, id);
    }

    drawBlock(ctx) {
        ctx.drawImage(this.terrainSet, 32, 80, 16, 16, this.x, this.y, this.w, this.h);
    }
}

export class grassBLBlock extends grassBlock {
    constructor(x, y, w, h, id) {
        super(x, y, w, h, id);
    }

    drawBlock(ctx) {
        ctx.drawImage(this.terrainSet, 0, 96, 16, 16, this.x, this.y, this.w, this.h);
    }
}

export class grassBMBlock extends grassBlock {
    constructor(x, y, w, h, id) {
        super(x, y, w, h, id);
    }

    drawBlock(ctx) {
        ctx.drawImage(this.terrainSet, 160, 96, 16, 16, this.x, this.y, this.w, this.h);
    }
}

export class grassBRBlock extends grassBlock {
    constructor(x, y, w, h, id) {
        super(x, y, w, h, id);
    }

    drawBlock(ctx) {
        ctx.drawImage(this.terrainSet, 32, 96, 16, 16, this.x, this.y, this.w, this.h);
    }
}

export class stoneBlock extends Block {
    constructor(x, y, w, h, id) {
        super(x, y, w, h, id);
    }

    drawBlock(ctx) {
        ctx.drawImage(this.terrainSet, 160, 80, 16, 16, this.x, this.y, this.w, this.h);
    }
}

export class stone1Block extends stoneBlock {
    constructor(x, y, w, h, id) {
        super(x, y, w, h, id);
    }

    drawBlock(ctx) {
        ctx.drawImage(this.terrainSet, 16, 128, 16, 16, this.x, this.y, this.w, this.h);
    }
}

export class stone2Block extends stoneBlock {
    constructor(x, y, w, h, id) {
        super(x, y, w, h, id);
    }

    drawBlock(ctx) {
        ctx.drawImage(this.terrainSet, 16, 64, 16, 16, this.x, this.y, this.w, this.h);
    }
}

export class coinBlock extends Block {
    constructor(x, y, w, h, id) {
        super(x, y, w, h, id);
    }

    drawBlock(ctx) {
        ctx.drawImage(this.terrainSet, 160, 80, 16, 16, this.x, this.y, this.w, this.h);
    }
}

export class coin1Block extends coinBlock {
    constructor(x, y, w, h, id) {
        super(x, y, w, h, id);
    }

    drawBlock(ctx) {
        if (this.coinActive == true) {
            ctx.drawImage(this.coin, this.x + 5, this.y + 5);
        }
    }
}

export class coin2Block extends coinBlock {
    constructor(x, y, w, h, id) {
        super(x, y, w, h, id);
    }

    drawBlock(ctx) {
        if (this.coinActive == true) {
            ctx.drawImage(this.coin2, this.x + 5, this.y + 5);
        }
    }
}
