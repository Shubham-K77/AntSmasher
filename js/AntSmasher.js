var speed;
var bugs = [];
var score;
var playing;
let squishSound, gameOverSound, bgm;
let userStarted = false;

//Function For Initial Setup
function setup() {
  let canvasWidth = windowWidth < 1024 ? 380 : 600;
  let canvasHeight = windowHeight < 1024 ? 400 : 600;
  let canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent("canvas-container");

  score = 0;
  speed = 3;
  playing = true;

  // Get audio elements
  squishSound = document.getElementById("squishSound");
  gameOverSound = document.getElementById("gameOverSound");
  bgm = document.getElementById("bgm");

  textSize(30);
}

//Function to draw the canvas
function draw() {
  background(51);
  if (frameCount % 90 === 0) {
    if (random() > 0.6) {
      bugs.push(new Insect(random(width / 2) + width / 4, random() > 0.8));
    }
  }
  if (frameCount % 900 === 0) {
    speed += 0.3;
  }
  for (var i = bugs.length - 1; i >= 0; i--) {
    bugs[i].update();
    bugs[i].draw();

    if (bugs[i].pos.y > height && !bugs[i].type) {
      endGame();
    }

    if (bugs[i].squashed) {
      bugs.splice(i, 1);
      score++;
    }
  }
  //Displaying the score
  fill(255);
  noStroke();
  text(score, 10, 40);
  //Game Over Logic!
  if (!playing) {
    fill(255);
    noStroke();
    textSize(60);
    textAlign(CENTER);
    text("Game Over!", width / 2, height / 2);
    textAlign(LEFT);
    textSize(30);
  }
}

//Function for the squashing logic
function mousePressed() {
  if (!userStarted) {
    userStarted = true;
    bgm.play();
  }
  for (var i = 0; i < bugs.length; i++) {
    if (bugs[i].squashedBy(mouseX, mouseY)) {
      bugs[i].squashed = true;
      squishSound.currentTime = 0;
      squishSound.play();
    }
    if (bugs[i].squashed && bugs[i].type) {
      endGame();
      break;
    }
  }
}

//Function to restart the game
function keyPressed() {
  if (key === " " && !playing) {
    restartGame();
  }
}

function restartGame() {
  bugs = [];
  score = 0;
  speed = 3;
  playing = true;
  loop();
}

//Function to endgame
function endGame() {
  if (userStarted) {
    gameOverSound.play();
  }
  playing = false;
  noLoop();
}
