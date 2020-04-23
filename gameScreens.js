export default class gameScreens {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

        this.gameTitle = new Image();
        this.play = new Image();
        this.gameTitle.src = "images/gameTitle.png";
        this.play.src = "images/play.png";
    }

    startScreen(ctx) {
        // Title
        ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
        ctx.fillRect(0, 0, 800, 600);
        ctx.drawImage(this.gameTitle, 136, 222);
        ctx.drawImage(this.play, 336, 452);
    }

    instructions(ctx) {

    }

    pauseScreen(ctx) {

    }

    endScreen(ctx) {

    }

    update(deltaTime) {
        if (!deltaTime) return;
    }
}
