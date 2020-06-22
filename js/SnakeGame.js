let start = document.getElementById('start');
let canvas = document.getElementById('snake');
let context = canvas.getContext('2d');
let box = 32;
let direction = 'right';
let score = document.getElementById('score');
let difficulty = document.getElementById('difficulty');
let isCollision = false;

let snake = [];
snake[0] = {
  x: 8 * box,
  y: 8 * box,
};

let food = {
  x: Math.floor(Math.random() * 15 + 1) * box,
  y: Math.floor(Math.random() * 15 + 1) * box,
};

function createBG() {
  context.fillStyle = 'lightgreen';
  context.fillRect(0, 0, 16 * box, 16 * box);
}

function createSnake() {
  for (let i = 0; i < snake.length; i++) {
    context.fillStyle = 'green';
    context.fillRect(snake[i].x, snake[i].y, box, box);
  }
}

document.addEventListener('keydown', snakeDirection);

function snakeDirection(event) {
  borderCollision();
  snakeCollision();

  if (event.keyCode === 37 && direction !== 'right') direction = 'left';
  if (event.keyCode === 38 && direction !== 'down') direction = 'up';
  if (event.keyCode === 39 && direction !== 'left') direction = 'right';
  if (event.keyCode === 40 && direction !== 'up') direction = 'down';
}

function borderCollision() {
  if (
    (snake[0].x > 15 * box && direction === 'right') ||
    (snake[0].x < 0 && direction === 'left') ||
    (snake[0].y > 15 * box && direction === 'down') ||
    (snake[0].y < 0 && direction === 'up')
  ) {
    isCollision = true;
  }
}

function snakeCollision() {
  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
      isCollision = true;
    }
  }
}

function drawFood() {
  context.fillStyle = 'red';
  context.fillRect(food.x, food.y, box, box);
}

function nivelDifficulty() {
  function upNivel(newSpeedy, description) {
    difficulty.textContent = description;
    clearInterval(game);
    game = setInterval(startedGame, newSpeedy);
  }

  if (snake.length === 6) upNivel(160, 'Medium');
  if (snake.length === 14) upNivel(110, 'Hard');
  if (snake.length === 28) upNivel(90, 'Expert');
}

function startedGame() {
  borderCollision();
  snakeCollision();
  createBG();
  createSnake();
  drawFood();

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction === 'right') snakeX += box;
  if (direction === 'left') snakeX -= box;
  if (direction === 'up') snakeY -= box;
  if (direction === 'down') snakeY += box;

  if (snakeX != food.x || snakeY != food.y) {
    snake.pop();
    score.textContent = snake.length;
  } else {
    food.x = Math.floor(Math.random() * 15 + 1) * box;
    food.y = Math.floor(Math.random() * 15 + 1) * box;
  }

  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  snake.unshift(newHead);

  nivelDifficulty();
  if (isCollision) {
    clearInterval(game);
  }
}

let game = null;
function newGame() {
  game = setInterval(startedGame, 200);
}

startedGame();
start.addEventListener('click', newGame);
