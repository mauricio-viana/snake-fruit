let canvas = document.getElementById('snake');
let context = canvas.getContext('2d');
let box = 32;
let direction = 'right';
let score = document.getElementById('score');
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
  console.log('x:' + snake[0].x + ' y:' + snake[0].y);
  if (
    (snake[0].x > 15 * box && direction === 'right') ||
    (snake[0].x < 0 && direction === 'left') ||
    (snake[0].y > 15 * box && direction === 'down') ||
    (snake[0].y < 0 && direction === 'up')
  ) {
    console.log('x:' + snake[0].x + ' y:' + snake[0].y);
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
  if (isCollision) {
    clearInterval(game);
    alert('Game Over :(');
    return;
  }
}

const game = setInterval(startedGame, 100);
