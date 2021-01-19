const username = document.querySelector('#username');
const form = document.querySelector('#form');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const password2 = document.querySelector('#password2');

function checkInput(inputArr) {
  inputArr.forEach((input) => {
    if (input.value.trim() === '') {
      showError(input, `${changeToUppercase(input.id)} is required.`);
    } else {
      showSuccess(input);
    }
  });
}

function changeToUppercase(inputId) {
  return inputId.charAt(0).toUpperCase() + inputId.slice(1);
}

function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, `${changeToUppercase(input.id)} must be ${min} char and more`);
  } else if (input.value.length > max) {
    showError(input, `${changeToUppercase(input.id)} must be ${max} char and less`);
  } else {
    showSuccess(input);
  }
}

function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, `${changeToUppercase(input.id)} is not valid`);
  }
}

function checkForPasswordMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, `Password not match`);
    showError(input1, '');
  } else {
    showSuccess(input2);
  }
}

function showError(input, msg) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.textContent = msg;
}

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

function submitForm(e) {
  e.preventDefault();
  checkInput([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 5, 25);
  checkEmail(email);
  checkForPasswordMatch(password, password2);
}

form.addEventListener('submit', submitForm);
