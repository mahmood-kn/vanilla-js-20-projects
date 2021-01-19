const add = document.getElementById('add');
const double = document.getElementById('double');
const filter = document.getElementById('show');
const sort = document.getElementById('sort');
const total = document.getElementById('calc');
const main = document.querySelector('main');

getPerson();
getPerson();
getPerson();
getPerson();

let persons = [];
async function getPerson() {
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();
  const person = {
    name: `${data.results[0].name.first} ${data.results[0].name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };
  // console.log(person.wealth());
  addPerson(person);
}

function addPerson(newPerson) {
  persons.push(newPerson);
  updateDOM();
}

function formatMoney(num) {
  return '$' + num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

function updateDOM(personsArr = persons) {
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';
  personsArr.forEach((item) => {
    const div = document.createElement('div');
    div.classList.add('person');
    div.innerHTML = `<strong>${item.name}</strong>${formatMoney(item.money)}`;
    main.appendChild(div);
  });
}

function doubleMoney() {
  persons = persons.map((item) => {
    return { ...item, money: item.money * 2 };
  });
  updateDOM();
}

function showMillioners() {
  persons = persons.filter((item) => item.money >= 1000000);
  updateDOM();
}

function sortPersonsByWealth() {
  persons = persons.sort((a, b) => b.money - a.money);
  updateDOM();
}

function calcTotalWealth() {
  const total = persons.reduce((acc, curr) => (acc += curr.money), 0);
  const totalEl = document.createElement('div');
  totalEl.innerHTML = `<h3><strong>Total Wealth</strong>${formatMoney(total)}</h3>`;
  main.appendChild(totalEl);
}

add.addEventListener('click', getPerson);
double.addEventListener('click', doubleMoney);
filter.addEventListener('click', showMillioners);
sort.addEventListener('click', sortPersonsByWealth);
total.addEventListener('click', calcTotalWealth);
