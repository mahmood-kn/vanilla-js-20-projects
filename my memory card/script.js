const addBtn = document.querySelector('.btn-add'),
  clearBtn = document.querySelector('.btn-clear'),
  cardsContainer = document.querySelector('.cards-container'),
  prev = document.querySelector('.prev'),
  next = document.querySelector('.next'),
  addItemBtn = document.querySelector('.btn-additem'),
  nav = document.querySelector('.nav'),
  addContainer = document.querySelector('.add-container'),
  closeBtn = document.querySelector('.btn-close'),
  questionEl = document.querySelector('#question'),
  answerEl = document.querySelector('#answer'),
  removeBtn = document.querySelector('.btn-remove');

let currIndex = 0;

let cardEl = [];

let cardsData = getItemLS();

let cards;
// const cardsData = [
//   {
//     question: 'What must a variable begin with?',
//     answer: 'A letter, $ or _',
//   },
//   {
//     question: 'What is a variable?',
//     answer: 'Container for a piece of data',
//   },
//   {
//     question: 'Example of Case Sensitive Variable',
//     answer: 'thisIsAVariable',
//   },
// ];

console.log(cardsData);
function createCards() {
  cardsData.forEach(createCard);
}

function createCard(item, index) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.setAttribute('data-id', `${item.id}`);
  card.innerHTML = `
  <button class="btn-remove btn btn-goast">
    <i class="fas fa-trash"></i>
  </button>
  <button class="btn-flip btn  btn-goast">
    <i class="fas fa-sync"></i> Flip
  </button>
  <div class="inner-card ">
  <div class="inner-card-front">
    <p>${item.question}</p>
  </div>
  <div class="inner-card-back">
    <p>${item.answer}</p>
  </div>
</div>
  `;

  cardEl.push(card);
  cardsContainer.appendChild(card);
  if (index === 0) {
    card.classList.add('active');
  }

  cardsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-flip')) {
      card.classList.toggle('show-answer');
    }
  });

  updateNavigation();
}

function updateNavigation() {
  nav.innerText = `${currIndex + 1}/${cardsData.length}`;
}

createCards();

function getItemLS() {
  return localStorage.getItem('cards') === null ? [] : JSON.parse(localStorage.getItem('cards'));
}

function setItemLS(cards) {
  localStorage.setItem('cards', JSON.stringify(cards));
}

function getRandomId() {
  return Math.floor(Math.random() * 1000000000);
}

function removeItemLS(id) {
  cards = getItemLS();
  cards.forEach((card, index) => {
    if (card.id === id) {
      cards.splice(index, 1);
    }
  });
  setItemLS(cards);
  window.location.reload();
}
// Events

next.addEventListener('click', () => {
  cardEl[currIndex].className = 'card left';
  currIndex++;
  if (currIndex + 1 > cardsData.length) {
    currIndex = cardsData.length - 1;
  }

  cardEl[currIndex].className = 'card active';
  updateNavigation();
});

prev.addEventListener('click', () => {
  cardEl[currIndex].className = 'card';
  currIndex--;
  if (currIndex < 0) {
    currIndex = 0;
  }

  cardEl[currIndex].className = 'card active';

  updateNavigation();
});

addBtn.addEventListener('click', () => {
  addContainer.classList.add('show');
});

closeBtn.addEventListener('click', () => {
  addContainer.classList.remove('show');
});

addItemBtn.addEventListener('click', () => {
  let question = questionEl.value;
  let answer = answerEl.value;
  let id = getRandomId();

  if (question.trim() && answer.trim()) {
    const newItem = { question, answer, id };
    cardsData.push(newItem);
    createCard(newItem);
    setItemLS(cardsData);
    updateNavigation();
    question = '';
    answer = '';
    addContainer.classList.remove('show');
    window.location.reload();
  }
});

clearBtn.addEventListener('click', () => {
  localStorage.clear();
  window.location.reload();
});

cardsContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('fa-trash')) {
    const id = e.target.parentElement.parentElement.getAttribute('data-id');
    removeItemLS(+id);
  }
});
