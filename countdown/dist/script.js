const days = document.querySelector('#days'),
  hours = document.querySelector('#hours'),
  minutes = document.querySelector('#minutes'),
  seconds = document.querySelector('#seconds'),
  countDown = document.querySelector('.countdown'),
  loading = document.querySelector('#gif'),
  newYear = document.querySelector('.new-year');

const currYear = new Date().getFullYear();

newYear.textContent = currYear + 1;

const year = new Date(`Jan 01 ${currYear + 1} 00:00:00`);

function updateTime() {
  const currTime = new Date();
  const diff = year - currTime;

  const d = Math.floor(diff / 1000 / 60 / 60 / 24);
  const h = Math.floor(diff / 1000 / 60 / 60) % 24;
  const m = Math.floor(diff / 1000 / 60) % 60;
  const s = Math.floor(diff / 1000) % 60;

  days.innerHTML = d;
  hours.innerHTML = h < 10 ? `0${h}` : h;
  minutes.innerHTML = m < 10 ? `0${m}` : m;
  seconds.innerHTML = s < 10 ? `0${s}` : s;
}
setInterval(updateTime, 1000);
setTimeout(() => {
  loading.style.display = 'none';
  countDown.style.display = 'flex';
}, 1000);
