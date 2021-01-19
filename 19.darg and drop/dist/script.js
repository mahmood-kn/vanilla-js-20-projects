const draggableList = document.querySelector('.draggable-list'),
  checkBtn = document.querySelector('.check');

const richestPeople = [
  'Jeff Bezos',
  'Bill Gates',
  'Warren Buffett',
  'Bernard Arnault',
  'Carlos Slim Helu',
  'Amancio Ortega',
  'Larry Ellison',
  'Mark Zuckerberg',
  'Michael Bloomberg',
  'Larry Page',
];

let rightCount = 0;
let wrongCount = 0;

const listItems = [];
let dargStartIndex;

createItems();

function createItems() {
  [...richestPeople]
    .map((a) => {
      return { value: a, sort: Math.random() };
    })
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)
    .forEach((person, index) => {
      const li = document.createElement('li');
      li.setAttribute('data-index', index);
      li.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
          <p class="person-name">${person}</p>
          <i class="fas fa-grip-lines"></i>
        </div>
      `;

      draggableList.appendChild(li);
      listItems.push(li);
    });
  addEventListeners();
}

function dragStart() {
  // console.log(1);
  dargStartIndex = +this.closest('li').getAttribute('data-index');
}

function dragOver(e) {
  e.preventDefault();
}

function dragDrop() {
  const dragEndIndex = +this.getAttribute('data-index');
  swapItems(dargStartIndex, dragEndIndex);

  this.classList.remove('over');
  checkOrder();
}

function dragEnter() {
  this.classList.add('over');
}

function dragLeave() {
  this.classList.remove('over');
}

function swapItems(start, end) {
  const one = listItems[start].querySelector('.draggable');
  const two = listItems[end].querySelector('.draggable');

  listItems[start].appendChild(two);
  listItems[end].appendChild(one);
}

function checkOrder() {
  const personNames = document.querySelectorAll('.person-name');
  personNames.forEach((person, index) => {
    if (person.innerText === richestPeople[index]) {
      person.classList.remove('wrong');
      person.classList.add('right');
    } else {
      person.classList.remove('right');
      person.classList.add('wrong');
      rightCount--;
    }
  });

  let r = Array.from(personNames).filter((person) => person.classList.contains('right')).length;

  if (r === richestPeople.length) {
    document.body.innerHTML = `
    <div class="gameover">
      <h1>You Win!</h1>
      <button class="check" onclick="reload()">Play again</button>
    </div>
    `;
  }
}

function reload() {
  window.location.reload();
}

function addEventListeners() {
  const daraggables = document.querySelectorAll('.draggable');
  const daraggablesListItem = document.querySelectorAll('.draggable-list li');
  daraggables.forEach((item) => {
    item.addEventListener('dragstart', dragStart);
  });

  daraggablesListItem.forEach((item) => {
    item.addEventListener('dragover', dragOver);
    item.addEventListener('drop', dragDrop);
    item.addEventListener('dragenter', dragEnter);
    item.addEventListener('dragleave', dragLeave);
  });
}

checkBtn.addEventListener('click', checkOrder);
