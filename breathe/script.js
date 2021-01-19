const container = document.querySelector('.container'),
  text = document.querySelector('.text');

const totalTime = 7500,
  breathe = (totalTime / 5) * 2,
  hold = totalTime / 5;

breatheTiming();

function breatheTiming() {
  text.innerText = 'Breathe In!';
  container.className = 'container scale';

  setTimeout(() => {
    text.innerText = 'Hold!';

    setTimeout(() => {
      text.innerText = 'Breathe out!';
      container.className = 'container shrink';
    }, hold);
  }, breathe);
}

setInterval(breatheTiming, totalTime);
