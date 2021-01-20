const settingBtn = document.querySelector('.setting-btn'),
  settingContainer = document.querySelector('.setting-container'),
  select = document.querySelector('#difficulty'),
  startBtn = document.querySelector('.start'),
  startContainer = document.querySelector('.start-container'),
  wordEl = document.querySelector('#word'),
  text = document.querySelector('#text'),
  timeEl = document.querySelector('#time'),
  timeContainer = document.querySelector('.time-container'),
  scoreContainer = document.querySelector('.score-container'),
  scoreEl = document.querySelector('#score'),
  end = document.querySelector('.end-game'),
  gameContainer = document.querySelector('.game-container'),
  name = document.querySelector('#name');

let currName = '';
let score = 0;
let currTime = 8;
let currTimeInt;
timeEl.textContent = currTime;
let difficulty =
  localStorage.getItem('difficulty') !== null
    ? JSON.parse(localStorage.getItem('difficulty'))
    : 'medium';
select.value = difficulty;

async function getWords() {
  const res = await fetch(`https://random-word-api.herokuapp.com/word?number=1`);
  words = await res.json();
  return words;
}

async function getWord() {
  let word = await getWords();
  wordEl.textContent = word;
}

function startGame() {
  if (!gameContainer.classList.contains('started')) {
    if (name.value === '') {
      alert('Enter your name');
    } else {
      startContainer.style.display = 'none';
      gameContainer.classList.add('started');
      timeContainer.classList.add('started');
      scoreContainer.classList.add('started');
      text.focus();
      currName = name.value;
      getWord();
      setTimeout(() => {
        currTimeInt = setInterval(updtateTime, 1000);
      }, 800);
    }
  }
}

function updtateTime() {
  currTime--;
  timeEl.textContent = currTime;

  if (currTime === 0) {
    clearInterval(currTimeInt);
    gameOver();
  }
}

function gameOver() {
  gameContainer.classList.remove('started');
  timeContainer.classList.remove('started');
  scoreContainer.classList.remove('started');
  end.classList.add('gameover');
  end.innerHTML = `
    <h2>Time out</h2>
    <p>haaa chi shod <span class="name-red">${currName}</span> typer😃? asoon bood ke 😎</p>
    <p class="score">Your Score:${score}</p>
    <button onclick ='reload()'>Reload</button>
  `;
}
function reload() {
  window.location.reload();
}
// Event Listeners
startBtn.addEventListener('click', startGame);
text.addEventListener('input', (e) => {
  if (e.target.value.toLowerCase() === word.textContent) {
    getWord();
    e.target.value = '';
    score++;
    scoreEl.textContent = score;

    if (difficulty === 'easy') {
      currTime += 3;
      updtateTime();
    } else if (difficulty === 'medium') {
      currTime += 2;
      updtateTime();
    } else {
      currTime += 1;
      updtateTime();
    }
  }
});
settingBtn.addEventListener('click', () => {
  settingContainer.classList.toggle('hide');
});
select.addEventListener('change', (e) => {
  difficulty = e.target.value;
  localStorage.setItem('difficulty', JSON.stringify(difficulty));
});
