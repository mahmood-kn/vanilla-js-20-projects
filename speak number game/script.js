const msgEl = document.getElementById('msg');

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

const num = getRandomNum();
console.log(num);

function getRandomNum() {
  return Math.floor(Math.random() * 100) + 1;
}

recognition.start();

function onSpeak(e) {
  const msg = +e.results[0][0].transcript;
  game(msg);
}

function game(msg) {
  if (Number.isNaN(msg)) {
    msgEl.innerHTML += '<div>That is not a valid number</div>';
  } else {
    msgEl.innerHTML = `
    <span>You said:</span>
    <div class="box">${msg}</div>
    `;

    if (msg === num) {
      document.body.innerHTML = `<h1>You Win! <br><br> The number was ${num}</h1> <button id="play-again" class="play-again">Play again</button>`;
    } else if (msg < num) {
      msgEl.innerHTML += '<div>GO HIGHER</div>';
    } else {
      msgEl.innerHTML += '<div>GO LOWER</div>';
    }
  }
}

recognition.addEventListener('result', onSpeak);

recognition.addEventListener('end', () => recognition.start());

document.body.addEventListener('click', (e) => {
  if (e.target.id == 'play-again') {
    window.location.reload();
  }
});
