const parts = Array.from(document.querySelectorAll('.figure-part'));
const wordContainer = document.querySelector('.word');
const gameOverContainer = document.querySelector('.gameover-container');
const popup = document.querySelector('.message-contianer');
const gameoverMsg = document.querySelector('.gameover-msg');
const playAgain = document.querySelector('.gameover-btn');
const msgContainer = document.querySelector('.message-container');
const wrongContainer = document.querySelector('.wrong-container');

function getWords(callback) {
  fetch('https://random-word-api.herokuapp.com/word?number=1')
    .then((res) => res.json())
    .then((data) => {
      addWord(data[0]);
    });

  callback();
}

getWords(addWord);

function addWord(newWord) {
  console.log(newWord);
  // const myword = newWord;
  // wordContainer.innerHTML = `
  //     ${myword
  //       .split('')
  //       .map(
  //         (letter) => `
  //         <span class="letter">
  //           ${correctLetter.includes(letter) ? letter : ''}
  //         </span>
  //       `
  //       )
  //       .join('')}
  //   `;
}

// addWord();

// const words = ['fullstack', 'map', 'website'];

// let selectedWord = words[Math.floor(Math.random() * words.length)];
// let word = JSON.parse(localStorage.getItem('newWord'));
// let selectedWord = word[0];
// let worngLetters = [];
// let correctLetter = [];
// // console.log(selectedWord);

// async function displayWord() {
//   wordContainer.innerHTML = `
//       ${selectedWord
//         .split('')
//         .map(
//           (letter) => `
//           <span class="letter">
//             ${correctLetter.includes(letter) ? letter : ''}
//           </span>
//         `
//         )
//         .join('')}
//     `;
// }

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

// displayWord();
document.addEventListener('DOMContentLoaded', () => {
  localStorage.removeItem('newWord');
  getWords();
});
