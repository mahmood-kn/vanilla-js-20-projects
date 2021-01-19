const parts = Array.from(document.querySelectorAll('.figure-part'));
const wordContainer = document.querySelector('.word');
const gameOverContainer = document.querySelector('.gameover-container');
const popup = document.querySelector('.message-contianer');
const gameoverMsg = document.querySelector('.gameover-msg');
const playAgain = document.querySelector('.gameover-btn');
const msgContainer = document.querySelector('.message-container');
const wrongContainer = document.querySelector('.wrong-container');
async function getWords() {
  const res = await fetch('https://random-word-api.herokuapp.com/word?number=1');
  const word = await res.json();
  console.log(word[0]);
  let newWord;
  if (localStorage.getItem('newWord') === null) {
    newWord = [];
    newWord.push(word[0]);
  } else {
    newWord = JSON.parse(localStorage.getItem('newWord'));
    newWord.push(word[0]);
  }
  localStorage.setItem('newWord', JSON.stringify(newWord));

  console.log(newWord);
}
getWords();
// window.location.reload();

// const words = ['fullstack', 'map', 'website'];

// let selectedWord = words[Math.floor(Math.random() * words.length)];

let word = JSON.parse(localStorage.getItem('newWord'));
// console.log(word);
let selectedWord = word[0];
let worngLetters = [];
let correctLetter = [];
console.log(selectedWord);

function displayWord() {
  wordContainer.innerHTML = `
      ${selectedWord
        .split('')
        .map(
          (letter) => `
          <span class="letter">
            ${correctLetter.includes(letter) ? letter : ''}
          </span>
        `
        )
        .join('')}
    `;
}

function checkLetter(key) {
  if (selectedWord.split('').includes(key)) {
    if (!correctLetter.includes(key)) {
      correctLetter.push(key);
      displayWord();
      let innerLetter = wordContainer.innerText.replace(/\n/g, '');
      if (innerLetter.length === selectedWord.split('').length) {
        gameOverContainer.style.display = 'flex';
        gameoverMsg.textContent = 'Game Over , You win 😃';
      }
    } else {
      showNotification();
    }
  } else {
    if (!worngLetters.includes(key)) {
      worngLetters.push(key);
      updateWrongLetter();

      hangMan();
    } else {
      showNotification();
    }
  }
}
function updateWrongLetter() {
  wrongContainer.innerHTML = `
      ${worngLetters.length > 0 ? '<p>Wrong Letters</p>' : ''}
      ${worngLetters.map((letter) => `<span class="wrong-letter">${letter}</span>`)}
      
      `;
}

function hangMan() {
  if (worngLetters.length < parts.length) {
    let count = worngLetters.length - 1;
    parts[count].classList.add('show-part');
  } else {
    gameOverContainer.style.display = 'flex';
    gameoverMsg.textContent = 'Game Over , You lose 😕';
  }
}

window.addEventListener('keydown', (e) => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    checkLetter(e.key);
  }
});

function showNotification() {
  msgContainer.classList.add('show');
  setTimeout(() => {
    msgContainer.classList.remove('show');
  }, 1500);
}

playAgain.addEventListener('click', () => {
  gameOverContainer.style.display = 'none';

  // selectedWord = words[Math.floor(Math.random() * words.length)];
  worngLetters.splice(0);
  correctLetter.splice(0);
  parts.forEach((part) => {
    part.classList.remove('show-part');
  });
  // console.log(selectedWord);
  displayWord();
  updateWrongLetter();
  window.location.reload();
});

document.addEventListener('DOMContentLoaded', () => {
  localStorage.clear();
  // getWords();
});

displayWord();
