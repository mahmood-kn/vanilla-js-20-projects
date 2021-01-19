const rules = document.querySelector('.rules'),
  rulesBtn = document.querySelector('.rules-btn'),
  closeBtn = document.querySelector('.close-btn'),
  startBtn = document.querySelector('.start-btn'),
  canvas = document.querySelector('#canvas'),
  ctx = canvas.getContext('2d'),
  playAgain = document.querySelector('.play-again-btn'),
  gameOver = document.querySelector('.gameover'),
  end = document.querySelector('.end'),
  endScore = document.querySelector('.end-score');

let score = 0;
let ballMove;
let life = 3;

const ball = {
  x: canvas.width / 2,
  y: canvas.height - 30,
  size: 10,
  speed: 4,
  dx: 4,
  dy: -3.5,
};

function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
  ctx.fillStyle = '#0095dd';
  ctx.fill();
  ctx.closePath();
}

const brickRowCont = 5;
const brickColumnCount = 9;
let bricks = [];
const bricksProp = {
  x1: 50,
  y1: 50,
  w: 70,
  h: 20,
  padding: 10,
  visibility: true,
};

for (let i = 0; i < brickColumnCount; i++) {
  bricks[i] = [];
  for (let j = 0; j < brickRowCont; j++) {
    let x = i * (bricksProp.w + bricksProp.padding) + bricksProp.x1;
    let y = j * (bricksProp.h + bricksProp.padding) + bricksProp.y1;
    bricks[i][j] = { x, y, ...bricksProp };
  }
}
function drawBricks() {
  bricks.forEach((column) => {
    column.forEach((brick) => {
      ctx.beginPath();
      ctx.rect(brick.x, brick.y, brick.w, brick.h);
      ctx.fillStyle = brick.visibility ? '#0095dd' : 'transparent';
      ctx.fill();
      ctx.closePath();
    });
  });
}

const paddle = {
  x: canvas.width / 2 - 55,
  y: canvas.height - 20,
  w: 110,
  h: 10,
  speed: 8,
  dx: 0,
};

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
  ctx.fillStyle = '#0095dd';
  ctx.fill();
  ctx.closePath();
}

function drawScore() {
  ctx.font = '20px Arial';
  ctx.fillText(`Score: ${score}`, canvas.width - 120, 32);
}
function drawLife() {
  ctx.font = '20px Arial';
  ctx.fillText(`Lifes: x${life}`, 50, 32);
}

function keyDown(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    paddle.dx = paddle.speed;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    paddle.dx = -paddle.speed;
  }
}

function keyUp(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight' || e.key === 'Left' || e.key === 'ArrowLeft') {
    paddle.dx = 0;
  }
}

function movePaddle() {
  paddle.x += paddle.dx;
  if (paddle.x + paddle.w > canvas.width) {
    paddle.x = canvas.width - paddle.w;
  } else if (paddle.x < 0) {
    paddle.x = 0;
  }
}

function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;
  if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
    ball.dx *= -1;
  } else if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
    ball.dy *= -1;
  }

  if (
    ball.x + ball.size > paddle.x &&
    ball.x - ball.size < paddle.x + paddle.w &&
    ball.y + ball.size > paddle.y
  ) {
    ball.dy = -ball.speed;
  }

  bricks.forEach((column) => {
    column.forEach((brick) => {
      if (brick.visibility) {
        if (
          ball.x + ball.size > brick.x &&
          ball.x - ball.size < brick.x + brick.w &&
          ball.y + ball.size > brick.y &&
          ball.y - ball.size < brick.y + brick.h
        ) {
          ball.dy *= -1;
          brick.visibility = false;

          increaseScore();
        }
      }
    });
  });
  if (ball.y + ball.size > canvas.height) {
    if (!canvas.classList.contains('hide')) {
      life--;
      if (life <= 0) {
        life = 0;
        gameIsOver(`YOU LOST!`, false);
      }
    }
  }
}

function increaseScore() {
  if (!canvas.classList.contains('hide')) {
    score++;
  }

  if (score % (brickColumnCount * brickRowCont) === 0) {
    gameIsOver('YOU WIN!', true);
  }

  if (score >= 30) {
    paddle.w = 70;
  } else {
    paddle.w = 110;
  }
}

function gameIsOver(msg, won) {
  canvas.classList.add('hide');
  gameOver.classList.add('show');
  startBtn.style.display = 'none';
  gameOver.style.display = 'flex';
  if (won) {
    end.innerText = msg;
    endScore.innerHTML = `Lifes remains: ${life}`;
  } else {
    end.innerText = msg;
    endScore.innerHTML = `Your Score: ${score}`;
  }
}

function showAllBricks() {
  bricks.forEach((column) => {
    column.forEach((brick) => (brick.visibility = true));
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBall();
  drawBricks();
  drawPaddle();
  drawScore();
  drawLife();
}
function update() {
  movePaddle();
  moveBall();
  draw();
  requestAnimationFrame(update);
}
draw();

// Events
rulesBtn.addEventListener('click', () => {
  rules.classList.toggle('show');
  if (rules.classList.contains('show')) {
    rulesBtn.innerText = 'Hide Rules';
  } else {
    rulesBtn.innerText = 'Show Rules';
  }
});

startBtn.addEventListener('click', () => {
  update();
  startBtn.style.display = 'none';
});

closeBtn.addEventListener('click', () => {
  rules.classList.remove('show');
  if (!rules.classList.contains('show')) {
    rulesBtn.innerText = 'Show Rules';
  }
});

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);
playAgain.addEventListener('click', () => window.location.reload());
