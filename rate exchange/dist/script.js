const currencyEl_one = document.getElementById('currency-one');
const currencyEl_two = document.getElementById('currency-two');
const swap = document.getElementById('swap');
const swapText = document.getElementById('swap-text');
const amountEl_one = document.getElementById('amount-one');
const amountEl_two = document.getElementById('amount-two');

async function calculate() {
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;
  const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`);
  const data = await res.json();
  console.log(data);

  const rate = data.rates[currency_two];
  amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
  swapText.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;
}

currencyEl_one.addEventListener('change', calculate);
currencyEl_two.addEventListener('change', calculate);
swap.addEventListener('click', calculate);
amountEl_one.addEventListener('input', calculate);
amountEl_two.addEventListener('input', calculate);

swap.addEventListener('click', () => {
  const prevCurrOne = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = prevCurrOne;
  calculate();
});

calculate();
