const seats = document.querySelectorAll('.row .seat:not(.occupeid)');
const container = document.querySelector('.container');
const movie = document.querySelector('#select-list');
const count = document.querySelector('#number-of-seats');
const total = document.querySelector('#total-price');

let price = +movie.value;

function updateSelectedAndTotal() {
  const selectedSeat = container.querySelectorAll('.row .seat.selected');
  const selectedCount = selectedSeat.length;
  count.textContent = selectedCount;

  total.textContent = price * selectedCount;

  const seatIndex = [...selectedSeat].map((seat) => [...seats].indexOf(seat));
  localStorage.setItem('seatsIndex', JSON.stringify(seatIndex));
}

function saveMovie(index, price) {
  localStorage.setItem('movieIndex', JSON.stringify(index));
  localStorage.setItem('moviePrice', JSON.stringify(price));
}

function movieChanged(e) {
  price = +movie.value;
  saveMovie(e.target.selectedIndex, e.target.value);
  updateSelectedAndTotal();
}

function popData() {
  const selectedSeat = JSON.parse(localStorage.getItem('seatsIndex'));
  const selectedMovie = JSON.parse(localStorage.getItem('movieIndex'));
  const currentPrice = JSON.parse(localStorage.getItem('moviePrice'));
  if (selectedSeat !== null && selectedSeat.length > 0) {
    [...seats].forEach((seat, index) => {
      if (selectedSeat.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }
  if (selectedMovie !== null) {
    movie.selectedIndex = selectedMovie;
  }
}

function selectSeat(e) {
  if (e.target.classList.contains('seat') && !e.target.classList.contains('occupeid')) {
    e.target.classList.toggle('selected');

    updateSelectedAndTotal();
  }
}

container.addEventListener('click', selectSeat);
movie.addEventListener('change', movieChanged);
popData();

updateSelectedAndTotal();
