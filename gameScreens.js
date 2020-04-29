export default class gameScreens {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

        this.gameTitle = new Image();
        this.playBtn1 = new Image();
        this.playBtn2 = new Image();
        this.gameInstruction = new Image();
        this.gameTitle.src = "images/gameTitle.png";
        this.playBtn1.src = "images/play.png";
        this.playBtn2.src = "images/playBig.png";
        this.gameInstruction.src = "images/instructions.png"
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
    }

    pauseScreen(ctx) {

    }

    endScreen(ctx) {

    }

    update(deltaTime) {
        if (!deltaTime) return;
    }
}
