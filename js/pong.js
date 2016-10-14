/* 
*   Assignment 2 - Advanced Client-Side Scripting
*   Tara Lynne McNeil
*   JavaScript Pong Game - Canvas Drawing
*/


// declare variables
// get canvas
var canvas = document.getElementById("canvas");
// variable to store the 2D rendering context
var context = canvas.getContext("2d");
var ballRadius = 10;
// define x and y
var x = canvas.width / 2;
var y = canvas.height - 30;
// detect x and y
var dx = 2;
var dy = -2;
// create paddle
var padHeight = 15;
var padWidth = 100;
var padX = (canvas.width - padWidth) / 2;
// variable to use keys for controll
var right = false;
var left = false;
// number of rows and columns to calculate bricks
var rowCount = 8;
var colCount = 4;
// brick styles
var brickWidth = 70;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
// score and lives
var score = 0;
var lives = 3;


var bricks = [];
for (c = 0; c < colCount; c++) {
    bricks[c] = [];
    for (r = 0; r < rowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

// default values for key handlers
document.addEventListener("keydown", keyDown, false);
document.addEventListener("keyup", keyUp, false);
document.addEventListener("mousemove", mouseMove, false);

// create function that moves paddle when key is pressed
function keyDown(e) {
    if (e.keyCode == 39) {
        // if right key is pressed
        right = true;
    } else if (e.keyCode == 37) {
        // if left key is pressed
        left = true;
    }
}

// create function that moves paddle when key is released
function keyUp(e) {
    if (e.keyCode == 39) {
        // if right key is released
        right = false;
    }
    else if (e.keyCode == 37) {
        // if left key is released
        left = false;
    }
}

// create function that moves paddle when mouse moves
function mouseMove(e) {
    var relX = e.clientX - canvas.offsetLeft;
    if (relX > 0 && relX < canvas.width) {
        padX = relX - padWidth / 2;
    }
}

// create function to detect if the ball hits the bricks
function collisionDetection() {
    for (c = 0; c < colCount; c++) {
        for (r = 0; r < rowCount; r++) {
            var b = bricks[c][r];
            if (b.status == 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    // alert the user that they have beaten the game and reload the page
                    if (score == rowCount * colCount) {
                        alert("CONGRATS! YOU BEAT THE GAME.");
                        document.location.reload();
                    }
                }
            }
        }
    }
}

// create a function to draw the ball
function ball() {
    context.beginPath();
    //set ball radius x and y, starting point
    context.arc(x, y, ballRadius, 0, Math.PI * 2);
    context.fillStyle = "#c21000";
    context.fill();
    context.closePath();
}

// create a function to draw the paddle
function paddle() {
    context.beginPath();
    // set padX, height and width 
    context.rect(padX, canvas.height - padHeight, padWidth, padHeight);
    context.fillStyle = "#fcff66";
    context.fill();
    context.closePath();
}

// create a function that loops through the bricks in the array 
// the different bricks creates the different bricks
function createBricks() {
    for (c = 0; c < colCount; c++) {
        for (r = 0; r < rowCount; r++) {
            if (bricks[c][r].status == 1) {
                var brickX = (r * (brickWidth + brickPadding)) + brickOffsetLeft;
                var brickY = (c * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                context.beginPath();
                context.rect(brickX, brickY, brickWidth, brickHeight);
                context.fillStyle = "#fcff66";
                context.fill();
                context.closePath();
            }
        }
    }
}

// create a function that draws the score on canvas
function scored() {
    context.font = "16px Arial";
    context.fillStyle = "#C7FFEE";
    context.fillText("Score: " + score, 8, 20);
}

// create a function that draws the lives on canvas
function life() {
    context.font = "16px Arial";
    context.fillStyle = "#C7FFEE";
    context.fillText("Lives: " + lives, canvas.width - 65, 20);
}

// a fuction to draw canvas elements
function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    createBricks();
    ball();
    paddle();
    scored();
    life();
    collisionDetection();

    // allow ball to bounce off the walls
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }

    // only allow the ball to bounce of the 3 walls (top, left and right)
    if (y + dy < ballRadius) {
        dy = -dy;
        // detect if the center of the ball is between the edges of the paddle
    } else if (y + dy > canvas.height - ballRadius) {
        // if so bounce the ball off the paddel 
        if (x > padX && x < padX + padWidth) {
            dy = -dy;
            // determine if it is a game over or lost life
        } else {
            lives--;
            // if lives are empty alert game over and ask if they want to play the game again 
            if (!lives) {
                // if they don't redirect to the home page'
                var relay = prompt("GAME OVER!! Would you like you replay the game? (y/n)");
                if (relay == 'n') {
                    // if they don't redirect to the home page'
                    document.location = "index.html"
                } else {
                    // if they do reload the page
                    document.location.reload();
                }
            } else {
                // if lives aren't empty restart ball at starting point' 
                x = canvas.width / 2;
                y = canvas.height - 30;
                dx = 3;
                dy = -3;
                padX = (canvas.width - padWidth) / 2;
            }
        }
    }

    if (right && padX < canvas.width - padWidth) {
        padX += 7;
    } else if (left && padX > 0) {
        padX -= 7;
    }

    x += dx;
    y += dy;
    requestAnimationFrame(draw);
}

draw();