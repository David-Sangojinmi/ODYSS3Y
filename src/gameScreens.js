export default class gameScreens {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

        this.gameTitle = new Image();
        this.playBtn1 = new Image();
        this.playBtn2 = new Image();
        this.gameInstruction = new Image();
        this.gameBack = new Image();
        this.gameNext = new Image();
        this.background = new Image();
        this.backBoard = new Image();
        this.coin1 = new Image();
        this.coin2 = new Image();
        this.gameTitle.src = "images/gameTitle.png";
        this.playBtn1.src = "images/play.png";
        this.playBtn2.src = "images/playBig.png";
        this.gameInstruction.src = "images/instructions.png";
        this.gameBack.src = "images/back.png";
        this.gameNext.src = "images/next.png";
        this.background.src = "images/background.png";
        this.backBoard.src = "images/backboard.png";
        this.coin1.src = "images/coin.png";
        this.coin2.src = "images/coin2.png";
        this.bgposX = 0;
        this.bgposY = 0;
        this.levelReached = 0;
        this.coin1Count = 0;
        this.coin2Count = 0;
    }

    startScreen(ctx) {
        // Title
        ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
        ctx.fillRect(0, 0, 800, 600);
        ctx.drawImage(this.gameTitle, 136, 222);
        ctx.drawImage(this.playBtn1, 336, 452);
    }

    gameInstructions(ctx) {
        // Instructions
        ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
        ctx.fillRect(0, 0, 800, 600);
        ctx.drawImage(this.gameInstruction, 72, 0);
        ctx.drawImage(this.gameBack, 107, 415);
        ctx.drawImage(this.gameNext, 565, 415);
    }

    pauseScreen(ctx) {}

    endScreen(ctx) {
        ctx.drawImage(this.background, this.bgposX, this.bgposY);
        ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
        ctx.fillRect(0, 0, 800, 600);
        ctx.drawImage(this.backBoard, 72, 0);
        ctx.font = "50px arial";
        ctx.fillStyle = "white";
        ctx.fillText("GAME OVER", 300, 300);
        // Display the number of coins
        ctx.fillText("Level reached: " + this.levelReached, 200, 417);
        ctx.drawImage(this.coin1, 200, 467);
        ctx.fillText("gained: " + this.coin1Count, 230, 467);
        ctx.drawImage(this.coin2, 200, 517);
        ctx.fillText("gained: " + this.coin2Count, 230, 517);
        // Eventually add a replay option
    }

    update(deltaTime) {
        if (!deltaTime) return;
    }
}
