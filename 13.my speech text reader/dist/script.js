const toggleBtn = document.querySelector('.toggle-btn'),
  main = document.querySelector('main'),
  textBoxContainer = document.querySelector('.text-box-container'),
  readBtn = document.querySelector('.read-btn'),
  closeBtn = document.querySelector('.close-btn'),
  voiceSelect = document.querySelector('.voice-select'),
  textArea = document.querySelector('#text-box');

const message = new SpeechSynthesisUtterance();
const data = [
  {
    image: './img/drink.jpg',
    text: "I'm Thirsty",
  },
  {
    image: './img/food.jpg',
    text: "I'm Hungry",
  },
  {
    image: './img/tired.jpg',
    text: "I'm Tired",
  },
  {
    image: './img/hurt.jpg',
    text: "I'm Hurt",
  },
  {
    image: './img/happy.jpg',
    text: "I'm Happy",
  },
  {
    image: './img/angry.jpg',
    text: "I'm Angry",
  },
  {
    image: './img/sad.jpg',
    text: "I'm Sad",
  },
  {
    image: './img/scared.jpg',
    text: "I'm Scared",
  },
  {
    image: './img/outside.jpg',
    text: 'I Want To Go Outside',
  },
  {
    image: './img/home.jpg',
    text: 'I Want To Go Home',
  },
  {
    image: './img/school.jpg',
    text: 'I Want To Go To School',
  },
  {
    image: './img/grandma.jpg',
    text: 'I Want To Go To Grandmas',
  },
];

data.forEach(creatBox);

function creatBox(item) {
  const { image, text } = item;
  const box = document.createElement('div');
  box.classList.add('box');
  box.innerHTML = `
    <img src="${image}" alt="${text}"/>
    <p>${text}</p>
  `;
  box.addEventListener('click', () => {
    setTextMessage(text);
    speakText();

    box.classList.add('active');

    setTimeout(() => {
      box.classList.remove('active');
    }, 800);
  });
  main.appendChild(box);
}

let voices = [];

function getVoices() {
  voices = speechSynthesis.getVoices();

  voices.forEach((voice) => {
    const option = document.createElement('option');

    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;

    voiceSelect.appendChild(option);
  });
}

function setTextMessage(text) {
  message.text = text;
}

function speakText() {
  speechSynthesis.speak(message);
}

function setVoice(e) {
  message.voice = voices.find((voice) => voice.name === e.target.value);
}

getVoices();
speechSynthesis.addEventListener('voiceschanged', getVoices);

toggleBtn.addEventListener('click', () => textBoxContainer.classList.toggle('show'));
closeBtn.addEventListener('click', () => textBoxContainer.classList.remove('show'));

voiceSelect.addEventListener('change', setVoice);

readBtn.addEventListener('click', () => {
  setTextMessage(textArea.value);
  speakText();
});
