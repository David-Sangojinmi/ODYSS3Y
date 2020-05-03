/*
Author: David Sangojinmi
Background image: https://craftpix.net/freebies/free-horizontal-2d-game-backgrounds/?utm_source=opengameart&utm_medium=public&utm_campaign=myself
Terrain tile set: 
Sprite sheets: 
To-Do:
    [X] Better player terrain interaction
    [ ] Animate player moving left/right and jump
    [ ] Allow recognition for which type of collision is happening (l/r/u/d)
    [ ] Player shouldn't be able to double jump through platforms
    [ ] Player should lose hp when he falls in ditches
    [~] Fix the bug with the pause button
        [X] Removed pause button for now
    [X] Make each terrain tile an object
        [X] And then try rewriting the collision logic
*/

var cvs = document.getElementById("gameScreen");
var ctx = cvs.getContext("2d");
var GAME_WIDTH = 800;
var GAME_HEIGHT = 600;
var winRect = cvs.getBoundingClientRect();

// Importing the classes needed
import Platform from "./src/platform.js";
import Sprite from "./src/sprite.js";
import Background from "./src/background.js";
import gameScreens from "./src/gameScreens.js";
import gameStats from "./src/gameStats.js";
import Block from "./src/block.js";
// import Coin from "./coins.js";

// Load any images
// var background = new Image();
// background.src = "images/bg6-3.jpg";

// Load audio
//     var jumpS = new Audio();
//     jumpS.src = "sounds/jump.mp3";

// Important variables
let bg = new Background(GAME_WIDTH, GAME_HEIGHT);
let platform = new Platform(GAME_WIDTH, GAME_HEIGHT);
let block = [];
let blockCount = 0;
for (var i = 0; i < platform.level1.length; i++) {
    for (var j = 0; j < platform.level1[i].length; j++) {
        block[blockCount] = new Block(j * 40, i * 40, 40, 40, platform.level1[i][j]);
        blockCount++;
        // block[blockCount] = new blockC.blockName(j * 40, i * 40, 40, 40, platform.level1[i][j]);
    }
}
let sprite = new Sprite(GAME_WIDTH, GAME_HEIGHT);
let gScreens = new gameScreens(GAME_WIDTH, GAME_HEIGHT);
let gStats = new gameStats(GAME_WIDTH, GAME_HEIGHT);
// let coinS = new Coin();
var gamestart = true;
var gameinstructions = false;
var gameplay = false;
var gamepaused = false;
var gameend = false;
var lastTime = 0;
var spriteCol = false;
var rstPosDff = 0;
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
    gScreens.gameInstructions(ctx);

    window.requestAnimationFrame(gameInstructions);
}

document.addEventListener("click", (instructionsev) => {
    // ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    if (gameinstructions === true) {
        if (
            instructionsev.clientX >= 565 + winRect.left + 2 &&
            instructionsev.clientX <= 565 + gScreens.gameNext.width + winRect.left + 2 &&
            instructionsev.clientY >= 424 + winRect.top + 2 &&
            instructionsev.clientY <= 424 + gScreens.gameNext.height + winRect.top + 2
        ) {
            gamestart = false;
            gameinstructions = false;
            gameplay = true;
            gameLoop();
        } else if (
            instructionsev.clientX >= 107 + winRect.left + 2 &&
            instructionsev.clientX <= 107 + gScreens.gameBack.width + winRect.left + 2 &&
            instructionsev.clientY >= 424 + winRect.top + 2 &&
            instructionsev.clientY <= 424 + gScreens.gameBack.height + winRect.top + 2
        ) {
            gamestart = true;
            gameinstructions = false;
            gameplay = false;
            gameLoop();
        }
    }
});

function coinCollision() {
    for (var i = 0; i < block.length; i++) {
        if (block[i].id === 9) {
            if (
                sprite.position.x >= block[i].x - 27 &&
                sprite.position.x <= block[i].x + 33 + 5 &&
                block[i].y >= sprite.position.y - 33 - 5 &&
                block[i].y <= sprite.position.y + sprite.spritesheetHeight &&
                block[i].coinActive === true
            ) {
                block[i].coinActive = false;
                gStats.points += 1;
            }
        } else if (block[i].id === 10) {
            if (
                sprite.position.x >= block[i].x - 27 &&
                sprite.position.x <= block[i].x + 33 + 5 &&
                block[i].y >= sprite.position.y - 33 - 5 &&
                block[i].y <= sprite.position.y + sprite.spritesheetHeight &&
                block[i].coinActive === true
            ) {
                block[i].coinActive = false;
                gStats.points += 3;
            }
        }
    }
}

function loop() {
    if (controller.up && sprite.jumping == false) {
        if (controller.left) {
            sprite.drawMovingLeft(ctx);
        } else if (controller.right) {
            sprite.drawMovingRight(ctx);
        } else {
            sprite.drawIdleSprite(ctx);
        }
        sprite.dY -= 16; // Jump height
        sprite.jumping = true;
    } else if (controller.left) {
        sprite.drawMovingLeft(ctx);
        sprite.dX -= 0.5;
        // sprite.movingLeft = true;
    } else if (controller.right) {
        sprite.drawMovingRight(ctx);
        sprite.dX += 0.5;
        // sprite.movingRight = true;
    } else {
        sprite.drawIdleSprite(ctx);
    }

    sprite.dY += 0.92; // Gravity - come down slower or quicker
    sprite.position.y += sprite.dY;
    sprite.position.x += sprite.dX;
    sprite.position.y += sprite.dY;
    sprite.dX *= 0.89; // Friction
    sprite.dY *= 0.9; // Friction

    if (sprite.position.x + sprite.width > 550) {
        // Scroll left
        bg.posGP.l1x -= sprite.dX * 0.2;
        bg.posGP.l2x -= sprite.dX * 0.4;
        bg.posGP.l3x -= sprite.dX * 0.6;
        bg.posGP.l4x -= sprite.dX * 0.8;
        for (var i = 0; i < block.length; i++) {
            block[i].x -= sprite.dX;
        }
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
        sprite.position.x = 250;
    }
    if (sprite.position.x >= 250 && sprite.position.x <= 550) {
        // Sprite moving
        sprite.position.x += sprite.dX;
    }
}

function collisionDetection() {
    // for (var i=0; i < block.length; i++) {
    //     if (block[i].id === 1) {
    //         if (sprite.position.y >= block[i].y - sprite.height - 20 &&
    //             sprite.position.x >= block[i].x - 28 &&
    //             sprite.position.x <= block[i].x + 28) {
    //                 sprite.jumping = false;
    //                 sprite.position.y = block[i] - sprite.height - 20;
    //                 sprite.dY = 0;
    //             }
    //     }
    // }
    if (
        (sprite.position.y >= block[780].y - sprite.height - 20 && sprite.position.x >= block[780].x - 1 - 28 && sprite.position.x <= block[792].x - 8) ||
        (sprite.position.y >= block[795].y - sprite.height - 20 && sprite.position.x >= block[795].x - 1 - 28 && sprite.position.x <= block[802].x - 8) ||
        (sprite.position.y >= block[807].y - sprite.height - 20 && sprite.position.x >= block[807].x - 1 - 28 && sprite.position.x <= block[839].x + 40 - 8)
    ) {
        // Sprite falling below floor
        sprite.jumping = false;
        sprite.position.y = block[780].y - sprite.spritesheetHeight;
        sprite.dY = 0;
    } else if (
        sprite.position.y >= block[635].y - sprite.height - 20 &&
        sprite.position.y <= block[695].y - sprite.height - 35 &&
        sprite.position.x >= block[635].x - 1 - 28 &&
        sprite.position.x <= block[639].x - 8
    ) {
        sprite.jumping = false;
        sprite.position.y = block[635].y - sprite.spritesheetHeight;
        sprite.dY = 0;
    } else if (
        sprite.position.y >= block[581].y - sprite.height - 20 &&
        sprite.position.y <= block[641].y - sprite.height - 35 &&
        sprite.position.x >= block[581].x - 1 - 28 &&
        sprite.position.x <= block[583].x - 8
    ) {
        sprite.jumping = false;
        sprite.position.y = block[581].y - sprite.spritesheetHeight;
        sprite.dY = 0;
    } else if (
        sprite.position.y >= block[525].y - sprite.height - 20 &&
        sprite.position.y <= block[585].y - sprite.height - 35 &&
        sprite.position.x >= block[525].x - 1 - 28 &&
        sprite.position.x <= block[527].x - 8
    ) {
        sprite.jumping = false;
        sprite.position.y = block[525].y - sprite.spritesheetHeight;
        sprite.dY = 0;
    } else if (
        sprite.position.y >= block[712].y - sprite.height - 20 &&
        sprite.position.y <= block[772].y - sprite.height - 35 &&
        sprite.position.x >= block[712].x - 1 - 28 &&
        sprite.position.x <= block[715].x - 8
    ) {
        sprite.jumping = false;
        sprite.position.y = block[712].y - sprite.spritesheetHeight;
        sprite.dY = 0;
    } else if (
        sprite.position.y >= block[682].y - sprite.height - 20 &&
        sprite.position.y <= block[742].y - sprite.height - 35 &&
        sprite.position.x >= block[682].x - 1 - 28 &&
        sprite.position.x <= block[687].x - 8
    ) {
        sprite.jumping = false;
        sprite.position.y = block[682].y - sprite.spritesheetHeight;
        sprite.dY = 0;
    }

    if (sprite.position.y >= block[899].y + 40) {
        gStats.hp -= gStats.onehp;
        bg.posGP.l1x = 0;
        bg.posGP.l2x = 0;
        bg.posGP.l3x = 0;
        bg.posGP.l4x = 0;
        if (sprite.position.x > block[786].x) {
            rstPosDff = 240 + Math.abs(block[786].x);
            for (var i = 0; i < block.length; i++) {
                block[i].x += rstPosDff;
            }
        } else if (sprite.position.x < block[786].x) {
            rstPosDff = block[786].x - 240;
            for (var i = 0; i < block.length; i++) {
                block[i].x -= rstPosDff;
            }
        }
        sprite.position.x = 250;
        sprite.position.y = 300;
    }
}

function gamePlay(timestamp) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    bg.gpdraw(ctx);
    for (var i = 0; i < block.length; i++) {
        block[i].drawBlock(ctx);
        block[i].active(ctx, i);
    }
    gStats.update(deltaTime);
    gStats.display(ctx);

    loop();
    collisionDetection();
    coinCollision();
    sprite.update(deltaTime);

    // coinCollision();

    window.requestAnimationFrame(gamePlay);
}

// function gamePaused() {
//     ctx.fillStyle = "rgba(100, 100, 100, 0.7)";
//     ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
//     // Draw resume button
//     ctx.fillStyle = "rgb(0, 200, 0)";
//     ctx.fillRect(300, 150, 200, 100);
//     ctx.fillRect(300, 350, 200, 100);
//     sprite.fpsCount = 0;
//     window.requestAnimationFrame(gamePaused);
// }

// document.addEventListener("click", (evnt) => {
//     // ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
//     if (gameplay === true) {
//         if (evnt.clientX >= 17 + winRect.left + 2 && evnt.clientX <= 17 + 34 + winRect.left + 2 && evnt.clientY >= 17 + winRect.top + 2 && evnt.clientY <= 17 + 35 + winRect.top + 2) {
//             gamepaused = true;
//             gameplay = false;

//             gameLoop();
//         }
//     }
// });

// document.addEventListener("click", (pauseevnt) => {
//     // ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
//     if (gamepaused === true) {
//         if (pauseevnt.clientX >= 300 + winRect.left + 2 && pauseevnt.clientX <= 500 + winRect.left + 2 && pauseevnt.clientY >= 150 + winRect.top + 2 && pauseevnt.clientY <= 250 + winRect.top + 2) {
//             gamepaused = false;
//             gameplay = true;
//             gameLoop();
//         }
//     }
// });

// Handles key event //
document.addEventListener("keydown", controller.keyListener);
document.addEventListener("keyup", controller.keyListener);

function gameEnd() {
    // ctx.drawImage(background, 0, 0);
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
    // if (gamepaused == true) {
    //     gamePaused();
    // }
    if (gameend == true) {
        gameEnd();
    }
}

gameLoop();
