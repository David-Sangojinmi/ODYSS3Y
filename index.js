/*
Author: David Sangojinmi
Background image: https://craftpix.net/freebies/free-horizontal-2d-game-backgrounds/?utm_source=opengameart&utm_medium=public&utm_campaign=myself
Terrain tile set: 
Sprite sheets: 
TODO:
    [X] Better player terrain interaction
    [X] Animate player moving left/right and jump
    [X] Implement general collision detection for blocks
    [X] Allow recognition for which type of collision is happening (l/r/u/d)
    [X] Player shouldn't be able to double jump through platforms
    [X] Player should lose hp when he falls in ditches
    [X] Make each terrain tile an object
        [X] And then try rewriting the collision logic
    [X] Add moving enemies
    [X] Add a portal at the end of each level
    [X] Add more levels
FIXME:
    [X] Fix the spawning bug after falling off platform
    [X] Fix the bug with the pause button
    [ ] Fix bug that makes sprite jump to raised platform instead of going
        underneath them
    [X] Sprite reaching portal should end game or move to next level
    [X] Portals on level 2 and 3 not appearing
    [X] Fix game end screen not stopping all other scrips
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
import Enemy from "./src/enemy.js";
import EndPoint from "./src/endpoint.js";

// Load audio
var jump = new Audio();
var getCoin = new Audio();
var click = new Audio();
var playerHurt = new Audio();
jump.src = "sounds/jump.wav";
getCoin.src = "sounds/coinCollect.wav"; // Coin sounds: coin | coinCollect
click.src = "sounds/buttonClick1.wav"; // Button sounds: click | buttonClick1 | buttonClick2
playerHurt.src = "sounds/hurt.wav";

// Important variables and instances
let bg = new Background(GAME_WIDTH, GAME_HEIGHT);
let platform = new Platform(GAME_WIDTH, GAME_HEIGHT);
let level1block = [];
let level1blockCount = 0;
let level2block = [];
let level2blockCount = 0;
let level3block = [];
let level3blockCount = 0;
for (var i = 0; i < platform.level1.length; i++) {
    for (var j = 0; j < platform.level1[i].length; j++) {
        level1block[level1blockCount] = new Block(j * 40, i * 40, 40, 40, platform.level1[i][j]);
        level1blockCount++;
    }
}
for (var i = 0; i < platform.level2.length; i++) {
    for (var j = 0; j < platform.level2[i].length; j++) {
        level2block[level2blockCount] = new Block(j * 40, i * 40, 40, 40, platform.level2[i][j]);
        level2blockCount++;
    }
}
for (var i = 0; i < platform.level3.length; i++) {
    for (var j = 0; j < platform.level3[i].length; j++) {
        level3block[level3blockCount] = new Block(j * 40, i * 40, 40, 40, platform.level3[i][j]);
        level3blockCount++;
    }
}
let activelevel = [level1block, level2block, level3block];
let currentlevel = 1;
let sprite = new Sprite(GAME_WIDTH, GAME_HEIGHT);
let levelportal = new EndPoint(activelevel[currentlevel - 1][839].x + 40, activelevel[currentlevel - 1][839].y - 120);
let gScreens = new gameScreens(GAME_WIDTH, GAME_HEIGHT);
let gStats = new gameStats(GAME_WIDTH, GAME_HEIGHT);
let level1enemies = [];
let level2enemies = [];
let level3enemies = [];
level1enemies[0] = new Enemy(activelevel[0][740].x, activelevel[0][740].y, activelevel[0][735].x, activelevel[0][741].x, 3, 3);
level1enemies[1] = new Enemy(activelevel[0][770].x, activelevel[0][770].y, activelevel[0][759].x, activelevel[0][771].x, 4, 4);
level2enemies[0] = new Enemy(activelevel[1][770].x, activelevel[1][770].y, activelevel[1][759].x, activelevel[1][771].x, 4, 4);
level2enemies[1] = new Enemy(activelevel[1][770].x, activelevel[1][770].y, activelevel[1][755].x, activelevel[1][771].x, 5, 5);
level3enemies[0] = new Enemy(activelevel[2][770].x, activelevel[2][770].y, activelevel[2][759].x, activelevel[2][771].x, 4, 4);
level3enemies[1] = new Enemy(activelevel[2][770].x, activelevel[2][770].y, activelevel[2][759].x, activelevel[2][771].x, 4, 4);
let activeenemies = [level1enemies, level2enemies, level3enemies];
var gamestart = true;
var gameinstructions = false;
var gameplay = false;
var gamepaused = false;
var gameend = false;
var lastTime = 0;
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

    if (gamestart === true) {
        window.requestAnimationFrame(gameStart);
    }
}

document.addEventListener("click", (ev) => {
    if (gamestart === true) {
        if (
            ev.clientX >= 336 + winRect.left + 2 &&
            ev.clientX <= 336 + gScreens.playBtn1.width + winRect.left + 2 &&
            ev.clientY >= 452 + winRect.top + 2 &&
            ev.clientY <= 452 + gScreens.playBtn1.height + winRect.top + 2
        ) {
            click.play();
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

    if (gameinstructions === true) {
        window.requestAnimationFrame(gameInstructions);
    }
}

document.addEventListener("click", (instructionsev) => {
    if (gameinstructions === true) {
        if (
            instructionsev.clientX >= 565 + winRect.left + 2 &&
            instructionsev.clientX <= 565 + gScreens.gameNext.width + winRect.left + 2 &&
            instructionsev.clientY >= 424 + winRect.top + 2 &&
            instructionsev.clientY <= 424 + gScreens.gameNext.height + winRect.top + 2
        ) {
            click.play();
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
            click.play();
            gamestart = true;
            gameinstructions = false;
            gameplay = false;
            gameLoop();
        }
    }
});

function coinCollision() {
    for (var i = 0; i < activelevel[currentlevel - 1].length; i++) {
        if (activelevel[currentlevel - 1][i].id === 9) {
            if (
                sprite.position.x >= activelevel[currentlevel - 1][i].x - 27 &&
                sprite.position.x <= activelevel[currentlevel - 1][i].x + 33 + 5 &&
                activelevel[currentlevel - 1][i].y >= sprite.position.y - 33 - 5 &&
                activelevel[currentlevel - 1][i].y <= sprite.position.y + sprite.spritesheetHeight &&
                activelevel[currentlevel - 1][i].coinActive === true
            ) {
                activelevel[currentlevel - 1][i].coinActive = false;
                getCoin.play();
                gStats.points += 1;
                gScreens.coin1Count += 1;
            }
        } else if (activelevel[currentlevel - 1][i].id === 10) {
            if (
                sprite.position.x >= activelevel[currentlevel - 1][i].x - 27 &&
                sprite.position.x <= activelevel[currentlevel - 1][i].x + 33 + 5 &&
                activelevel[currentlevel - 1][i].y >= sprite.position.y - 33 - 5 &&
                activelevel[currentlevel - 1][i].y <= sprite.position.y + sprite.spritesheetHeight &&
                activelevel[currentlevel - 1][i].coinActive === true
            ) {
                activelevel[currentlevel - 1][i].coinActive = false;
                getCoin.play();
                gStats.points += 3;
                gScreens.coin2Count += 1;
            }
        }
    }
}

function enemyCollision() {
    for (var i = 0; i < activeenemies[currentlevel - 1].length; i++) {
        if (sprite.position.x >= activeenemies[currentlevel - 1][i].x - 29 && sprite.position.x <= activeenemies[currentlevel - 1][i].x + 40 && activeenemies[currentlevel - 1][i].y >= sprite.position.y - 40 && activeenemies[currentlevel - 1][i].y <= sprite.position.y + sprite.spritesheetHeight) {
            ctx.fillStyle = "red";
            ctx.fillRect(sprite.position.x, sprite.position.y - 10, 30, 3);
            playerHurt.play();
            gStats.hp -= gStats.onehp / 2;
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
        jump.play();
        sprite.dY -= 16; // Jump height
        sprite.jumping = true;
    } else if (controller.left) {
        sprite.drawMovingLeft(ctx);
        sprite.dX -= 0.5;
    } else if (controller.right) {
        sprite.drawMovingRight(ctx);
        sprite.dX += 0.5;
    } else {
        sprite.drawIdleSprite(ctx);
    }

    sprite.dY += 0.92; // Gravity - come down slower or quicker
    sprite.position.y += 2 * sprite.dY;
    sprite.dX *= 0.89; // Friction
    sprite.dY *= 0.9; // Friction

    if (sprite.position.x + sprite.width > 550) {
        // Scroll left
        bg.posGP.l1x -= sprite.dX * 0.2;
        bg.posGP.l2x -= sprite.dX * 0.4;
        bg.posGP.l3x -= sprite.dX * 0.6;
        bg.posGP.l4x -= sprite.dX * 0.8;
        for (var i = 0; i < activeenemies[currentlevel - 1].length; i++) {
            activeenemies[currentlevel - 1][i].x -= sprite.dX;
            activeenemies[currentlevel - 1][i].xLBound -= sprite.dX;
            activeenemies[currentlevel - 1][i].xRBound -= sprite.dX;
        }
        levelportal.x -= sprite.dX;
        for (var i = 0; i < activelevel[currentlevel - 1].length; i++) {
            activelevel[currentlevel - 1][i].x -= sprite.dX;
        }
        sprite.position.x = 550 - sprite.width;
    }
    if (sprite.position.x < 250) {
        // Scroll Right
        bg.posGP.l1x -= sprite.dX * 0.2;
        bg.posGP.l2x -= sprite.dX * 0.4;
        bg.posGP.l3x -= sprite.dX * 0.6;
        bg.posGP.l4x -= sprite.dX * 0.8;
        for (var i = 0; i < activeenemies[currentlevel - 1].length; i++) {
            activeenemies[currentlevel - 1][i].x -= sprite.dX;
            activeenemies[currentlevel - 1][i].xLBound -= sprite.dX;
            activeenemies[currentlevel - 1][i].xRBound -= sprite.dX;
        }
        levelportal.x -= sprite.dX;
        for (var i = 0; i < activelevel[currentlevel - 1].length; i++) {
            activelevel[currentlevel - 1][i].x -= sprite.dX;
        }
        sprite.position.x = 250;
    }
    if (sprite.position.x >= 250 && sprite.position.x <= 550) {
        // Sprite moving
        sprite.position.x += sprite.dX;
    }
}

function resetPosition() {
    bg.posGP.l1x = 0;
    bg.posGP.l2x = 0;
    bg.posGP.l3x = 0;
    bg.posGP.l4x = 0;
    if (sprite.position.x > activelevel[currentlevel - 1][786].x) {
        if (activelevel[currentlevel - 1][786].x < 0) {
            rstPosDff = 240 + Math.abs(activelevel[currentlevel - 1][786].x);
        }
        if (activelevel[currentlevel - 1][786].x > 0) {
            rstPosDff = 240 - activelevel[currentlevel - 1][786].x;
        }
        for (var i = 0; i < level1block.length; i++) {
            activelevel[currentlevel - 1][i].x += rstPosDff;
        }
    } else if (sprite.position.x < activelevel[currentlevel - 1][786].x) {
        rstPosDff = activelevel[currentlevel - 1][786].x - 240;
        for (var i = 0; i < level1block.length; i++) {
            activelevel[currentlevel - 1][i].x -= rstPosDff;
        }
    }
    // for (var i = 0; i < activeenemies[currentlevel - 1].length; i++) {
    // }
    activeenemies[currentlevel - 1][0].x = activelevel[currentlevel - 1][740].x;
    activeenemies[currentlevel - 1][0].y = activelevel[currentlevel - 1][740].y;
    activeenemies[currentlevel - 1][0].xLBound = activelevel[currentlevel - 1][735].x;
    activeenemies[currentlevel - 1][0].xRBound = activelevel[currentlevel - 1][741].x;
    activeenemies[currentlevel - 1][1].x = activelevel[currentlevel - 1][770].x;
    activeenemies[currentlevel - 1][1].y = activelevel[currentlevel - 1][770].y;
    activeenemies[currentlevel - 1][1].xLBound = activelevel[currentlevel - 1][759].x;
    activeenemies[currentlevel - 1][1].xRBound = activelevel[currentlevel - 1][771].x;
    sprite.position.x = 250;
    sprite.position.y = 300;
    levelportal.x = activelevel[currentlevel - 1][839].x + 40;
    levelportal.y = activelevel[currentlevel - 1][839].y - 120;
}

function collisionDetection(levelParameter, portalParameter) {
    //    Horizontal block collision   //
    for (var i = 0; i < activelevel[currentlevel - 1].length; i++) {
        if (
            activelevel[currentlevel - 1][i].id != 0 &&
            activelevel[currentlevel - 1][i].id != 9 &&
            activelevel[currentlevel - 1][i].id != 10 &&
            sprite.position.x + 15 >= activelevel[currentlevel - 1][i].x &&
            sprite.position.x <= activelevel[currentlevel - 1][i].x + 40 - 15 &&
            sprite.position.y >= activelevel[currentlevel - 1][i].y - 72
        ) {
            sprite.jumping = false;
            sprite.position.y = activelevel[currentlevel - 1][i].y - 72;
            sprite.dY = 0;
            ctx.fillStyle = "#03fcf0";
            ctx.fillRect(activelevel[currentlevel - 1][i].x, activelevel[currentlevel - 1][i].y, 40, 2);
            if (sprite.position.x > activelevel[currentlevel - 1][1].x && sprite.position.x < activelevel[currentlevel - 1][898].x && i >= 180 && i <= 898) {
                if (activelevel[currentlevel - 1][i - 59].id != 0 && activelevel[currentlevel - 1][i - 59].id != 9 && activelevel[currentlevel - 1][i - 59].id != 10) {
                    if (sprite.position.x + 30 >= activelevel[currentlevel - 1][i - 59].x) {
                        sprite.position.x = activelevel[currentlevel - 1][i - 59].x - 30;
                        ctx.fillStyle = "red";
                        ctx.fillRect(activelevel[currentlevel - 1][i - 59].x, activelevel[currentlevel - 1][i - 59].y, 2, 40);
                    }
                } else if (activelevel[currentlevel - 1][i - 119].id != 0 && activelevel[currentlevel - 1][i - 119].id != 9 && activelevel[currentlevel - 1][i - 119].id != 10) {
                    if (sprite.position.x + 30 >= activelevel[currentlevel - 1][i - 119].x) {
                        sprite.position.x = activelevel[currentlevel - 1][i - 119].x - 30;
                        ctx.fillStyle = "red";
                        ctx.fillRect(activelevel[currentlevel - 1][i - 119].x, activelevel[currentlevel - 1][i - 119].y, 2, 40);
                    }
                }
                if (activelevel[currentlevel - 1][i - 61].id != 0 && activelevel[currentlevel - 1][i - 61].id != 9 && activelevel[currentlevel - 1][i - 61].id != 10) {
                    if (sprite.position.x <= activelevel[currentlevel - 1][i - 61].x + 40) {
                        sprite.position.x = activelevel[currentlevel - 1][i - 61].x + 40;
                        ctx.fillStyle = "orange";
                        ctx.fillRect(activelevel[currentlevel - 1][i - 61].x + 38, activelevel[currentlevel - 1][i - 61].y, 2, 40);
                    }
                } else if (activelevel[currentlevel - 1][i - 121].id != 0 && activelevel[currentlevel - 1][i - 121].id != 9 && activelevel[currentlevel - 1][i - 121].id != 10) {
                    if (sprite.position.x <= activelevel[currentlevel - 1][i - 121].x + 40) {
                        sprite.position.x = activelevel[currentlevel - 1][i - 121].x + 40;
                        ctx.fillStyle = "orange";
                        ctx.fillRect(activelevel[currentlevel - 1][i - 121].x + 38, activelevel[currentlevel - 1][i - 121].y, 2, 40);
                    }
                }
            }
        }
    }

    //         Falling off edge        //
    if (sprite.position.y >= activelevel[currentlevel - 1][899].y + 40) {
        gStats.hp -= gStats.onehp;
        resetPosition();
    }

    //         Portal detection        //
    if (sprite.position.x > portalParameter.x - 30 && sprite.position.x <= portalParameter.x + 60 && sprite.position.y >= portalParameter.y && sprite.position.y <= portalParameter.y + 120 - 72) {
        if (currentlevel === 3) {
            sprite.position.x = levelParameter[839].x + 70;
            sprite.position.y = levelParameter[839].y - 36;
            gamestart = false;
            gameinstructions = false;
            gameplay = false;
            gameend = true;
            gameLoop();
        } else if (currentlevel < 3) {
            currentlevel += 1;
            resetPosition();
        }
    }
}

function gamePlay(timestamp) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    bg.gpdraw(ctx);
    for (var i = 0; i < activelevel[currentlevel - 1].length; i++) {
        activelevel[currentlevel - 1][i].drawBlock(ctx);
        if (activelevel[currentlevel - 1][i].id != 0) {
            activelevel[currentlevel - 1][i].active(ctx, i);
        }
    }
    gStats.update(deltaTime);
    gStats.display(ctx, gScreens.coin1Count + 3 * gScreens.coin2Count);

    levelportal.display(ctx);
    loop();
    collisionDetection(level1block, levelportal);
    coinCollision();
    for (var i = 0; i < activeenemies[currentlevel - 1].length; i++) {
        activeenemies[currentlevel - 1][i].display(ctx);
        activeenemies[currentlevel - 1][i].patrol();
    }
    enemyCollision();
    sprite.update(deltaTime);

    if (gStats.hp === 0) {
        gameplay = false;
        gameend = true;
        gameLoop();
    }

    if (gameplay === true) {
        window.requestAnimationFrame(gamePlay);
    }
}

function gamePaused() {
    gScreens.pauseScreen(ctx);

    if (gamepaused === true) {
        window.requestAnimationFrame(gamePaused);
    }
}

document.addEventListener("click", (evnt) => {
    if (gameplay === true && gamepaused === false) {
        if (evnt.clientX >= 17 + winRect.left + 2 && evnt.clientX <= 17 + 34 + winRect.left + 2 && evnt.clientY >= 17 + winRect.top + 2 && evnt.clientY <= 17 + 35 + winRect.top + 2) {
            click.play();
            gamepaused = true;
            gameplay = false;
            gameLoop();
        }
    }
});

document.addEventListener("click", (pauseevnt) => {
    if (gamepaused === true && gameplay === false) {
        if (pauseevnt.clientX >= 305 + winRect.left + 2 && pauseevnt.clientX <= 495 + winRect.left + 2 && pauseevnt.clientY >= 181 + winRect.top + 2 && pauseevnt.clientY <= 275 + winRect.top + 2) {
            click.play();
            gamepaused = false;
            gameplay = true;
            gameLoop();
        }
        if (pauseevnt.clientX >= 305 + winRect.left + 2 && pauseevnt.clientX <= 495 + winRect.left + 2 && pauseevnt.clientY >= 325 + winRect.top + 2 && pauseevnt.clientY <= 419 + winRect.top + 2) {
            click.play();
            gamepaused = false;
            gameplay = false;
            gameend = true;
            gameLoop();
        }
    }
});

// Handles key events //
document.addEventListener("keydown", controller.keyListener);
document.addEventListener("keyup", controller.keyListener);

function gameEnd() {
    ctx.clearRect(0, 0, 800, 600);
    gScreens.levelReached = currentlevel;

    gScreens.endScreen(ctx);

    window.requestAnimationFrame(gameEnd);
}

///////////////////////////////
////     GAMEPLAY INIT     ////
///////////////////////////////
function gameLoop() {
    if (gamestart === true) {
        gameStart();
    }
    if (gameinstructions === true) {
        gameInstructions();
    }
    if (gameplay === true) {
        gamePlay();
    }
    if (gamepaused == true) {
        gamePaused();
    }
    if (gameend === true) {
        gameEnd();
    }
}

gameLoop();
