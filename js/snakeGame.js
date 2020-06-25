const buttonStartGame = document.getElementById('startGame');
const canvas = document.getElementById('snake');
const context = canvas.getContext('2d');
const box = 32;
const score = document.getElementById('score');
const bonus = document.getElementById('bonus');
const difficulty = document.getElementById('difficulty');
let direction = 'right';
let isCollision = false;

let snake = [];
snake[0] = {
  x: 8 * box,
  y: 8 * box,
};

let food = {
  isBonus: false,
  point: 0,
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
  const color =
    food.point === 0
      ? 'red'
      : food.point === 2
      ? 'yellow'
      : food.point === 3
      ? 'orange'
      : 'blue';

  context.fillStyle = color;
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
  } else {
    score.textContent = snake.length;
    bonus.textContent = food.isBonus
      ? +bonus.textContent + food.point
      : bonus.textContent;

    food.x = Math.floor(Math.random() * 15 + 1) * box;
    food.y = Math.floor(Math.random() * 15 + 1) * box;

    if (snake.length % 6 === 0) {
      const newPoint = Math.round(Math.random() * 4);
      food.point = newPoint <= 1 ? 2 : newPoint;
      food.isBonus = true;
    } else {
      food.point = 0;
      food.isBonus = false;
    }
  }

  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  snake.unshift(newHead);

  nivelDifficulty();
  if (isCollision) {
    clearInterval(game);

    recordScore({
      bonus: bonus.textContent,
      score: score.textContent,
      difficulty: difficulty.textContent,
    });
  }
}

let game = null;
function newGame() {
  game = setInterval(startedGame, 200);
}

startedGame();
buttonStartGame.addEventListener('click', newGame);
