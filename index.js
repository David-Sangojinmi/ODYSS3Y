/*
Author: David Sangojinmi
Background image: https://craftpix.net/freebies/free-horizontal-2d-game-backgrounds/?utm_source=opengameart&utm_medium=public&utm_campaign=myself
To-Do:
    - Draw a player sprite
    - Animate the player sprite
    - Maybe player terrain interaction
*/

var cvs = document.getElementById("gameScreen");
var ctx = cvs.getContext("2d");
var GAME_WIDTH = 800;
var GAME_HEIGHT = 600;
var winRect = cvs.getBoundingClientRect();

// Importing the classes needed
import Platform from "./platform.js";
import Sprite from "./sprite.js";
import gameScreens from "./gameScreens.js";
import gameStats from "./gameStats.js";
import Coin from "./coins.js";

// Load any images
var background = new Image();
background.src = "images/bg6-3.jpg";

// Load audio
//     var jumpS = new Audio();
//     jumpS.src = "sounds/jump.mp3";

// Important variables
let platform = new Platform(GAME_WIDTH, GAME_HEIGHT);
let sprite = new Sprite(GAME_WIDTH, GAME_HEIGHT);
let gScreens = new gameScreens(GAME_WIDTH, GAME_HEIGHT);
let gStats = new gameStats(GAME_WIDTH, GAME_HEIGHT);
let coinS = new Coin();
var gamestart = true;
var gameplay = false;
var gamepaused = false;
var gameend = false;
var lastTime = 0;

///////////////////////////////
////  GAMEPLAY FUNCTIONS   ////
///////////////////////////////
function gameStart(timestamp) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    ctx.drawImage(background, 0, 0);
    gScreens.update(deltaTime);
    gScreens.startScreen(ctx);

    window.requestAnimationFrame(gameStart);
}

document.addEventListener("click", (ev) => {
    // ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    if (gamestart === true) {
        if (
            ev.clientX >= 336 + winRect.left + 2 &&
            ev.clientX <= 336 + gScreens.play.width + winRect.left + 2 &&
            ev.clientY >= 452 + winRect.top + 2 &&
            ev.clientY <= 452 + gScreens.play.height + winRect.top + 2
        ) {
            gamestart = false;
            gameplay = true;
            gameLoop();
        }
    }
});

function coinCollision() {
    if (
        sprite.position.x >= coinS.coinX &&
        sprite.position.x + sprite.width <= coinS.coinX + coinS.coin.width &&
        coinS.coinY > sprite.position.y &&
        coinS.coinY + coinS.coin.height <= sprite.position.y + sprite.height
    ) {
        gStats.points += 1;
        //Coin.hide();
    } else {
        gStats.points += 0;
    }
}

function gamePlay(timestamp) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    ctx.drawImage(background, 0, 0);
    platform.drawTerrain(ctx);
    gStats.update(deltaTime);
    gStats.display(ctx);
    coinS.displayCoins(ctx);

    setInterval(sprite.displaySprite(ctx), 900);
    sprite.update(deltaTime);

    coinCollision();

    window.requestAnimationFrame(gamePlay);
}

function gamePaused() {
    ctx.fillStyle = "rgba(100, 100, 100, 0.7)";
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    // Draw resume button
    ctx.fillStyle = "rgb(0, 200, 0)";
    ctx.fillRect(300, 150, 200, 100);
    ctx.fillRect(300, 350, 200, 100);

    window.requestAnimationFrame(gamePaused);
}

document.addEventListener("click", (evnt) => {
    // ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    if (gameplay === true) {
        if (
            evnt.clientX >= 17 + winRect.left + 2 &&
            evnt.clientX <= 17 + 34 + winRect.left + 2 &&
            evnt.clientY >= 17 + winRect.top + 2 &&
            evnt.clientY <= 17 + 35 + winRect.top + 2
        ) {
            gamepaused = true;
            gameLoop();
        }
    }
});

document.addEventListener("click", (pauseevnt) => {
    // ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    if (gamepaused === true) {
        if (
            pauseevnt.clientX >= 300 + winRect.left + 2 &&
            pauseevnt.clientX <= 500 + winRect.left + 2 &&
            pauseevnt.clientY >= 150 + winRect.top + 2 &&
            pauseevnt.clientY <= 250 + winRect.top + 2
        ) {
            gamepaused = false;
            gameplay = true;
            gameLoop();
        }
    }
});

document.addEventListener("keydown", (event) => {
    if (gameplay === true && gamepaused === false) {
        switch (event.code) {
            case "ArrowLeft":
            case "KeyA":
                if (sprite.position.x <= 250) {
                    platform.scrollLeft();
                    coinS.scrollLeft();
                } else {
                    sprite.moveLeft();
                }
                break;
            case "ArrowRight":
            case "KeyD":
                if (sprite.position.x + 20 >= 550) {
                    platform.scrollRight();
                    coinS.scrollRight();
                } else {
                    sprite.moveRight();
                }
                break;
            case "ArrowUp":
            case "KeyW":
                sprite.jump(ctx);
                break;
        }
    }
});

function gameEnd() {
    ctx.drawImage(background, 0, 0);
    ctx.fillStyle = "rgba(0, 0, 0, 0.87)";
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    // Draw resume button
    ctx.fillStyle = "rgb(0, 200, 0)";
    ctx.fillRect(300, 150, 200, 100);
    ctx.fillRect(300, 350, 200, 100);

    window.requestAnimationFrame(gameEnd);
}

///////////////////////////////
////     GAMEPLAY INIT     ////
///////////////////////////////
function gameLoop() {
    if (gamestart == true) {
        gameStart();
    }
    if (gameplay == true) {
        gamePlay();
    }
    if (gamepaused == true) {
        gamePaused();
    }
    if (gameend == true) {
        gameEnd();
    }
}

gameLoop();
// gameEnd();