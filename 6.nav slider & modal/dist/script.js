const toggle = document.querySelector('.toggle');
const open = document.querySelector('.open');
const close = document.querySelector('.close');
const menu = document.querySelector('nav');
const modal = document.querySelector('.modal-container');

toggle.addEventListener('click', () => {
  menu.classList.toggle('show-menu');
  document.body.classList.toggle('show-menu');
});

open.addEventListener('click', () => {
  modal.classList.add('show-modal');
});

close.addEventListener('click', () => {
  modal.classList.remove('show-modal');
});

window.addEventListener('click', (e) =>
  e.target.classList.contains('show-modal') ? e.target.classList.remove('show-modal') : false
);
