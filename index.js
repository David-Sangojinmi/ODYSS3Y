/*
Author: David Sangojinmi
Background image: https://craftpix.net/freebies/free-horizontal-2d-game-backgrounds/?utm_source=opengameart&utm_medium=public&utm_campaign=myself
Terrain tile set: 
Sprite sheets: 
To-Do:
    - Better player terrain interaction
    - Fix the bug with the pause button
    - Make each terrain tile an object
        > And then try rewriting the collision logic
*/

var cvs = document.getElementById("gameScreen");
var ctx = cvs.getContext("2d");
var GAME_WIDTH = 800;
var GAME_HEIGHT = 600;
var winRect = cvs.getBoundingClientRect();

// Importing the classes needed
import Platform from "./platform.js";
import Sprite from "./sprite.js";
import Background from "./background.js";
import gameScreens from "./gameScreens.js";
import gameStats from "./gameStats.js";
import Coin from "./coins.js";
import Block from "./block.js";

// Load any images
var background = new Image();
background.src = "images/bg6-3.jpg";

// Load audio
//     var jumpS = new Audio();
//     jumpS.src = "sounds/jump.mp3";

// Important variables
let bg = new Background(GAME_WIDTH, GAME_HEIGHT);
let platform = new Platform(GAME_WIDTH, GAME_HEIGHT);
var block = [];
var blockCount = 0;
for (var i = 0; i < platform.level1.length; i++) {
    for (var j = 0; j < platform.level1[i].length; j++) {
        block[blockCount] = new Block(j * 40, i * 40, 40, 40, platform.level1[i][j]);
        blockCount++;
    }
}
let sprite = new Sprite(GAME_WIDTH, GAME_HEIGHT);
let gScreens = new gameScreens(GAME_WIDTH, GAME_HEIGHT);
let gStats = new gameStats(GAME_WIDTH, GAME_HEIGHT);
let coinS = new Coin();
var gamestart = true;
var gameinstructions = false;
var gameplay = false;
var gamepaused = false;
var gameend = false;
var lastTime = 0;
var spriteCol = false;
var controller = {
    left: false,
    right: false,
    up: false,
    keyListener: function (event) {
        var key_state = event.type == "keydown" ? true : false;

        switch (event.keyCode) {
            case 37:
            case 65:
                controller.left = key_state;
                break;
            case 38:
            case 87:
                controller.up = key_state;
                break;
            case 39:
            case 68:
                controller.right = key_state;
                break;
        }
    },
};

///////////////////////////////
////  GAMEPLAY FUNCTIONS   ////
///////////////////////////////
function gameStart(timestamp) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    bg.gsdraw(ctx);
    gScreens.update(deltaTime);
    gScreens.startScreen(ctx);

    window.requestAnimationFrame(gameStart);
}

document.addEventListener("click", (ev) => {
    // ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    if (gamestart === true) {
        if (
            ev.clientX >= 336 + winRect.left + 2 &&
            ev.clientX <= 336 + gScreens.playBtn1.width + winRect.left + 2 &&
            ev.clientY >= 452 + winRect.top + 2 &&
            ev.clientY <= 452 + gScreens.playBtn1.height + winRect.top + 2
        ) {
            gamestart = false;
            gameinstructions = true;
            gameplay = false;
            gameLoop();
        }
    }
});

function gameInstructions(timestamp) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    bg.gsdraw(ctx);
    gScreens.update(deltaTime);
    gScreens.instructions(ctx);

    window.requestAnimationFrame(gameStart);
}

document.addEventListener("click", (instrev) => {
    // ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    if (gameinstructions === true) {
        if (
            instrev.clientX >= 336 + winRect.left + 2 &&
            instrev.clientX <= 336 + gScreens.playBtn1.width + winRect.left + 2 &&
            instrev.clientY >= 352 + winRect.top + 2 &&
            instrev.clientY <= 352 + gScreens.playBtn1.height + winRect.top + 2
        ) {
            gamestart = false;
            gameinstructions = false;
            gameplay = true;
            gameLoop();
        }
    }
});

function coinCollision() {
    for (var i = 0; i < coinS.coinlevel1.length; i++) {
        for (var j = 0; j < coinS.coinlevel1[i].length; j++) {
            if (coinS.coinlevel1[i][j] === 4) {
                if (sprite.position.y <= coinS.baseY + j*40 &&
                    sprite.position.y >= coinS.baseY + (j+1)*40 - 5) {
                        gStats.points += 1;
                        coinS.coinShowing = false;
                    } else {
                        gStats.points += 0;
                    }
            }
        }
    }
    // if (
    //     sprite.position.x >= coinS.baseX &&
    //     sprite.position.x + sprite.width <= coinS.baseX + coinS.base.width &&
    //     coinS.baseY > sprite.position.y &&
    //     coinS.baseY + coinS.base.height <= sprite.position.y + sprite.height
    // ) {
        
    //     //Coin.hide();
    // } else {
        
    // }
}

function loop() {
    if (controller.up && sprite.jumping == false) {
        sprite.dY -= 14; // Jumping higher
        sprite.jumping = true;
    }
    if (controller.left) {
        sprite.dX -= 0.5;
        sprite.movingLeft = true;
    }
    if (controller.right) {
        sprite.dX += 0.5;
        sprite.movingRight = true;
    }

    sprite.dY += 0.9; // Gravity - come down slower or quicker
    sprite.position.y += sprite.dY;
    sprite.position.x += sprite.dX;
    sprite.position.y += sprite.dY;
    sprite.dX *= 0.9; // Friction
    sprite.dY *= 0.9; // Friction

    /* Pseudocode for tile collision detection
    - Loop through the array for generating tiles
    - If sprite bottom y pos <= tile top y pos AND sprite left x pos <= tile right x pos AND sprite right x pos >= sprite left x pos THEN
        - Sprite should not fall through the title
    - ELSE
        - Sprite should fall until it reaches a tile which the above is true */
    
    if (sprite.position.y >= block[780].y - sprite.height - 20) {
        // Sprite falling below floor
        sprite.jumping = false;
        sprite.position.y = block[780].y - sprite.height - 20;
        sprite.dY = 0;
    }

    if (sprite.position.x + sprite.width > 550) {
        // Scroll left
        gStats.hp -= 0.5;
        bg.posGP.l1x -= sprite.dX * 0.2;
        bg.posGP.l2x -= sprite.dX * 0.4;
        bg.posGP.l3x -= sprite.dX * 0.6;
        bg.posGP.l4x -= sprite.dX * 0.8;
        for (var i = 0; i < block.length; i++) {
            block[i].x -= sprite.dX;
        }
        coinS.baseX -= sprite.dX;
        sprite.position.x = 550 - sprite.width;
    }
    if (sprite.position.x < 250) {
        // Scroll Right
        bg.posGP.l1x -= sprite.dX * 0.2;
        bg.posGP.l2x -= sprite.dX * 0.4;
        bg.posGP.l3x -= sprite.dX * 0.6;
        bg.posGP.l4x -= sprite.dX * 0.8;
        for (var i = 0; i < block.length; i++) {
            block[i].x -= sprite.dX;
        }
        coinS.baseX -= sprite.dX;
        sprite.position.x = 250;
    }
    if (sprite.position.x >= 250 && sprite.position.x <= 550) {
        // Sprite moving
        sprite.position.x += sprite.dX;
    }
}

function gamePlay(timestamp) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    bg.gpdraw(ctx);
    for (var i = 0; i < block.length; i++) {
        block[i].drawBlock(ctx);
    }
    block[780].active(ctx);
    coinS.displayCoins(ctx);
    gStats.update(deltaTime);
    gStats.display(ctx);
    
    sprite.displaySprite(ctx);
    loop();
    sprite.update(deltaTime);

    // coinCollision();

    window.requestAnimationFrame(gamePlay);
}

function gamePaused() {
    ctx.fillStyle = "rgba(100, 100, 100, 0.7)";
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    // Draw resume button
    ctx.fillStyle = "rgb(0, 200, 0)";
    ctx.fillRect(300, 150, 200, 100);
    ctx.fillRect(300, 350, 200, 100);
    sprite.fpsCount = 0;
    window.requestAnimationFrame(gamePaused);
}

document.addEventListener("click", (evnt) => {
    // ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    if (gameplay === true) {
        if (evnt.clientX >= 17 + winRect.left + 2 && evnt.clientX <= 17 + 34 + winRect.left + 2 && evnt.clientY >= 17 + winRect.top + 2 && evnt.clientY <= 17 + 35 + winRect.top + 2) {
            gamepaused = true;
            gameplay = false;
            
            gameLoop();
        }
    }
});

document.addEventListener("click", (pauseevnt) => {
    // ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    if (gamepaused === true) {
        if (pauseevnt.clientX >= 300 + winRect.left + 2 && pauseevnt.clientX <= 500 + winRect.left + 2 && pauseevnt.clientY >= 150 + winRect.top + 2 && pauseevnt.clientY <= 250 + winRect.top + 2) {
            gamepaused = false;
            gameplay = true;
            gameLoop();
        }
    }
});

// For sprite movement and scrolling //
document.addEventListener("keydown", controller.keyListener);
document.addEventListener("keyup", controller.keyListener);

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
    if (gameinstructions == true) {
        gameInstructions();
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
