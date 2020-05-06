export default class gameScreens {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

        this.gameTitle = new Image();
        this.playBtn1 = new Image();
        this.continueBtn = new Image();
        this.endgameBtn = new Image();
        this.gameInstruction = new Image();
        this.gameBack = new Image();
        this.gameNext = new Image();
        this.background = new Image();
        this.gameendBoard = new Image();
        this.fadescreen = new Image();
        this.gameTitle.src = "images/gameTitle.png";
        this.playBtn1.src = "images/play.png";
        this.continueBtn.src = "images/continue.png";
        this.endgameBtn.src = "images/endgame.png";
        this.gameInstruction.src = "images/instructions.png";
        this.gameBack.src = "images/back.png";
        this.gameNext.src = "images/next.png";
        this.background.src = "images/background.png";
        this.gameendBoard.src = "images/gameEndBoard.png";
        this.fadescreen.src = "images/fadescreen.png";
        this.bgposX = 0;
        this.bgposY = 0;
        this.levelReached = 1;
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

    pauseScreen(ctx) {
        ctx.drawImage(this.fadescreen, 0, 0);
        // Player goes back to game
        ctx.drawImage(this.continueBtn, 305, 181);
        // Player ends game
        ctx.drawImage(this.endgameBtn, 305, 325);
    }

    endScreen(ctx) {
        ctx.drawImage(this.background, this.bgposX, this.bgposY);
        ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
        ctx.fillRect(0, 0, 800, 600);
        ctx.drawImage(this.gameendBoard, 72, 0);
        // Display the number of coins
        ctx.font = "40px pr celtic narrow";
        ctx.fillStyle = "white";
        ctx.fillText(this.levelReached, 400, 264);
        ctx.fillText(this.coin1Count, 373, 328);
        ctx.fillText(this.coin2Count, 373, 391);
        ctx.fillText(this.coin1Count + 3*this.coin2Count, 371, 455);
        // Eventually add a replay option
    }

    update(deltaTime) {
        if (!deltaTime) return;
    }
}
