const total = document.getElementById('balance'),
  money_plus = document.getElementById('money-plus'),
  money_minus = document.getElementById('money-minus'),
  list = document.getElementById('list'),
  form = document.getElementById('form'),
  text = document.getElementById('text'),
  amount = document.getElementById('amount'),
  remove = document.querySelector('.delete-btn');

// let dummytransactions = [
//   { id: 1, text: 'camera', amount: 100 },
//   { id: 2, text: 'cash', amount: -200 },
//   { id: 3, text: 'desk', amount: 400 },
// ];

const localstorageItems = localStorage.getItem('transactions');

let transactions =
  localStorage.getItem('transactions') !== null
    ? JSON.parse(localstorageItems)
    : [];

function addTransacrionDom(transaction) {
  const sign = transaction.amount > 0 ? '+' : '-';

  const item = document.createElement('li');
  item.classList.add(sign === '+' ? 'plus' : 'minus');
  item.innerHTML = `${transaction.text}<span>${sign}${Math.abs(
    transaction.amount
  )}<button class="delete-btn" data-id=${transaction.id}>x</button></span>`;
  list.appendChild(item);
}

function updateTotal() {
  const totalAmount = transactions
    .reduce((acc, item) => (acc += item.amount), 0)
    .toFixed(2);
  total.textContent = `$${totalAmount}`;

  const income = transactions
    .filter((item) => item.amount > 0)
    .reduce((acc, inc) => (acc += inc.amount), 0)
    .toFixed(2);
  const expense = (
    transactions
      .filter((item) => item.amount < 0)
      .reduce((acc, exp) => (acc += exp.amount), 0) * -1
  ).toFixed(2);

  money_plus.innerText = `$${income}`;
  money_minus.innerText = `$${expense}`;
}

function addTransacrion(e) {
  e.preventDefault();
  if (text.value.trim() || amount.value.trim()) {
    const id = createID();
    const newText = text.value;
    const newAmount = +amount.value;

    const newTransaction = { id, text: newText, amount: newAmount };

    transactions.push(newTransaction);
    addTransacrionDom(newTransaction);
    updateTotal();
    updateLS();

    text.value = '';
    amount.value = '';
  } else {
    alert('Please fill the fields');
  }
}

function createID() {
  return Math.floor(Math.random() * 100000000);
}

function removeItem(id) {
  const ID = +id;
  transactions = transactions.filter((transaction) => transaction.id !== ID);
  init();
  updateLS();
}

function updateLS() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

function init() {
  list.innerHTML = '';
  transactions.forEach(addTransacrionDom);
  updateTotal();
}

init();

form.addEventListener('submit', addTransacrion);
list.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
    removeItem(e.target.getAttribute('data-id'));
  }
});
