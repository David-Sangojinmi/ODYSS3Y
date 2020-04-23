export default class Coin {
    constructor() {
        this.coin = new Image();
        this.coin.src = "images/coin.png";
        this.baseX = 0;
        this.baseY = 0;
    }

    displayCoins(ctx) {
        ctx.drawImage(this.coin, this.coinX, this.coinY);
    }

    scrollLeft(ctx) {
        this.coinX += 5;
    }

    scrollRight(ctx) {
        this.coinX -= 5;
    }

    update(deltaTime) {
        if (!deltaTime) return;
    }
}
